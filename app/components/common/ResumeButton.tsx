'use client';

import { useScrollStore } from '@/app/stores/scrollStore';
import { useProgress } from '@react-three/drei';
import { usePortalStore, useThemeStore } from '@stores';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

const ResumeButton = () => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const isPortalActive = usePortalStore((state) => !!state.activePortalId);
    const scrollProgress = useScrollStore((state) => state.scrollProgress);
    const { progress } = useProgress();

    const [loaded, setLoaded] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => { setLoaded(progress === 100) }, [progress]);

    useEffect(() => {
        if (loaded) {
            gsap.to(buttonRef.current, {
                duration: 2,
                delay: 2,
                right: 0,
                onComplete: () => setStartAnimation(true),
            });
        }
    }, [loaded]);

    useEffect(() => {
        if (isPortalActive) return;
        if (startAnimation && buttonRef.current) {
            gsap.to(buttonRef.current, {
                right: -scrollProgress * 1000,
                duration: 0.05,
                ease: 'power2.out',
            });
        }
    }, [startAnimation, scrollProgress]);

    const handleResumeClick = () => {
        window.open('/resume.pdf', '_blank');
    };

    return (
        <div
            ref={buttonRef}
            onClick={handleResumeClick}
            style={{
                position: 'fixed',
                zIndex: 999,
                top: '50%',
                right: '24px',
                transform: 'translateY(-50%) rotate(-90deg)',
                transformOrigin: 'right center',
                cursor: 'pointer',
                backgroundColor: '#10b981', // Emerald 500
                color: '#020617', // Slate 950
                padding: '12px 28px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                letterSpacing: '0.3rem',
                fontFamily: 'var(--font-vercetti), sans-serif',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #020617',
                borderRadius: '4px',
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#059669'; // Darker Emerald
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = '#10b981';
            }}
        >
            RESUME
        </div>
    );
};

export default ResumeButton;
