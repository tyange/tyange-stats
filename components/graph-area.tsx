'use client'

import type { TypedDocumentNode } from '@apollo/client'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useState } from 'react'
import CameraTracker from './CameraTracker'

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

interface StatusRangeData {
  systemStatusRange: StatusData['systemStatus'][]
}

const STATUS_HISTORY_QUERY: TypedDocumentNode<StatusData> = gql`
  {
      systemStatusHistory(
        minutes: 1440
      ) {
        time
        memoryUsage
      }
}
`

export default function GraphArea() {
  // const { data, error } = await query<StatusHistoryData>({ query: STATUS_HISTORY_QUERY })

  // if (!data || error) {
  //   return (
  //     <div>
  //       <p>Unexpected Error.</p>
  //     </div>
  //   )
  // }

  // return data.systemStatusHistory.map(stat => (
  // <div key={stat.time} className="flex gap-5">
  //   <p className="flex gap-3">
  //     <span>
  //       {new Date(stat.time).toLocaleDateString()}
  //     </span>
  //     <span>
  //       {new Date(stat.time).toLocaleTimeString()}
  //     </span>
  //   </p>
  //   <p>{stat.cpuUsage}</p>
  //   <p>{stat.memoryUsage}</p>
  //   <p>{stat.cpuTemperature}</p>
  //   <p>{stat.gpuTemperature}</p>
  //   <p>{stat.nvmeTemperature}</p>
  // </div>
  // ))

  const [cameraPos, setCameraPos] = useState({ x: 200, y: 0, z: 100 })

  const { data, loading } = useQuery<StatusHistoryData>(STATUS_HISTORY_QUERY)

  if (loading) {
    return (<div>Loading...</div>)
  }

  return (
    <>
      <p>{data?.systemStatusHistory[0].memoryUsage}</p>
      <div style={{
        position: 'absolute',
        top: 100,
        left: 100,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 100,
      }}
      >
        <div>
          Camera: [
          {cameraPos.x.toFixed(0)}
          ,
          {cameraPos.y.toFixed(0)}
          ,
          {cameraPos.z.toFixed(0)}
          ]
        </div>
      </div>
      <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 500] }}>
        <CameraTracker setCameraPos={setCameraPos} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh position={[0, -147, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[4, 4, 500, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0, 347, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[4, 4, 500, 4]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[150, 343, 0]}>
          <sphereGeometry args={[5, 16, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <mesh position={[-250, 100, 0]}>
          <cylinderGeometry args={[4, 4, 500, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[250, 100, 0]}>
          <cylinderGeometry args={[4, 4, 500, 4]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[-250, -147, 0]}>
          <sphereGeometry args={[4, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <OrbitControls enableRotate={true} />
      </Canvas>
    </>
  )
}
