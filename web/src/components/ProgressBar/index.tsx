import * as Progress from '@radix-ui/react-progress'

interface ProgressBarProps {
  total: number
}

const ProgressBar = ({ total }: ProgressBarProps) => {
  return (
    <Progress.Root
      className="h-3 rounded-xl bg-zinc-700 w-full mt-4 relative overflow-hidden"
      style={{ transform: 'translateZ(0)' }}
      value={total}
    >
      <Progress.Indicator
        className="h-3 rounded-xl bg-violet-600 relative left-0"
        style={{
          transform: `translateX(-${100 - total}%)`,
          transition: 'transform 300ms cubic-bezier(0.65, 0, 0.35, 1)',
        }}
      />
    </Progress.Root>
  )
}

export { ProgressBar }
