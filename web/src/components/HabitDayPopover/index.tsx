import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { getDayHabit, toggleHabit } from '../../services/api'
import { ListDayHabitsResponse } from '../../models/Day'
import { queryClient } from '../../services/cache'
import { Checkbox } from '../Checkbox'
import { ProgressBar } from '../ProgressBar'

interface HabitDayPopoverProps {
  date: Date
  completedPercentage: number
}
const HabitDayPopover = ({
  date,
  completedPercentage,
}: HabitDayPopoverProps) => {
  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayWeek = dayjs(date).format('dddd')
  const { data, isLoading } = useQuery({
    queryKey: ['day', { date }],
    queryFn: () => getDayHabit(date),
  })

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())
  const mutation = useMutation({
    mutationFn: (habitId: string) => toggleHabit(habitId),
    onMutate: async (newHabit) => {
      await queryClient.cancelQueries({
        queryKey: ['day', { date }],
      })
      const previousDayHabit = queryClient.getQueryData<ListDayHabitsResponse>([
        'day',
        { date },
      ])
      if (previousDayHabit) {
        const { completedHabits, possibleHabits } = previousDayHabit
        const hasCompletedHabit = completedHabits.find(
          (habitCompletedId) => habitCompletedId === newHabit,
        )
        if (hasCompletedHabit) {
          const newDayHabit = {
            possibleHabits,
            completedHabits: completedHabits.filter(
              (habitCompletedId) => habitCompletedId !== newHabit,
            ),
          }
          queryClient.setQueryData(['day', { date }], newDayHabit)
          return { previousDayHabit, newDayHabit, date }
        }

        const newDayHabit = {
          possibleHabits,
          completedHabits: [...completedHabits, newHabit],
        }

        queryClient.setQueryData(['day', { date }], newDayHabit)
        return { previousDayHabit, newDayHabit, date }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['summary'],
      })
    },
    onError: (_err, _newHabit, context) => {
      queryClient.setQueryData(
        ['day', context?.date],
        context?.previousDayHabit,
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['day', date] })
    },
  })

  const handleToggleHabit = (habitId: string) => {
    mutation.mutate(habitId)
  }

  return (
    <>
      <span className="font-semibold text-zinc-400">{dayWeek}</span>
      <span className="mt-1 font-extrabold leading-tight text-3xl">
        {dayAndMonth}
      </span>

      <ProgressBar total={completedPercentage} />

      <div className="mt-6 flex flex-col gap-3">
        {!isLoading &&
          data &&
          data.possibleHabits.map((habit) => (
            <Checkbox
              isHabit
              title={habit.title}
              key={habit.publicId}
              disabled={isDateInPast}
              onCheckedChange={() => handleToggleHabit(habit.publicId)}
              checked={data.completedHabits.includes(habit.publicId)}
            />
          ))}
        {isLoading && !data && (
          <>
            <Checkbox isHabit title={''} isLoading disabled />
            <Checkbox isHabit title={''} isLoading disabled />
            <Checkbox isHabit title={''} isLoading disabled />
            <Checkbox isHabit title={''} isLoading disabled />
          </>
        )}
      </div>
    </>
  )
}

export { HabitDayPopover }
