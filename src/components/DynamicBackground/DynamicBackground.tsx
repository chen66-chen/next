"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// 根据文章分类生成不同的3D几何形状
const GeometryByCategory = ({ category, color, scrollY }: { 
  category: string,
  color: string, 
  scrollY: number 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  // 根据滚动位置修改几何体
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // 应用旋转
    meshRef.current.rotation.x = scrollY * 0.01;
    meshRef.current.rotation.y += delta * 0.15;
    
    // 根据滚动改变深度感
    const scale = 1 + Math.sin(scrollY * 0.002) * 0.2;
    meshRef.current.scale.set(scale, scale, scale);
  });
  
  // 根据分类选择几何体
  const getGeometry = () => {
    switch(category.toLowerCase()) {
      case "网络安全":
      case "安全":
      case "cybersecurity":
      case "蜜罐":
      case "渗透测试":
        return <AISecurityGuardian color={color} />;
      case "技术":
        return (
          <boxGeometry args={[2, 2, 2, 8, 8, 8]} />
        );
      case "思考":
        return (
          <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
        );
      case "生活":
        return (
          <sphereGeometry args={[1.5, 32, 32]} />
        );
      case "随笔":
        return (
          <octahedronGeometry args={[1.5, 1]} />
        );
      default:
        return (
          <icosahedronGeometry args={[1.5, 1]} />
        );
    }
  };
  
  return (
    <mesh ref={meshRef}>
      {getGeometry()}
      <meshPhysicalMaterial 
        color={color}
        wireframe={true}
        transparent={true}
        opacity={0.6}
        roughness={0.5}
        metalness={0.8}
      />
    </mesh>
  );
};

