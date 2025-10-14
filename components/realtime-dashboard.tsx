'use client'

import type { TypedDocumentNode } from '@apollo/client'
import { gql } from '@apollo/client'
import { useSubscription } from '@apollo/client/react'

interface StatusData {
  systemStatus: {
    cpuUsage: number
    memoryUsage: number
  }
}

const STATUS_SUBSCRIPTION: TypedDocumentNode<StatusData> = gql`
  subscription {
    systemStatus {
      cpuUsage
      memoryUsage
    }
  }
`

export default function RealtimeDashboard() {
  const { data, loading } = useSubscription(STATUS_SUBSCRIPTION)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>
        <span>CPU usage: </span>
        <span>{data?.systemStatus.cpuUsage}</span>
      </p>
      <p>
        <span>Memory usage: </span>
        <span>{data?.systemStatus.memoryUsage}</span>
      </p>
    </div>
  )
}
