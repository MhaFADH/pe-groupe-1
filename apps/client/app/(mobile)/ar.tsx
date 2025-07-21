import { ViroARSceneNavigator } from "@reactvision/react-viro"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { Alert } from "react-native"

import { Chest } from "@/components/ar/artefacts"

const DELAY_SHOW_MODAL = 35 * 1000

const ArPage = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      Alert.alert(
        "Fin de la chasse",
        "Cette chasse au trésor est terminée, merci d'y avoir participé ! 🙏",
        [
          {
            onPress: () => {
              router.push("/(mobile)/home")
            },
          },
        ],
      )
    }, DELAY_SHOW_MODAL)
  }, [router])

  return (
    <ViroARSceneNavigator initialScene={{ scene: Chest }} autofocus={true} />
  )
}

export default ArPage
