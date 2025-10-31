import GraphArea from '@/components/graph-area'
import RealtimeDashboard from '@/components/realtime-dashboard'

export default function Home() {
  return (
    <div className="flex w-full h-screen flex-col">
      <RealtimeDashboard />
      <GraphArea />
    </div>
  )
}
