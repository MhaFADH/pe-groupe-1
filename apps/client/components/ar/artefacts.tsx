/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Viro3DObject,
  ViroARScene,
  ViroAmbientLight,
} from "@reactvision/react-viro"

export const Helmet = () => (
  <ViroARScene>
    <ViroAmbientLight color="#ffffff" />
    <Viro3DObject
      type="GLB"
      source={require("../../assets/ar/helmet.glb")}
      scale={[0.1, 0.1, 0.1]}
      position={[0, 0, -1]}
      rotation={[0, 0, 0]}
    />
  </ViroARScene>
)

export const Chest = () => (
  <ViroARScene>
    <ViroAmbientLight color="#ffffff" />
    <Viro3DObject
      type="GLB"
      source={require("../../assets/ar/chest.glb")}
      scale={[0.07, 0.07, 0.07]}
      position={[0, -1, -1]}
      rotation={[0, 0, 0]}
    />
  </ViroARScene>
)
