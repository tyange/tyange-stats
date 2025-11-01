'use client'

import type { TypedDocumentNode } from '@apollo/client'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

interface StatusData {
  systemStatus: {
    time: string
    cpuUsage: number
    memoryUsage: number
    gpuTemperature: number
    nvmeTemperature: number
    cpuTemperature: number
  }
}

interface StatusHistoryData {
  systemStatusHistory: StatusData['systemStatus'][]
}

const STATUS_HISTORY_QUERY: TypedDocumentNode<StatusData> = gql`
  {
      systemStatusHistory(
        minutes: 1440
      ) {
        time
        cpuUsage
        memoryUsage
        cpuTemperature
      }
}
`

export default function LineGraph() {
  const { data, loading } = useQuery<StatusHistoryData>(STATUS_HISTORY_QUERY)

  if (loading) {
    return (<div>Loading...</div>)
  }

  const chartData = data?.systemStatusHistory.map(stat => ({
    timestamp: new Date(stat.time).toLocaleTimeString(),
    memoryUsage: stat.memoryUsage,
    cpuUsage: stat.cpuUsage,
    cpuTemp: stat.cpuTemperature,
  }))

  return (
    <LineChart
      style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }}
      responsive
      data={chartData}
      margin={{
        top: 20,
        right: 20,
        bottom: 5,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
      <Line dataKey="memoryUsage" stroke="#8884d8" />
      <Line dataKey="cpuUsage" stroke="#82ca9d" />
      <Line dataKey="cpuTemp" stroke="#ffc658" />
      <XAxis dataKey="timestamp" />
      <YAxis width="auto" label={{ value: 'usage', position: 'insideLeft', angle: -90 }} />
      <Legend align="right" />
      <Tooltip />
    </LineChart>
  )
}
