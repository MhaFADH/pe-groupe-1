import { Ionicons } from "@expo/vector-icons"
import { Image, Text, View } from "react-native"

import { type TreasureHuntType } from "@pe/types"

type HuntHeaderProps = {
  hunt: TreasureHuntType
}

export const HuntHeader = ({ hunt }: HuntHeaderProps) => (
  <View className="relative">
    <Image
      source={{ uri: `https://picsum.photos/300/200?random=${hunt.id}` }}
      className="w-full h-64"
      resizeMode="cover"
    />
    <View className="absolute inset-0 bg-black/30" />
    <View className="absolute bottom-0 left-0 right-0 p-6">
      <Text className="text-3xl font-bold text-white mb-2">{hunt.title}</Text>
      <View className="flex-row items-center">
        <Ionicons name="location-outline" size={16} color="white" />
        <Text className="text-white ml-1 opacity-90">{hunt.location}</Text>
      </View>
    </View>
  </View>
)
