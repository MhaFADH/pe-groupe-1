/* eslint-disable max-lines */
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import * as Location from "expo-location"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ScrollView, Text, View } from "react-native"

import { CreateTreasureHuntSchema } from "@pe/schemas"
import type { CreateTreasureHunt } from "@pe/types"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { NumberInput } from "@/components/ui/number-input"
import { Switch } from "@/components/ui/switch"
import apiClient from "@/services/api/apiClient"

import { HintsSection } from "./hints-section"
import { LocationPicker } from "./location-picker"

const defaultFormValues: CreateTreasureHunt = {
  title: "",
  description: "",
  isPublic: true,
  maxParticipants: 10,
  endDate: null,
  latitude: 37.78825,
  longitude: -122.4324,
  hints: [],
}

export const CreateHuntForm: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateTreasureHunt>({
    resolver: zodResolver(CreateTreasureHuntSchema),
    defaultValues: defaultFormValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hints",
  })

  const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set())
  const watchedLocation = watch(["latitude", "longitude"])

  const resolveLocation = async (
    latitude: number,
    longitude: number,
  ): Promise<string> => {
    try {
      const [result] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      })

      if (result) {
        return result.city ?? t("unknown")
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Location resolution failed:", error)
    }

    return t("unknown")
  }

  const onSubmit = async (data: CreateTreasureHunt) => {
    try {
      const huntLocation = await resolveLocation(data.latitude, data.longitude)

      const hintsWithLocation = await Promise.all(
        (data.hints ?? []).map(async (hint) => ({
          ...hint,
          location: await resolveLocation(hint.latitude, hint.longitude),
        })),
      )

      const submitData = {
        ...data,
        location: huntLocation,
        hints: hintsWithLocation,
      }

      await apiClient.post("/treasure-hunts", submitData)

      await queryClient.invalidateQueries({ queryKey: ["hunts"] })

      router.back()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error creating hunt:", error)
    }
  }

  const handleLocationSelect = (latitude: number, longitude: number) => {
    setValue("latitude", latitude)
    setValue("longitude", longitude)
  }

  const addHint = () => {
    // Collapse all existing hints
    setExpandedHints(new Set())

    const newHint: {
      title: string
      description: string
      latitude: number
      longitude: number
      location?: string
    } = {
      title: "",
      description: "",
      latitude: watchedLocation[0] || defaultFormValues.latitude,
      longitude: watchedLocation[1] || defaultFormValues.longitude,
    }
    append(newHint)

    // Expand the newly added hint
    setExpandedHints(new Set([fields.length]))
  }

  const toggleHintExpansion = (index: number) => {
    const newExpanded = new Set(expandedHints)

    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }

    setExpandedHints(newExpanded)
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      >
        <View className="gap-4">
          <Card>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t("huntTitle")}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("huntTitlePlaceholder")}
                  error={errors.title?.message ? t(errors.title.message) : ""}
                  required
                />
              )}
            />

            <View className="mt-4">
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t("huntDescription")}
                    value={value ?? ""}
                    onChangeText={onChange}
                    placeholder={t("huntDescriptionPlaceholder")}
                    multiline
                    numberOfLines={3}
                    error={
                      errors.description?.message
                        ? t(errors.description.message)
                        : ""
                    }
                  />
                )}
              />
            </View>
          </Card>

          <Card>
            <Controller
              control={control}
              name="isPublic"
              render={({ field: { onChange, value } }) => (
                <Switch
                  label={t("isPublic")}
                  description={t("isPublicDescription")}
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />

            <View className="mt-4">
              <Controller
                control={control}
                name="maxParticipants"
                render={({ field: { onChange, value } }) => (
                  <NumberInput
                    label={t("maxParticipants")}
                    value={value}
                    onChange={onChange}
                    placeholder={t("maxParticipantsPlaceholder")}
                    error={
                      errors.maxParticipants?.message
                        ? t(errors.maxParticipants.message)
                        : ""
                    }
                    required
                  />
                )}
              />
            </View>

            <View className="mt-4">
              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    label={t("endDate")}
                    value={value ?? null}
                    onChange={onChange}
                    error={
                      errors.endDate?.message ? t(errors.endDate.message) : ""
                    }
                    optional
                  />
                )}
              />
            </View>
          </Card>

          <Card>
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t("location")}
            </Text>
            <LocationPicker
              latitude={watchedLocation[0] || defaultFormValues.latitude}
              longitude={watchedLocation[1] || defaultFormValues.longitude}
              onLocationSelect={handleLocationSelect}
              error={errors.latitude?.message ?? errors.longitude?.message}
            />
          </Card>

          <HintsSection
            control={control}
            fields={fields}
            onAddHint={addHint}
            onRemoveHint={remove}
            errors={errors}
            expandedHints={expandedHints}
            onToggleExpansion={toggleHintExpansion}
          />

          <View className="gap-3 mt-4">
            <Button
              title={t("createHuntButton")}
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
            />

            <Button
              title={t("cancel")}
              onPress={() => router.back()}
              variant="outline"
              size="lg"
              fullWidth
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
