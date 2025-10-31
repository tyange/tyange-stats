import { useFrame, useThree } from '@react-three/fiber'

export default function CameraTracker({ setCameraPos}: { setCameraPos: ({ x, y, z}: { x: number, y: number, z: number }) => void }) {
  const { camera } = useThree()

  useFrame(() => {
    setCameraPos({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    })
  })

  return null
}
