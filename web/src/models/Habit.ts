export type CreateNewHabitType = {
  title: string
  weekDays: number[]
}

export type Habit = {
  publicId: string
  title: string
  createdAt: Date
}
