import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { usePortalStore, useScrollStore } from "@stores";
import { Wanderer } from "../../models/Wanderer";
import ProjectsCarousel from "./ProjectsCarousel";
import { TouchPanControls } from "./TouchPanControls";

const Projects = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "projects");
  const { scrollProgress, setScrollProgress } = useScrollStore();

  useEffect(() => {
    if (isActive) {
      if (isMobile) {
        gsap.to(camera.position, { z: 11.5, y: -39, x: 1, duration: 1 });
      } else {
        gsap.to(camera.position, { y: -39, x: 2, duration: 1 });
      }

      setScrollProgress(0);

      // Listen for mouse wheel to rotate the carousel smoothly
      const handleWheel = (e: WheelEvent) => {
        const currentProgress = useScrollStore.getState().scrollProgress;
        let newProgress = currentProgress + e.deltaY * 0.001;
        newProgress = Math.max(0, Math.min(1, newProgress));
        setScrollProgress(newProgress);
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      return () => {
        window.removeEventListener("wheel", handleWheel);
      };

    } else {
      setScrollProgress(0);
    }
  }, [isActive, setScrollProgress]);

  useFrame((state, delta) => {
    if (isActive) {
      if (!isMobile) {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 4, 0.03);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 11.5 - state.pointer.y, 7, delta);
      }
    }
  });

  return (
    <group>
      <Wanderer rotation={new THREE.Euler(0, Math.PI / 6, 0)} scale={new THREE.Vector3(1.5, 1.5, 1.5)} position={new THREE.Vector3(0, -1, -1)} />
      <ProjectsCarousel scrollProgress={isActive ? scrollProgress : 0} />
      {isActive && isMobile && <TouchPanControls />}
    </group>
  );
};

export default Projects;
