"use client"

import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame, Canvas } from '@react-three/fiber'
import { Stars, useTexture } from '@react-three/drei'

// 流星效果
function Meteors({ count = 20 }) {
  const group = useRef<THREE.Group>(null)
  const meteors = useRef<THREE.Mesh[]>([])

  useEffect(() => {
    if (!group.current) return
    
    meteors.current = []
    for (let i = 0; i < count; i++) {
      const geometry = new THREE.CylinderGeometry(0.02, 0.02, Math.random() * 3 + 1, 32)
      const material = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color(0xffffff),
        transparent: true,
        opacity: Math.random() * 0.7 + 0.3
      })
      const meteor = new THREE.Mesh(geometry, material)
      
      // 随机位置
      meteor.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 + 10,
        (Math.random() - 0.5) * 20
      )
      
      // 随机旋转
      meteor.rotation.set(
        0,
        0,
        Math.random() * Math.PI
      )
      
      // 添加到场景
      meteor.userData = {
        speed: Math.random() * 0.05 + 0.02,
        direction: new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          -1,
          (Math.random() - 0.5) * 0.2
        ).normalize()
      }
      
      group.current.add(meteor)
      meteors.current.push(meteor)
    }
    
    return () => {
      if (group.current) {
        meteors.current.forEach(meteor => group.current?.remove(meteor))
      }
    }
  }, [count])
  
  useFrame(() => {
    meteors.current.forEach(meteor => {
      const { speed, direction } = meteor.userData
      meteor.position.addScaledVector(direction, speed)
      
      // 如果流星超出范围，重新设置位置
      if (meteor.position.y < -15) {
        meteor.position.set(
          (Math.random() - 0.5) * 40,
          15 + Math.random() * 5,
          (Math.random() - 0.5) * 20
        )
      }
    })
  })
  
  return <group ref={group} />
}

// 彗星尾效果
function CometTail() {
  const tailRef = useRef<THREE.Points>(null)
  const particlesRef = useRef<THREE.BufferGeometry>(null)
  const [positions, setPositions] = useState<Float32Array | null>(null)

  useEffect(() => {
    // 创建彗星尾粒子
    const particleCount = 1000
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
    }
    
    setPositions(positions)
  }, [])
  
  useFrame(({ clock }) => {
    if (tailRef.current && particlesRef.current && positions) {
      const time = clock.getElapsedTime()
      
      // 更新彗星尾粒子位置
      const positions = particlesRef.current.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        
        // 添加波浪效果
        positions[i] = x + Math.sin(time * 0.5 + y * 0.05) * 0.02
        positions[i + 1] = y + Math.cos(time * 0.3 + x * 0.05) * 0.02
      }
      
      particlesRef.current.attributes.position.needsUpdate = true
      tailRef.current.rotation.y = time * 0.05
    }
  })
  
  if (!positions) return null
  
  return (
    <points ref={tailRef}>
      <bufferGeometry ref={particlesRef}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={new THREE.Color(0x88ccff)}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

// 天空盒背景 - 星空渐变效果
function SkyBox() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null)
  
  // 天空盒着色器
  const skyUniforms = {
    topColor: { value: new THREE.Color(0x0077ff) },
    bottomColor: { value: new THREE.Color(0x9933ff) },
    offset: { value: 20 },
    exponent: { value: 0.4 }
  }
  
  const skyVertexShader = `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  
  const skyFragmentShader = `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize(vWorldPosition + offset).y;
      gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
    }
  `
  
  useFrame(({ clock }) => {
    if (shaderRef.current) {
      const time = clock.getElapsedTime() * 0.2
      
      // 缓慢改变颜色
      const topHue = (Math.sin(time * 0.1) * 0.1 + 0.6) % 1
      const bottomHue = (Math.sin(time * 0.15 + 2) * 0.1 + 0.7) % 1
      
      shaderRef.current.uniforms.topColor.value.setHSL(topHue, 0.8, 0.5)
      shaderRef.current.uniforms.bottomColor.value.setHSL(bottomHue, 0.8, 0.5)
    }
  })
  
  return (
    <mesh>
      <sphereGeometry args={[500, 32, 32]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={skyUniforms}
        vertexShader={skyVertexShader}
        fragmentShader={skyFragmentShader}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// 主场景组件
export default function YourNameBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas 
        camera={{ 
          position: [0, 0, 20], 
          fov: 60, 
          near: 0.1, 
          far: 1000 
        }}
      >
        <ambientLight intensity={0.3} />
        <SkyBox />
        <Stars
          radius={300}
          depth={50}
          count={5000}
          factor={4}
          fade
          speed={1}
        />
        <CometTail />
        <Meteors count={15} />
      </Canvas>
    </div>
  )
} 