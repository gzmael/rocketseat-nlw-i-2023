import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import colors from 'tailwindcss/colors'

const BackButton = () => {
  const { goBack } = useNavigation()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="h-11 px-4items-center"
      onPress={goBack}
    >
      <ArrowLeft color={colors.zinc[400]} size={32} />
    </TouchableOpacity>
  )
}

export { BackButton }
