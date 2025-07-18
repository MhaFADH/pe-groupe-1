import { useEffect, useState } from "react"
import { View } from "react-native"
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

import type MapView from "@/packages/maps/react-native-maps"

const SonarOverlay = ({
  mapRef,
  userLocation,
}: {
  mapRef: React.RefObject<MapView>
  userLocation: { latitude: number; longitude: number }
}) => {
  const pulse1 = useSharedValue(0)
  const pulse2 = useSharedValue(0)
  const pulse3 = useSharedValue(0)
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = async () => {
      if (mapRef.current) {
        try {
          const point = await mapRef.current.pointForCoordinate(userLocation)
          setScreenPosition({ x: point.x, y: point.y })
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log("Error getting screen position:", error)
        }
      }
    }

    void updatePosition()
    const interval = setInterval(() => {
      void updatePosition()
    }, 100)

    return () => clearInterval(interval)
  }, [userLocation, mapRef])

  useEffect(() => {
    const duration = 2000
    const easing = Easing.out(Easing.cubic)

    pulse1.value = withRepeat(withTiming(1, { duration, easing }), -1, false)

    pulse2.value = withRepeat(
      withDelay(duration / 3, withTiming(1, { duration, easing })),
      -1,
      false,
    )

    pulse3.value = withRepeat(
      withDelay((duration / 3) * 2, withTiming(1, { duration, easing })),
      -1,
      false,
    )
  }, [pulse1, pulse2, pulse3])

  const usePulseStyle = (pulseValue: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => {
      const scale = interpolate(pulseValue.value, [0, 1], [0.1, 2])
      const opacity = interpolate(pulseValue.value, [0, 0.7, 1], [0.8, 0.4, 0])

      return {
        transform: [{ scale }],
        opacity,
      }
    })

  const pulse1Style = usePulseStyle(pulse1)
  const pulse2Style = usePulseStyle(pulse2)
  const pulse3Style = usePulseStyle(pulse3)

  return (
    <View className="absolute inset-0 pointer-events-none">
      <View
        className="absolute"
        style={{
          left: screenPosition.x - 50,
          top: screenPosition.y - 50,
          width: 100,
          height: 100,
        }}
      >
        <Animated.View
          className="absolute inset-0 rounded-full border-2 border-purple-500"
          style={pulse1Style}
        />
        <Animated.View
          className="absolute inset-0 rounded-full border-2 border-purple-400"
          style={pulse2Style}
        />
        <Animated.View
          className="absolute inset-0 rounded-full border-2 border-purple-300"
          style={pulse3Style}
        />
      </View>
    </View>
  )
}

export default SonarOverlay
