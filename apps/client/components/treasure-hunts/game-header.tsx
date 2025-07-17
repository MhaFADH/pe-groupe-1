import { router } from "expo-router"
import { Pressable, Switch, Text, View } from "react-native"

type GameHeaderProps = {
  isARMode: boolean
  setIsARMode: (value: boolean) => void
  mapType: "standard" | "hybrid"
  setMapType: (value: "standard" | "hybrid") => void
}

const GameHeader: React.FC<GameHeaderProps> = ({
  isARMode,
  setIsARMode,
  mapType,
  setMapType,
}) => (
  <View className="absolute top-12 left-4 right-4 z-10 flex-row justify-between items-center">
    <Pressable
      onPress={() => router.back()}
      className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg"
    >
      <Text className="text-gray-800 dark:text-white text-lg font-semibold">
        ←
      </Text>
    </Pressable>

    <View className="flex-row gap-4">
      <View className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg flex-row items-center">
        <Text className="text-gray-800 dark:text-white text-sm mr-2">AR</Text>
        <Switch
          value={isARMode}
          onValueChange={setIsARMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isARMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <View className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg flex-row items-center">
        <Text className="text-gray-800 dark:text-white text-sm mr-2">Map</Text>
        <Switch
          value={mapType === "hybrid"}
          onValueChange={(value) => setMapType(value ? "hybrid" : "standard")}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={mapType === "hybrid" ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
    </View>
  </View>
)

export default GameHeader
