import { ScrollControls, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { usePortalStore, useScrollStore } from "@stores";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Timeline from "./Timeline";
import TimelineMobile from "./TimelineMobile";

const Work = () => {
  const { viewport } = useThree();
  const isMobileView = viewport.width < 10;
  const isActive = usePortalStore((state) => state.activePortalId === 'work');
  const { scrollProgress, setScrollProgress } = useScrollStore();
  const backdropRef = useRef<THREE.Mesh>(null);

  const backdropTexture = useTexture('work_backdrop.png');

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    setScrollProgress(progress);
  }

  useFrame((state, delta) => {
    if (isActive && backdropRef.current) {
      backdropRef.current.position.y = THREE.MathUtils.damp(backdropRef.current.position.y, scrollProgress * 6, 4, delta);
      backdropRef.current.position.x = THREE.MathUtils.damp(backdropRef.current.position.x, -scrollProgress * 8, 4, delta);
      backdropRef.current.position.z = THREE.MathUtils.damp(backdropRef.current.position.z, -5 - scrollProgress * 14, 4, delta);

      const zoom = 1.5 + scrollProgress * 0.8;
      backdropRef.current.scale.set(zoom, zoom, 1);
    }
  });

  useEffect(() => {
    if (isActive) {
      const scrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;
      const originalScrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      setScrollProgress(0);
      scrollWrapper.addEventListener('scroll', handleScroll)
      scrollWrapper.style.zIndex = '1';
      originalScrollWrapper.style.zIndex = '-1';
    } else {
      const scrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      const originalScrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;

      if (scrollWrapper) {
        scrollWrapper.scrollTo({ top: 0, behavior: 'smooth' });
        setScrollProgress(0);
        scrollWrapper.removeEventListener('scroll', handleScroll);
        scrollWrapper.style.zIndex = '-1';
        originalScrollWrapper.style.zIndex = '1';
      }
    }
  }, [isActive]);

  return (
    <group>
      <mesh receiveShadow ref={backdropRef} position={[0, 0, -5]}>
        <planeGeometry args={[30, 30, 1]} />
        <meshBasicMaterial map={backdropTexture} transparent opacity={0.8} />
      </mesh>

      <ScrollControls style={{ zIndex: -1 }} pages={2} maxSpeed={0.4}>
        {isMobileView ? (
          <TimelineMobile progress={isActive ? scrollProgress : 0} />
        ) : (
          <Timeline progress={isActive ? scrollProgress : 0} />
        )}
      </ScrollControls>
    </group>
  );
};


export default Work;