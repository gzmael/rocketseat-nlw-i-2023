import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

interface ProgressBarProps {
  progress?: number
}
const ProgressBar = ({ progress = 0 }: ProgressBarProps) => {
  const sharedProgress = useSharedValue(progress)

  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    }
  })

  useEffect(() => {
    sharedProgress.value = withSpring(progress)
  }, [progress])
  return (
    <View className="w-full rounded-xl h-3 bg-zinc-700 mt-4">
      <Animated.View className="h-3 rounded-xl bg-violet-600" style={style} />
    </View>
  )
}

export { ProgressBar }
