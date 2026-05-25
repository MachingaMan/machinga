"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FadeObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
                target.style.opacity   = '1';
                target.style.transform = 'translateY(0)';
            } else {
                target.style.opacity   = '0';
                if (entry.boundingClientRect.top < 0) {
                    target.style.transform = 'translateY(-40px)';
                } else {
                    target.style.transform = 'translateY(40px)';
                }
            }
        });
    }, { threshold: 0.1 });

    const sweepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                sweepObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.02 });

    const selectors = [
        '.reveal-on-scroll > .container', 
        '.fs-card-content',
        '.cs-hero > .cs-container',
        '.cs-block-section > .cs-container',
        '.cs-split-section > .cs-container',
        '.cs-stats-section > .cs-container',
        '.cs-next-project > .cs-next-content'
    ];

    const elements = document.querySelectorAll(selectors.join(', '));
    elements.forEach(el => {
        const target = el as HTMLElement;
        target.style.opacity    = '0';
        target.style.transform  = 'translateY(40px)';
        target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        fadeObserver.observe(target);
    });

    let sweepTimeout: NodeJS.Timeout;
    const setupSweepObserver = () => {
        const sweepElements = document.querySelectorAll('.sweep-reveal-text');
        if (sweepElements.length === 0) {
            sweepTimeout = setTimeout(setupSweepObserver, 100);
            return;
        }
        sweepElements.forEach(el => {
            sweepObserver.observe(el);
        });
    };
    setupSweepObserver();

    let videoTimeout: NodeJS.Timeout;
    const syncVideoPlayhead = () => {
        try {
            const savedTime = sessionStorage.getItem('transitionVideoTime');
            if (!savedTime) return;

            const video = document.querySelector('.cs-fs-hero-bg') as HTMLVideoElement;
            if (!video) {
                // Poll until the video element is mounted in the DOM
                videoTimeout = setTimeout(syncVideoPlayhead, 50);
                return;
            }
            video.currentTime = parseFloat(savedTime);
            sessionStorage.removeItem('transitionVideoTime');
        } catch (err) {
            console.error("Failed to sync video playhead:", err);
        }
    };
    syncVideoPlayhead();

    return () => {
        fadeObserver.disconnect();
        sweepObserver.disconnect();
        clearTimeout(sweepTimeout);
        clearTimeout(videoTimeout);
    };
  }, [pathname]);

  return null;
}
