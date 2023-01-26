import clsx from 'clsx'
import dayjs from 'dayjs'
import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from 'react-native'

import { generateProgressPercentage } from '../../utils/generate-progress-percentage'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE =
  Dimensions.get('screen').width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5)

interface HabitDayProps extends TouchableOpacityProps {
  amount?: number
  completed?: number
  date: Date
}

const HabitDay = ({
  amount = 0,
  completed = 0,
  date,
  ...rest
}: HabitDayProps) => {
  const percentage = generateProgressPercentage(amount, completed)
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today, 'day')

  return (
    <TouchableOpacity
      {...rest}
      className={clsx('rounded-lg border-2 m-1', {
        ' bg-zinc-900 border-2 border-zinc-800': percentage === 0,
        'bg-violet-900 border-violet-700': percentage > 0 && percentage < 20,
        'bg-violet-800 border-violet-600': percentage >= 20 && percentage < 40,
        'bg-violet-700 border-violet-500': percentage >= 40 && percentage < 60,
        'bg-violet-600 border-violet-500': percentage >= 60 && percentage < 80,
        'bg-violet-500 border-violet-400': percentage >= 80,
        'border-zinc-300 border-4': isCurrentDay,
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
    />
  )
}

export { HabitDay }
