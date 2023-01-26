import { useMutation } from '@tanstack/react-query'

import { api } from '../lib/axios'
import { queryClient } from '../lib/query'
import { ListDayHabitsResponse } from '../models/Day'
import { CreateNewHabitType } from '../models/Habit'
import { SummaryResponse } from '../models/Summary'

export const getSummary = async () => {
  return api.get<SummaryResponse>('/summary').then((res) => res.data)
}

export const addNewHabit = async (data: CreateNewHabitType) => {
  return api.post('/habits', data).then((res) => res.data)
}

export const getDayHabit = async (date: Date) => {
  return api
    .get<ListDayHabitsResponse>('/day', {
      params: {
        date: date.toISOString(),
      },
    })
    .then((res) => res.data)
}

export const toggleHabit = async (habitId: string) => {
  return api.patch(`/habits/${habitId}/toggle`).then((res) => res.data)
}

export const useMutationToggleHabit = (date: string) => {
  return useMutation({
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
}
