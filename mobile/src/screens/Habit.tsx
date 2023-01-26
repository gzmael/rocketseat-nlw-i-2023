import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ScrollView, View, Text, Alert } from 'react-native'

import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { HabitsEmpty } from '../components/HabitsEmpty'
import { Loading } from '../components/Loading'
import { ProgressBar } from '../components/ProgressBar'
import { getDayHabit, useMutationToggleHabit } from '../services/api'

interface Params {
  date: string
}

const Habit = () => {
  const route = useRoute()
  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())

  const { data, isLoading } = useQuery({
    queryKey: ['day', { date }],
    queryFn: () => getDayHabit(parsedDate.toDate()),
    onError: () => {
      Alert.alert('Ops', 'Não possível carregar as informações dos hábitos.')
    },
  })

  const amount = data?.possibleHabits.length ?? 0
  const completed = data?.completedHabits.length ?? 0
  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const mutation = useMutationToggleHabit(date)

  const handleToggleHabit = (habitId: string) => {
    mutation.mutate(habitId)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={completedPercentage} />

        <View className="mt-6">
          {!isLoading &&
            data &&
            data.possibleHabits.map((habit) => (
              <Checkbox
                title={habit.title}
                key={habit.publicId}
                disabled={isDateInPast}
                onPress={() => handleToggleHabit(habit.publicId)}
                checked={data.completedHabits.includes(habit.publicId)}
              />
            ))}
          {data && data.possibleHabits.length === 0 && <HabitsEmpty />}
        </View>

        {isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você nã pode editar hábitos de uma data passada
          </Text>
        )}
      </ScrollView>
    </View>
  )
}

export { Habit }
