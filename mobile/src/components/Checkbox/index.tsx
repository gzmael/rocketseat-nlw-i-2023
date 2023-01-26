import clsx from 'clsx'
import { Check } from 'phosphor-react-native'
import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from 'react-native'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'
import colors from 'tailwindcss/colors'

interface CheckboxPros extends TouchableOpacityProps {
  checked?: boolean
  title: string
}
const Checkbox = ({ checked = false, title, ...rest }: CheckboxPros) => {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className={clsx('flex-row w mb-2 items-center', {
        'opacity-40': rest.disabled,
      })}
    >
      {checked ? (
        <Animated.View
          className="w-8 h-8 bg-green-500 rounded-lg items-center justify-center"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Check size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800" />
      )}
      <Text className="text-white ml-3">{title}</Text>
    </TouchableOpacity>
  )
}

export { Checkbox }
