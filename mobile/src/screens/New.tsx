import { useNavigation } from '@react-navigation/native'
import clsx from 'clsx'
import { Check } from 'phosphor-react-native'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from 'tailwindcss/colors'

import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { api } from '../lib/axios'

const availableweekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

const New = () => {
  const [weekDays, setWeekDays] = useState<number[]>([])
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { goBack } = useNavigation()

  const isInvalidForm = !title.trim() || weekDays.length === 0

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex),
      )
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex])
    }
  }

  const handleCreateNewHabit = async () => {
    setIsLoading(true)
    try {
      await api.post('/habits', {
        title,
        weekDays,
      })
      setTitle('')
      setWeekDays([])
      Alert.alert('Novo hábito', 'Hábito criado com sucesso!')
      goBack()
    } catch (err) {
      console.log(err)
      Alert.alert('Ops!', 'Erro a criar novo hábito.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg bg-zinc-900 text-white border-zinc-800 border-2 focus:border-green-600 mt-3"
          placeholder="Exercícios, dormir brm, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>

        {availableweekDays.map((day, index) => (
          <Checkbox
            key={day}
            checked={weekDays.includes(index)}
            title={day}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          className={clsx(
            'w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6 opacity-100',
            {
              'opacity-30': isInvalidForm,
            },
          )}
          disabled={isInvalidForm || isLoading}
          onPress={handleCreateNewHabit}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size={20} />
          ) : (
            <>
              <Check size={20} color={colors.white} />
              <Text className="ml-2 font-semibold text-base text-white">
                Confirmar
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export { New }
