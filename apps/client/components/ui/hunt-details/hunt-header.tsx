import { Ionicons } from "@expo/vector-icons"
import { Text, View, Image } from "react-native"

import type { Hunt } from "@/components/ui/hunt-card/hunt-card"

interface HuntHeaderProps {
  hunt: Hunt
}

export const HuntHeader = ({ hunt }: HuntHeaderProps) => {
  return (
    <View className="relative">
      {hunt.image && (
        <Image
          source={{ uri: hunt.image }}
          className="w-full h-64"
          resizeMode="cover"
        />
      )}
      <View className="absolute inset-0 bg-black/30" />
      <View className="absolute bottom-0 left-0 right-0 p-6">
        <Text className="text-3xl font-bold text-white mb-2">
          {hunt.title}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={16} color="white" />
          <Text className="text-white ml-1 opacity-90">{hunt.location}</Text>
        </View>
      </View>
    </View>
  )
}