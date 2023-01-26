import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { View, Text, ScrollView, Alert } from 'react-native'

import { HabitDay, DAY_SIZE } from '../components/HabitDay'
import { HabitPlaceholder } from '../components/HabitPlaceholder'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { getSummary } from '../services/api'
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimumSummaryDatesSizes = 18 * 7
const amoutOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

const Home = () => {
  const { navigate } = useNavigation()

  const { isLoading: loading, data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    onError: (err) => {
      console.log(err)
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.')
    },
  })

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((day, index) => (
          <Text
            key={`${day}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => {
            const dayWithHabits = summary?.find((day) =>
              dayjs(date).isSame(day.date, 'day'),
            )

            return (
              <HabitDay
                key={date.toString()}
                onPress={() => navigate('habit', { date: date.toISOString() })}
                amount={dayWithHabits?.amount}
                completed={dayWithHabits?.completed}
                date={date}
              />
            )
          })}
          {amoutOfDaysToFill > 0 &&
            Array.from({ length: amoutOfDaysToFill }).map((_, index) => (
              <HabitPlaceholder key={`${index}`} />
            ))}
        </View>
      </ScrollView>
    </View>
  )
}

export { Home }
