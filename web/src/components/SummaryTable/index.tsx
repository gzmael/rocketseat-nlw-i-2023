import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../../services/api'
import { generateDatesFromYearBeginning } from '../../utils/generate-dates-from-year-beginning'
import { HabitDay } from '../HabitDay'
import { HabitPlaceholder } from '../HabitPlaceholder'
import dayjs from 'dayjs'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSizes = 18 * 7
const amoutOfDaysToFill = minimumSummaryDatesSizes - summaryDates.length

const SummaryTable = () => {
  const {
    isLoading,
    data: daysHabits,
    error,
  } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
  })

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            className="text-zinc-400 text-xl h-10 w-10 flex justify-center items-center font-bold"
            key={`${weekDay}-${index}`}
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const hasDayHabits = daysHabits?.find((dayHabit) =>
            dayjs(dayHabit.date).isSame(date, 'day'),
          )
          return (
            <HabitDay
              key={date.toISOString()}
              date={date}
              amount={hasDayHabits?.amount}
              completed={hasDayHabits?.completed}
              isLoading={isLoading}
            />
          )
        })}
        {amoutOfDaysToFill > 0 &&
          Array.from({ length: amoutOfDaysToFill }).map((_, index) => (
            <HabitPlaceholder key={`${index}`} />
          ))}
      </div>
    </div>
  )
}

export { SummaryTable }
