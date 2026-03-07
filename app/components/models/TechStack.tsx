'use client';

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useThemeStore } from "@stores";

const TechSymbol = ({ children, position, speed, rotationSpeed }: { children: string, position: [number, number, number], speed: number, rotationSpeed: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const isDark = useThemeStore((state) => state.theme.type === 'dark');

    // Use emerald in dark mode, and a classy dark slate in light mode for contrast
    const color = isDark ? "#10b981" : "#475569";

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.005;
            meshRef.current.rotation.x += rotationSpeed;
            meshRef.current.rotation.y += rotationSpeed;
        }
    });

    return (
        <Text
            ref={meshRef}
            position={position}
            fontSize={0.5}
            color={color}
            anchorX="center"
            anchorY="middle"
            font="./Vercetti-Regular.woff"
        >
            {children}
        </Text>
    );
};

const TechStack = () => {
    const symbols = useMemo(() => [
        { text: "{}", pos: [-5, 2, -15], s: 0.5, r: 0.01 },
        { text: "</>", pos: [5, -2, -12], s: 0.7, r: 0.005 },
        { text: "=>", pos: [-8, -5, -18], s: 0.4, r: 0.015 },
        { text: "( )", pos: [10, 5, -20], s: 0.6, r: 0.008 },
        { text: "[ ]", pos: [-12, 8, -25], s: 0.8, r: 0.012 },
        { text: "72%", pos: [15, -10, -30], s: 0.3, r: 0.003 },
        { text: "60fps", pos: [-18, -15, -35], s: 0.5, r: 0.007 },
        { text: "42ms", pos: [20, 15, -40], s: 0.2, r: 0.004 },
        { text: "1.2MB", pos: [-25, 20, -50], s: 0.9, r: 0.02 },
        { text: "console.log", pos: [0, 10, -10], s: 0.6, r: 0.002 },
        { text: "GET /api", pos: [-10, 0, -20], s: 0.4, r: 0.006 },
        { text: "200 OK", pos: [8, 12, -15], s: 0.7, r: 0.01 },
        { text: "const", pos: [-15, -10, -15], s: 0.3, r: 0.005 },
        { text: "yield", pos: [12, -8, -12], s: 0.5, r: 0.008 },
        { text: "async", pos: [-5, 15, -25], s: 0.4, r: 0.012 },
        { text: "await", pos: [15, 20, -30], s: 0.6, r: 0.009 },
        { text: "0xFC12", pos: [-20, 0, -40], s: 0.8, r: 0.015 },
        { text: "10110", pos: [25, -5, -45], s: 0.7, r: 0.002 },
        { text: "React", pos: [0, -20, -20], s: 0.5, r: 0.004 },
        { text: "Three.js", pos: [-10, -25, -30], s: 0.4, r: 0.006 },
        { text: "Next.js", pos: [10, -30, -35], s: 0.6, r: 0.008 },
        { text: "λ", pos: [-8, 5, -8], s: 0.9, r: 0.02 },
        { text: "Π", pos: [5, 8, -5], s: 0.8, r: 0.018 },
        { text: "import", pos: [-20, 5, -20], s: 0.3, r: 0.004 },
        { text: "export", pos: [18, -12, -18], s: 0.5, r: 0.006 },
        { text: "interface", pos: [-15, 25, -40], s: 0.4, r: 0.01 },
        { text: "enum", pos: [22, -18, -35], s: 0.6, r: 0.012 },
        { text: "TypeScript", pos: [-30, -5, -60], s: 0.7, r: 0.005 },
        { text: "Rust", pos: [35, 12, -70], s: 0.8, r: 0.015 },
        { text: "Python", pos: [-12, -40, -50], s: 0.5, r: 0.008 },
        { text: "SQL", pos: [28, 30, -45], s: 0.4, r: 0.01 }
    ], []);

    return (
        <group>
            {symbols.map((symbol, i) => (
                <TechSymbol
                    key={i}
                    position={symbol.pos as [number, number, number]}
                    speed={symbol.s}
                    rotationSpeed={symbol.r}
                >
                    {symbol.text}
                </TechSymbol>
            ))}
        </group>
    );
};

export default TechStack;
