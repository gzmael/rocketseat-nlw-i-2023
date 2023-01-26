import { useMutation } from '@tanstack/react-query'
import { Check } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { CreateNewHabitType } from '../../models/Habit'
import { addNewHabit } from '../../services/api'
import { queryClient } from '../../services/cache'
import { Checkbox } from '../Checkbox'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

interface NewHabitFormProps {
  closeModal: () => void
}

const NewHabitForm = ({ closeModal }: NewHabitFormProps) => {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  const mutation = useMutation({
    mutationFn: (data: CreateNewHabitType) => addNewHabit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['summary'],
      })
      queryClient.invalidateQueries({
        queryKey: ['day'],
      })
      closeModal()
      setTitle('')
      setWeekDays([])
    },
  })

  const isInvalidForm = !title || weekDays.length === 0

  const createNewHabit = (event: FormEvent) => {
    event.preventDefault()
    mutation.mutate({
      title,
      weekDays,
    })
  }

  const handleToggleWeekDay = (weekDay: number) => {
    setWeekDays((prevState) =>
      weekDays.includes(weekDay)
        ? prevState.filter((day) => day !== weekDay)
        : [...prevState, weekDay],
    )
  }

  return (
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label className="font-semibold leading-tight" htmlFor="title">
        Qual o seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label className="font-semibold leading-tight mt-3" htmlFor="">
        Qual a recorência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((day, index) => (
          <Checkbox
            key={day}
            title={day}
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          />
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-all ease-linear duration-300"
        disabled={isInvalidForm}
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}

export { NewHabitForm }
