'use client';

import { useGLTF, useScroll, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['#WIN0003_Frame_#WIN0003_Textures_0']: THREE.Mesh
    ['#WIN0003_Window_#WIN0003_Textures_0']: THREE.Mesh
    ['#WIN0003_Handle_#WIN0003_Textures_0']: THREE.Mesh
  }
  materials: {
    WIN0003_Textures: THREE.MeshPhysicalMaterial
  }
}
const WindowModel = (props: Partial<THREE.Object3D>) => {
  const handleRef = useRef<THREE.Mesh>(null);
  const windowRef = useRef<THREE.Mesh>(null);
  const imageRef = useRef<THREE.Mesh>(null);

  const { nodes, materials } = useGLTF('models/window.glb', true) as GLTFResult
  const texture = useTexture('sample_profile.png');
  const data = useScroll();

  useFrame(() => {
    const b = data.range(0.4, 0.1);
    const c = data.range(0.5, 0.1);
    const zoom = data.range(0.3, 0.4);

    if (handleRef.current) {
      handleRef.current.rotation.y = -0.5 * Math.PI * b;
    }
    if (windowRef.current) {
      windowRef.current.rotation.z = 0.5 * Math.PI * c;
    }
    if (imageRef.current) {
      const s = 1.0 + zoom * 1.5;
      imageRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <group {...props} dispose={null}>
      <group rotation={[0, Math.PI, Math.PI]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['#WIN0003_Frame_#WIN0003_Textures_0'].geometry}
          material={materials.WIN0003_Textures}
        />
        <group position={[0.441, -0.039, 0.082]} ref={windowRef}>
          <mesh
            ref={imageRef}
            position={[-0.43, -0.02, 0.52]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[1.8, 1.25, 1]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['#WIN0003_Window_#WIN0003_Textures_0'].geometry}
            material={materials.WIN0003_Textures} />
          <mesh ref={handleRef}
            castShadow
            receiveShadow
            geometry={nodes['#WIN0003_Handle_#WIN0003_Textures_0'].geometry}
            material={materials.WIN0003_Textures}
            position={[-0.84, -0.018, 0.55]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('models/window.glb');
useTexture.preload('sample_profile.png');

export default WindowModel;
