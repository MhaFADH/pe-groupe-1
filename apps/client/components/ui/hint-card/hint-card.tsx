import { Text, View, Image } from "react-native"

export type Hint = {
  id: string
  title: string
  description: string
  foundAt?: Date
}

type HintCardProps = {
  hint: Hint
}

export const HintCard = ({ hint }: HintCardProps) => (
    <View className="mb-4 mx-4">
      <View className="relative">
        <View className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-lg p-4 shadow-md">
          <View className="flex-row items-start">
            <View className="mr-4 mt-1">
              <View className="w-12 h-12 bg-amber-100 dark:bg-amber-800/30 rounded-lg items-center justify-center border border-amber-300 dark:border-amber-600">
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/2541/2541988.png"
                  }}
                  className="w-8 h-8"
                  style={{ tintColor: "#d97706" }}
                />
              </View>
            </View>
            
            <View className="flex-1">
              <Text className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                {hint.title}
              </Text>
              <Text className="text-amber-800 dark:text-amber-200 text-sm leading-5">
                {hint.description}
              </Text>
              {hint.foundAt && (
                <Text className="text-xs text-amber-600 dark:text-amber-400 mt-2 italic">
                  Found: {hint.foundAt.toLocaleDateString()}
                </Text>
              )}
            </View>
          </View>
          
          <View className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-amber-400 dark:border-amber-500" />
          <View className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-amber-400 dark:border-amber-500" />
          <View className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-amber-400 dark:border-amber-500" />
          <View className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-amber-400 dark:border-amber-500" />
        </View>
      </View>
    </View>
  )
