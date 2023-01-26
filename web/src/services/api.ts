import { api } from '../lib/axios'
import { ListDayHabitsResponse } from '../models/Day'
import { CreateNewHabitType } from '../models/Habit'
import { SummaryItem } from '../models/Summary'

export const getSummary = async () => {
  return api.get<SummaryItem[]>('/summary').then((res) => res.data)
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
