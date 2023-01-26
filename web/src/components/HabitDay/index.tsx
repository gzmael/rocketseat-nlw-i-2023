import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import { useState } from 'react'
import { HabitDayPopover } from '../HabitDayPopover'

interface HabitDayProps {
  completed?: number
  amount?: number
  date: Date
  isLoading?: boolean
}

const HabitDay = ({
  completed = 0,
  amount = 0,
  date,
  isLoading = false,
}: HabitDayProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger
        aria-label="Ver Progresso"
        className={clsx(
          'cursor-pointer h-10 w-10 border rounded-lg transition-colors ease-linear duration-300 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background',
          {
            ' bg-zinc-900 border-2 border-zinc-800': completedPercentage === 0,
            'bg-violet-900 border-violet-700':
              completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 border-violet-600':
              completedPercentage >= 20 && completedPercentage < 40,
            'bg-violet-700 border-violet-500':
              completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 border-violet-400':
              completedPercentage >= 60 && completedPercentage < 80,
            'bg-violet-500 border-violet-300': completedPercentage >= 80,
            'animate-pulse': isLoading,
          },
        )}
      />
      <Popover.Portal>
        <Popover.Content
          className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col shadow-lg"
          sideOffset={5}
        >
          {isOpen ? (
            <HabitDayPopover
              completedPercentage={completedPercentage}
              date={date}
            />
          ) : null}
          <Popover.Arrow
            height={8}
            className="PopoverArrow fill-zinc-900"
            width={16}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export { HabitDay }
