import type { TypedDocumentNode } from '@apollo/client'
import { gql } from '@apollo/client'
import { query } from '@/lib/apollo-client'

interface StatusData {
  systemStatus: {
    cpuUsage: number
    memoryUsage: number
    gpuTemperature: number
    nvmeTemperature: number
    cpuTemperature: number
  }
}

const STATUS_QUERY: TypedDocumentNode<StatusData> = gql`
   {
    systemStatus {
      cpuUsage
      memoryUsage
      gpuTemperature
      nvmeTemperature
      cpuTemperature
    }
  }
`

export default async function GraphArea() {
  const { data } = await query({ query: STATUS_QUERY })

  return (
    <div>
      <p>{data?.systemStatus.cpuUsage}</p>
      <p>{data?.systemStatus.memoryUsage}</p>
      <p>{data?.systemStatus.cpuTemperature}</p>
      <p>{data?.systemStatus.gpuTemperature}</p>
      <p>{data?.systemStatus.nvmeTemperature}</p>
    </div>
  )
}
