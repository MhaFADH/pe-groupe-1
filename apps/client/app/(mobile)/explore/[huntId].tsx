import { useLocalSearchParams, useRouter } from "expo-router"
import { t } from "i18next"
import { useEffect } from "react"
import { Text, View, ScrollView, Alert } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { useAuthManager } from "@/components/contexts"
import { HuntHeader, HuntInfo, HuntActions, HintsSection } from "@/components/ui/hunt-details"
import { useHuntDetails } from "@/hooks/use-hunt-details"

const HuntDetailsPage = () => {
  const { huntId } = useLocalSearchParams<{ huntId: string }>()
  const { isAuthenticated } = useAuthManager()
  const router = useRouter()
  
  const {
    hunt,
    hints,
    isJoined,
    hasCurrentHunt,
    setIsJoined,
    setHasCurrentHunt,
    setHints
  } = useHuntDetails(huntId || "")

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(mobile)")
    }
  }, [isAuthenticated, router])


  const handleJoinHunt = () => {
    if (hasCurrentHunt && !isJoined) {
      Alert.alert(
        t("alreadyJoinedHunt"),
        t("mustLeaveCurrentHunt"),
        [
          {
            text: t("cancel"),
            style: "cancel"
          },
          {
            text: t("viewCurrentHunt"),
            onPress: () => router.push("/explore/1")
          }
        ]
      )
      
      return
    }
    
    setIsJoined(true)
    setHasCurrentHunt(true)
    Alert.alert(t("success"), t("youHaveJoinedHunt"))
  }

  const handleLeaveHunt = () => {
    Alert.alert(
      t("leaveHunt"),
      t("areYouSureLeaveHunt"),
      [
        {
          text: t("cancel"),
          style: "cancel"
        },
        {
          text: t("leaveHunt"),
          style: "destructive",
          onPress: () => {
            setIsJoined(false)
            setHasCurrentHunt(false)
            setHints([])
            Alert.alert(t("leftHunt"), t("youHaveLeftHunt"))
          }
        }
      ]
    )
  }

  const handlePlayHunt = () => {
    Alert.alert(t("playHuntTitle"), t("huntGameplayStart"))
  }

  if (!hunt) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Text className="text-gray-600 dark:text-gray-300">Hunt not found</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HuntHeader hunt={hunt} />

        <View className="px-6 py-6">
          <Animated.View entering={FadeIn.delay(200)}>
            <HuntInfo hunt={hunt} />
            
            <HuntActions
              isJoined={isJoined}
              onJoinHunt={handleJoinHunt}
              onLeaveHunt={handleLeaveHunt}
              onPlayHunt={handlePlayHunt}
            />

            <HintsSection hints={hints} isJoined={isJoined} />
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HuntDetailsPage
