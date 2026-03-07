'use client';

import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useThemeStore } from "@stores";

const TextWindow = () => {
  const data = useScroll();
  const windowRef = useRef<THREE.Group>(null);
  const isDark = useThemeStore((state) => state.theme.type === 'dark');
  const color = isDark ? "white" : "#1e293b"; // Slate 800 for light mode

  useFrame(() => {
    const c = data.range(0.65, 0.15);

    if (windowRef.current) {
      windowRef.current.setRotationFromAxisAngle(new THREE.Vector3(0, -1, 0), 0.5 * Math.PI * c);
      windowRef.current.position.x = -0.6 * c;
      windowRef.current.position.z = -0.6 * c;
    }
  });

  const fontProps = {
    font: "./soria-font.ttf",
  };

  return (
    <group position={[0, -0.3, 0]} ref={windowRef}>

      <Text color={color} anchorX="left" anchorY="middle"
        fontSize={1.3}
        position={[0.12, 0, 0]}
        {...fontProps}
        scale={[1, -1, 1]}
        rotation={[0, 0, -Math.PI / 2]}>
        FRONTEND ENGINEER
      </Text>

      <Text color={color} anchorX="right" anchorY="middle"
        {...fontProps}
        scale={[-1, -1, 1]}
        fontSize={1.3}
        position={[0.12, 0, -1.4]}
        rotation={[0, 0, -Math.PI / 2]}>
        DESIGNER. DEVELOPER
      </Text>

      <group position={[-0.45, 0, -0.3]}>
        <Text color={color} anchorX="left" anchorY="middle"
          {...fontProps}
          scale={[1, -1, 1]}
          fontSize={0.8}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}>
          DEBUGGER. ARCHITECT.
        </Text>

        <Text color={color} anchorX="left" anchorY="middle"
          {...fontProps}
          scale={[1, -1, 1]}
          fontSize={0.8}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}>
          DJ. MELOMANIAC
        </Text>
      </group>

      <group position={[0.45, 0, -0.3]}>
        <Text color={color} anchorX="right" anchorY="middle"
          {...fontProps}
          scale={[-1, -1, 1]}
          fontSize={0.8}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}>
          GAMER. CREATIVE
        </Text>
        <Text color={color} anchorX="right" anchorY="middle"
          {...fontProps}
          scale={[-1, -1, 1]}
          fontSize={0.8}
          position={[0, 0, -0.6]}
          rotation={[0, -Math.PI / 2, -Math.PI / 2]}>
          CREATIVE. OPTIMIST
        </Text>
      </group>
    </group>
  );
}

export default TextWindow;