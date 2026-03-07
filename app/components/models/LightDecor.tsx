'use client';

import { Text, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useMemo } from "react";
import { useThemeStore } from "@stores";

const LightDecor = () => {
    const isDark = useThemeStore((state) => state.theme.type === 'dark');

    const orbs = useMemo(() => [
        { position: [-6, 4, -12], size: 1.2, speed: 1.5, color: "#cbd5e1" }, // Hero
        { position: [7, -3, -10], size: 0.8, speed: 2, color: "#94a3b8" },   // Hero
        { position: [-8, -15, -8], size: 1.0, speed: 1.3, color: "#e2e8f0" }, // Mid
        { position: [10, -25, -12], size: 1.5, speed: 1.7, color: "#cbd5e1" }, // End
        { position: [-12, -35, -15], size: 1.2, speed: 1.1, color: "#94a3b8" }, // Footer
    ], []);

    const keywords = useMemo(() => [
        { text: "SYSTEMS", position: [-4, -2, -8], speed: 1 },
        { text: "PIXELS", position: [5, 3, -10], speed: 0.8 },
        { text: "CODE", position: [-8, 6, -15], speed: 1.2 },
        { text: "ART", position: [10, -5, -12], speed: 0.9 },
        { text: "DESIGN", position: [-10, -18, -10], speed: 1.1 },
        { text: "EXPERIENCE", position: [8, -28, -14], speed: 1.3 },
    ], []);

    if (isDark) return null;

    return (
        <group>
            {orbs.map((orb, i) => (
                <Float key={`orb-${i}`} speed={orb.speed} rotationIntensity={0.5} floatIntensity={1}>
                    <Sphere args={[orb.size, 32, 32]} position={orb.position as [number, number, number]}>
                        <MeshDistortMaterial
                            color={orb.color}
                            speed={2}
                            distort={0.4}
                            transparent
                            opacity={0.4}
                        />
                    </Sphere>
                </Float>
            ))}

            {keywords.map((kw, i) => (
                <Float key={`kw-${i}`} speed={kw.speed} rotationIntensity={0.2} floatIntensity={0.5}>
                    <Text
                        position={kw.position as [number, number, number]}
                        fontSize={0.4}
                        color="#64748b" // Slate 500
                        font="./Vercetti-Regular.woff"
                        fillOpacity={0.6}
                    >
                        {kw.text}
                    </Text>
                </Float>
            ))}
        </group>
    );
};

export default LightDecor;
