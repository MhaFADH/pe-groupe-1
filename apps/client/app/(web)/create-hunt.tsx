import { useEffect } from "react"
import { View } from "react-native"

import { CreateHuntFormWeb } from "@/components/treasure-hunts/create-hunt-form"

const CreateHuntWeb = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="max-w-6xl p-6 mx-auto w-full">
        <CreateHuntFormWeb />
      </View>
    </View>
  )
}

export default CreateHuntWeb
