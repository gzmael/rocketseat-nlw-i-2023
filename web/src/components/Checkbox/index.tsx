import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'
import { Check } from 'phosphor-react'

interface CheckboxProps extends CheckboxRadix.CheckboxProps {
  title: string
  isHabit?: boolean
  isLoading?: boolean
}

const Checkbox = ({
  title,
  checked,
  isHabit = false,
  isLoading = false,
  ...rest
}: CheckboxProps) => {
  return (
    <CheckboxRadix.Root
      {...rest}
      id={title}
      defaultChecked={checked}
      className={clsx(
        'group flex items-center gap-3 disabled:cursor-not-allowed focus:outline-none',
        {
          'animate-pulse': isLoading,
        },
      )}
      title="Marcar item"
    >
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-400 transition-all ease-linear duration-300 group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
        <CheckboxRadix.Indicator>
          <Check size={24} className="text-white" />
        </CheckboxRadix.Indicator>
      </div>
      <label
        className={clsx('leading-tight text-white', {
          'font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400':
            isHabit,
          'bg-zinc-800 animate-pulse w-full rounded-lg h-8': isLoading,
        })}
        htmlFor={title}
      >
        {title}
      </label>
    </CheckboxRadix.Root>
  )
}

export { Checkbox }
