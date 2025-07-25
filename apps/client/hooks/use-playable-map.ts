import { useMutation } from "@tanstack/react-query"
import * as Location from "expo-location"
import { router } from "expo-router"
import { getDistance } from "geolib"
import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Alert } from "react-native"

import { type TreasureHintType } from "@pe/types"

import apiClient from "@/services/api/apiClient"

type Coords = { latitude: number; longitude: number }

const SCAN_INTERVAL = 3000

const usePlayableMap = (args: {
  huntId: string
  isSuccess: boolean
  isARMode: boolean
  defaultHints: TreasureHintType[]
  hintsData: TreasureHintType[]
  proximityThreshold: number
}) => {
  const {
    huntId,
    isSuccess,
    isARMode,
    defaultHints,
    hintsData,
    proximityThreshold,
  } = args

  const { t } = useTranslation()

  const [location, setLocation] = useState<Coords | null>(null)
  const [hints, setHints] = useState<TreasureHintType[]>([])
  const [selectedHint, setSelectedHint] = useState<TreasureHintType | null>(
    null,
  )

  const { mutate: mutateNewHint } = useMutation({
    mutationFn: async (data: { hintId: string }) =>
      await apiClient.post("/treasure-hints-user", data),
  })

  const { mutate: mutateHuntFound } = useMutation({
    mutationFn: async (data: Coords & { huntId: string }) =>
      await apiClient.patch("/treasure-hunts/win", data),
  })

  const setSelectedHintCallback = useCallback(
    (hint: TreasureHintType | null) => () => setSelectedHint(hint),
    [],
  )

  useEffect(() => {
    if (isSuccess) {
      setHints(defaultHints)
    }
  }, [defaultHints, isSuccess])

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null

    void (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== Location.PermissionStatus.GRANTED) {
        return
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
        },
        ({ coords: { latitude, longitude } }) => {
          setLocation({ latitude, longitude })
        },
      )
    })()

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const checkLocation = async () => {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        })

        const nearbyHints = hintsData.filter((hint) => {
          const distance = getDistance(
            { latitude, longitude },
            { latitude: hint.latitude, longitude: hint.longitude },
          )

          return distance <= proximityThreshold
        })

        let treasureFound = false

        setHints((prev) => {
          const existingIds = new Set(prev.map(({ id }) => id))

          const newHints = nearbyHints.filter(({ id }) => !existingIds.has(id))

          if (newHints.length === 0) {
            return prev
          }

          newHints.forEach((newHint) => {
            if (newHint.id === newHint.treasureHuntId) {
              clearInterval(interval)

              mutateHuntFound({
                huntId,
                latitude: newHint.latitude,
                longitude: newHint.longitude,
              })

              treasureFound = true

              Alert.alert(t("congratulations"), t("treasureFound"), [
                {
                  onPress: () => {
                    router.push(isARMode ? "/(mobile)/ar" : "/(mobile)/home")
                  },
                },
              ])
            } else {
              mutateNewHint({ hintId: newHint.id })
            }
          })

          if (!treasureFound) {
            setSelectedHint(newHints[0]!)
          }

          return [...prev, ...newHints]
        })
      }

      void checkLocation()
    }, SCAN_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, [
    hintsData,
    huntId,
    isARMode,
    mutateHuntFound,
    mutateNewHint,
    proximityThreshold,
    t,
  ])

  return { location, hints, selectedHint, setSelectedHintCallback }
}

export default usePlayableMap
