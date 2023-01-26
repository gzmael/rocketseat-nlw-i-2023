import { QueryClientProvider } from '@tanstack/react-query'

import './lib/dayjs'
import './styles/global.css'

import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import { queryClient } from './services/cache'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
          <Header />
          <SummaryTable />
        </div>
      </div>
    </QueryClientProvider>
  )
}
