import LineGraph from '@/components/line-graph'
import RealtimeDashboard from '@/components/realtime-dashboard'

export default function Home() {
  return (
    <div className="flex w-full h-screen flex-col">
      <RealtimeDashboard />
      <LineGraph />
    </div>
  )
}
