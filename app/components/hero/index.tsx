'use client';

import { Text, useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import TechStack from "../models/TechStack";
import StarsContainer from "../models/Stars";
import WindowModel from "../models/WindowModel";
import TextWindow from "./TextWindow";
import { useThemeStore } from "@stores";
import LightDecor from "../models/LightDecor";
import CloudContainer from "../models/Cloud";

const Hero = () => {
  const titleRef = useRef<THREE.Mesh>(null);
  const { progress } = useProgress();
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme.type === 'dark';
  const color = isDark ? "white" : "#1e293b";

  useEffect(() => {
    if (progress === 100 && titleRef.current) {
      gsap.fromTo(titleRef.current.position, {
        y: -10,
        duration: 1,
      }, {
        y: 0,
        duration: 3
      });
    }
  }, [progress]);

  const fontProps = {
    font: "./soria-font.ttf",
    fontSize: 1.2,
  };

  return (
    <>
      <Text position={[0, 2, -10]} {...fontProps} ref={titleRef} color={color}>I am Aayush Bhargava.</Text>
      <TechStack />
      <StarsContainer />
      <LightDecor />
      <group position={[0, -25, 5.69]}>
        {!isDark && <CloudContainer />}
        <WindowModel receiveShadow />
        <TextWindow />
      </group>
    </>
  );
};

export default Hero;