// AI安全守卫神经网络组件
const AISecurityGuardian = ({ color }: { color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);
  const clock = new THREE.Clock();
  
  // 添加模拟威胁检测状态
  const [detectionState, setDetectionState] = useState({
    isScanning: false,
    threatDetected: false,
    threatPosition: new THREE.Vector3(),
    lastScanTime: 0
  });
  
  // 定期触发安全扫描
  useEffect(() => {
    const scanInterval = setInterval(() => {
      // 开始安全扫描
      setDetectionState(prev => ({
        ...prev,
        isScanning: true,
        lastScanTime: clock.getElapsedTime()
      }));
      
      // 30%概率检测到威胁
      const detectThreat = Math.random() > 0.7;
      
      // 3秒后完成扫描
      setTimeout(() => {
        if (detectThreat) {
          // 检测到威胁
          const randomAngle = Math.random() * Math.PI * 2;
          const randomRadius = 1.5 + Math.random();
          const threatPos = new THREE.Vector3(
            Math.cos(randomAngle) * randomRadius,
            (Math.random() - 0.5) * 2,
            Math.sin(randomAngle) * randomRadius
          );
          
          setDetectionState(prev => ({
            ...prev,
            isScanning: false,
            threatDetected: true,
            threatPosition: threatPos
          }));
          
          // 5秒后清除威胁
          setTimeout(() => {
            setDetectionState(prev => ({
              ...prev,
              threatDetected: false
            }));
          }, 5000);
        } else {
          // 未检测到威胁
          setDetectionState(prev => ({
            ...prev,
            isScanning: false,
            threatDetected: false
          }));
        }
      }, 3000);
    }, 15000); // 每15秒进行一次安全扫描
    
    return () => clearInterval(scanInterval);
  }, []);
  
  // 创建神经网络节点数据
  const [nodeData] = useState(() => {
    const nodeCount = 120;
    const positions = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);
    const colors = new Float32Array(nodeCount * 3);
    const colorObj = new THREE.Color(color);
    
    // 创建类似大脑形状的节点分布
    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      const radius = 2 + Math.random() * 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      // 球坐标转笛卡尔坐标
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // 节点大小
      sizes[i] = 0.05 + Math.random() * 0.1;
      
      // 节点颜色
      colors[i3] = colorObj.r;
      colors[i3 + 1] = colorObj.g;
      colors[i3 + 2] = colorObj.b;
    }
    
    return { positions, sizes, colors, nodeCount };
  });
  
  // 创建节点间的连接线
  const [connectionData] = useState(() => {
    const { positions, nodeCount } = nodeData;
    const maxConnections = 250;
    const indices: number[] = [];
    
    // 为每个节点创建到最近节点的连接
    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      const p1 = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      
      // 找到距离最近的几个节点
      const nearbyNodes: { index: number, distance: number }[] = [];
      for (let j = 0; j < nodeCount; j++) {
        if (i === j) continue;
        
        const j3 = j * 3;
        const p2 = new THREE.Vector3(positions[j3], positions[j3 + 1], positions[j3 + 2]);
        const distance = p1.distanceTo(p2);
        
        if (distance < 1.5) {
          nearbyNodes.push({ index: j, distance });
        }
      }
      
      // 为最近的节点创建连接
      nearbyNodes
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)
        .forEach(node => {
          indices.push(i, node.index);
        });
    }
    
    // 限制最大连接数
    const limitedIndices = indices.slice(0, maxConnections * 2);
    return new Uint16Array(limitedIndices);
  });
  
  // 模拟数据流动画
  const DataFlowEffect = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state, delta) => {
      if (!meshRef.current) return;
      
      // 沿着圆周运动
      const time = state.clock.getElapsedTime();
      meshRef.current.position.x = Math.cos(time * 0.5) * 2.5;
      meshRef.current.position.z = Math.sin(time * 0.5) * 2.5;
      meshRef.current.position.y = Math.sin(time * 0.7) * 1.5;
      
      // 旋转和缩放
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    });
    
    return (
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial 
          color="#4fc3f7" 
          wireframe 
          transparent 
          opacity={0.8} 
        />
      </mesh>
    );
  };
  
  // 创建多个数据流
  const dataFlowCount = 5;
  const dataFlows = Array.from({ length: dataFlowCount }).map((_, index) => (
    <DataFlowEffect key={`data-flow-${index}`} />
  ));
  
  // 数字矩阵代码雨效果
  const CodeRainEffect = () => {
    const particlesCount = 50;
    const [positions] = useState(() => {
      const arr = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        // 分布在大脑周围更大的空间
        arr[i3] = (Math.random() - 0.5) * 12;     // x
        arr[i3 + 1] = (Math.random() - 0.5) * 12; // y
        arr[i3 + 2] = (Math.random() - 0.5) * 12; // z
      }
      return arr;
    });
    
    const [speeds] = useState(() => {
      return Array.from({ length: particlesCount }).map(() => 
        0.1 + Math.random() * 0.2
      );
    });
    
    const pointsRef = useRef<THREE.Points>(null);
    
    useFrame((state, delta) => {
      if (!pointsRef.current) return;
      
      const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // 向下落
        positionArray[i3 + 1] -= speeds[i] * delta * 15;
        
        // 超出范围后重置到顶部
        if (positionArray[i3 + 1] < -6) {
          positionArray[i3] = (Math.random() - 0.5) * 12;
          positionArray[i3 + 1] = 6;
          positionArray[i3 + 2] = (Math.random() - 0.5) * 12;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });
    
    return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ff41"
          size={0.15}
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </points>
    );
  };
  
  // 动画效果
  useFrame((state, delta) => {
    if (!groupRef.current || !nodesRef.current || !connectionsRef.current) return;
    
    const elapsedTime = clock.getElapsedTime();
    
    // 整体旋转
    groupRef.current.rotation.y = elapsedTime * 0.1;
    groupRef.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
    
    // 节点脉动
    const nodePositions = nodesRef.current.geometry.attributes.position.array as Float32Array;
    const nodeColors = nodesRef.current.geometry.attributes.color.array as Float32Array;
    const baseFactor = Math.sin(elapsedTime) * 0.05 + 1;
    
    for (let i = 0; i < nodeData.nodeCount; i++) {
      const i3 = i * 3;
      const x = nodePositions[i3];
      const y = nodePositions[i3 + 1];
      const z = nodePositions[i3 + 2];
      
      // 节点当前位置
      const nodePos = new THREE.Vector3(x, y, z);
      
      // 基础脉动
      let pulseFactor = baseFactor + Math.sin(elapsedTime * 0.5 + i * 0.1) * 0.02;
      
      // 安全扫描时加速脉动
      if (detectionState.isScanning) {
        const scanProgress = (elapsedTime - detectionState.lastScanTime) / 3; // 3秒扫描过程
        const scanWave = Math.sin(scanProgress * Math.PI * 6 + i * 0.2) * 0.05;
        pulseFactor += scanWave;
      }
      
      // 威胁检测反应
      if (detectionState.threatDetected) {
        // 计算节点到威胁位置的距离
        const distToThreat = nodePos.distanceTo(detectionState.threatPosition);
        if (distToThreat < 1.5) {
          // 靠近威胁的节点变红并剧烈脉动
          const threatFactor = 0.3 / (distToThreat + 0.1);
          pulseFactor += Math.sin(elapsedTime * 5) * threatFactor * 0.2;
          
          // 变红
          nodeColors[i3] = 1.0; // R
          nodeColors[i3 + 1] = 0.2; // G
          nodeColors[i3 + 2] = 0.2; // B
        } else {
          // 远离威胁的节点恢复原色
          const colorObj = new THREE.Color(color);
          nodeColors[i3] = colorObj.r;
          nodeColors[i3 + 1] = colorObj.g;
          nodeColors[i3 + 2] = colorObj.b;
        }
      }
      
      // 应用脉动效果
      nodePositions[i3] = x * pulseFactor;
      nodePositions[i3 + 1] = y * pulseFactor;
      nodePositions[i3 + 2] = z * pulseFactor;
      
      // 基础颜色脉动
      if (!detectionState.threatDetected) {
        const colorPulse = Math.sin(elapsedTime * 0.3 + i * 0.05) * 0.15 + 0.85;
        nodeColors[i3] *= colorPulse;
        nodeColors[i3 + 1] *= colorPulse;
        nodeColors[i3 + 2] *= colorPulse;
      }
    }
    
    nodesRef.current.geometry.attributes.position.needsUpdate = true;
    nodesRef.current.geometry.attributes.color.needsUpdate = true;
    
    // 更新连接线位置
    const connectionPositions = connectionsRef.current.geometry.attributes.position;
    connectionPositions.needsUpdate = true;
  });
  
  return (
    <group ref={groupRef}>
      {/* 神经元节点 */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeData.nodeCount}
            array={nodeData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={nodeData.nodeCount}
            array={nodeData.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={nodeData.nodeCount}
            array={nodeData.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>
      
      {/* 神经连接 */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeData.nodeCount}
            array={nodeData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            count={connectionData.length}
            array={connectionData}
            itemSize={1}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </lineSegments>
      
      {/* 代码雨效果 */}
      <CodeRainEffect />
      
      {/* 数据流效果 */}
      {dataFlows}
      
      {/* 威胁检测球体 */}
      {detectionState.threatDetected && (
        <mesh position={detectionState.threatPosition.toArray()}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#ff0000" transparent opacity={0.8} />
        </mesh>
      )}
      
      {/* 安全扫描效果 */}
      {detectionState.isScanning && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial 
            color="#00e8ff"
            transparent
            opacity={0.05}
            wireframe
          />
        </mesh>
      )}
    </group>
  );
};

// 创建粒子系统作为背景
const ParticleField = ({ count = 500, color = "#ffffff", scrollY }: { 
  count?: number, 
  color?: string,
  scrollY: number
}) => {
  const points = useRef<THREE.Points>(null);
  
  useFrame((state, delta) => {
    if (!points.current) return;
    
    // 粒子旋转
    points.current.rotation.y += delta * 0.05;
    points.current.rotation.x = scrollY * 0.005;
    
    // 脉动效果
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    points.current.scale.set(scale, scale, scale);
  });
  
  // 生成粒子位置
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 15;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;
    }
    
    return positions;
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
};

// 主要的背景场景组件
interface DynamicBackgroundProps {
  category?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function DynamicBackground({
  category = "默认",
  primaryColor = "#5d6bf8",
  secondaryColor = "#e83e8c",
}: DynamicBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);
  
  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <fog attach="fog" args={["#000", 8, 25]} />
        
        <group position={[0, 0, 0]}>
          <GeometryByCategory 
            category={category} 
            color={primaryColor} 
            scrollY={scrollY} 
          />
          <ParticleField 
            count={800} 
            color={secondaryColor} 
            scrollY={scrollY} 
          />
        </group>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
} 