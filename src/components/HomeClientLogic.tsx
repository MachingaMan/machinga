// @ts-nocheck
"use client";
import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { useRouter } from 'next/navigation';

export default function HomeClientLogic() {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const router = useRouter();
  const handleScrollRef = useRef<((e: any) => void) | undefined>(undefined);

  useLenis((e) => {
    if (handleScrollRef.current) {
      handleScrollRef.current(e);
    }
  });

  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis) {
      const heroSection = document.getElementById('hero-bubble-section');
      const isCollapsed = heroSection?.classList.contains('collapsed');
      const isVideoPlaying = heroSection?.classList.contains('video-playing');
      if (isCollapsed || isVideoPlaying) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis]);

  useEffect(() => {
    console.log("Machinga Client Logic Init: Mounting...");
    
    let active = true;
    let cleanupFn: (() => void) | null = null;

    const init = () => {
      if (!active) return;

      const heroSection = document.getElementById('hero-bubble-section');
      const logoBtn = document.getElementById('hero-logo-btn');
      const bubbles = document.querySelectorAll('.project-bubble');
      const siteHeader = document.querySelector('.site-header');

      // If key elements or Lenis are not ready in the DOM, wait for the next frame
      if (!logoBtn || !heroSection || !lenisRef.current) {
        requestAnimationFrame(init);
        return;
      }

      const video = document.getElementById('how-we-work-video') as HTMLVideoElement;
      let resolvedPageVideo: HTMLVideoElement | null = null;
      let sweepObserver: IntersectionObserver | null = null;
      let videoObserver: IntersectionObserver | null = null;
      let sweepTimeout: NodeJS.Timeout | null = null;
      let videoTimeout: NodeJS.Timeout | null = null;

      let pullY = 0;
      let releaseTimeout: NodeJS.Timeout | null = null;
      let isPulling = false;
      let isLockedDuringAnimation = false;
      let isLocked = false;
      let videoState: 'idle' | 'snapping' | 'snapped_closed' | 'playing_expand' | 'snapped_expanded' | 'playing_contract' | 'playing_contract_up' | 'finished' = 'idle';
      let checkFrameId: number | null = null;
      let lastTime = 0;
      let wantsRewind: 'down' | 'up' | null = null;
      let breathDirection: 'forward' | 'backward' = 'forward';
      let workActiveIndex = -1;
      let isSnappingToCard = false;
      let lastSnapTime = 0;
      const heroContainer = document.querySelector('.hero-bubble-container') as HTMLElement;

      const updateScrollLock = () => {
        const isCollapsed = heroSection.classList.contains('collapsed');
        const isVideoPlaying = heroSection.classList.contains('video-playing');
        if (isCollapsed || isVideoPlaying || isLockedDuringAnimation || isLocked) {
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
          if (lenisRef.current) {
            lenisRef.current.stop();
          }
        } else {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          if (lenisRef.current) {
            lenisRef.current.start();
          }
        }
      };

      // Check if we should return in expanded state (e.g. back button clicked or back navigation)
      const hasScroll = typeof window !== 'undefined' && window.scrollY > 50;
      const shouldBeExpanded = typeof window !== 'undefined' && (
        sessionStorage.getItem('returnExpanded') === 'true' || 
        window.location.search.includes('expanded=true') ||
        hasScroll
      );

      if (shouldBeExpanded) {
        heroSection.classList.remove('collapsed');
        if (logoBtn) {
          logoBtn.classList.remove('logo-intro-hidden');
        }
        try {
          sessionStorage.removeItem('returnExpanded');
        } catch (e) {}
      }

      // Reset any transition leftovers to ensure pages load fully visible
      const main = document.querySelector('main');
      if (main) {
        main.style.opacity = '';
        main.style.transition = '';
      }
      if (siteHeader) {
        (siteHeader as HTMLElement).style.opacity = '';
        (siteHeader as HTMLElement).style.transition = '';
        siteHeader.classList.remove('header-hidden');
      }
      updateScrollLock();

      console.log("Machinga Client Logic: DOM elements ready, binding listeners.");

      // ── Typewriter Reveal on Load ──────────────────────────────────────────────
      const headline = document.getElementById('hero-headline');
      if (headline) {
        setTimeout(() => {
          if (!active) return;
          const isCollapsed = heroSection.classList.contains('collapsed');
          if (isCollapsed) {
            headline.classList.remove('headline-hidden');
          }
        }, 150);
      }

      // ── Logo Intro Fade-in on Load ──────────────────────────────────────────────
      if (logoBtn && logoBtn.classList.contains('logo-intro-hidden')) {
        setTimeout(() => {
          if (!active) return;
          logoBtn.classList.remove('logo-intro-hidden');
        }, 2400); // 2400ms after mount (shortly after the scroll cue is fully visible)
      }

      // ── Central Logo Button: Magnetic Effect & Collapse Toggle ──────────────────
      let logoMouseActive = false;
      let btnX = 0;
      let btnY = 0;

      const handleLogoMouseEnter = () => {
        const rect = logoBtn.getBoundingClientRect();
        btnX = rect.left + rect.width / 2;
        btnY = rect.top + rect.height / 2;
        
        // Expand bubbles on hover (mouseenter)
        const isVideoPlaying = heroSection.classList.contains('video-playing');
        if (!isVideoPlaying) {
          heroSection.classList.remove('collapsed');
          const headlineEl = document.getElementById('hero-headline');
          if (headlineEl && window.innerWidth > 768) {
            headlineEl.classList.add('headline-hidden');
          }
          updateScrollLock();
        }
      };

      const handleLogoMouseMove = (e: MouseEvent) => {
        if (window.innerWidth <= 768) return;
        logoMouseActive = true;

        if (btnX === 0 || btnY === 0) {
          handleLogoMouseEnter();
        }

        // Mouse distance from center
        const deltaX = e.clientX - btnX;
        const deltaY = e.clientY - btnY;

        // Elastic magnetic pull
        const pullX = deltaX * 0.18;
        const pullY = deltaY * 0.18;

        logoBtn.style.transition = 'none';
        logoBtn.style.transform = `translateX(-50%) translate(${pullX}px, ${pullY}px) scale(1.04)`;
        
        const img = logoBtn.querySelector('.logo-icon-img') as HTMLElement;
        if (img) {
          img.style.transition = 'none';
          img.style.transform = `translate(${pullX * 0.25}px, ${pullY * 0.25}px) rotate(${pullX * 0.15}deg)`;
        }
      };

      const handleLogoMouseLeave = () => {
        logoMouseActive = false;
        btnX = 0;
        btnY = 0;
        
        logoBtn.style.transition = '';
        logoBtn.style.transform = '';
        
        const img = logoBtn.querySelector('.logo-icon-img') as HTMLElement;
        if (img) {
          img.style.transition = '';
          img.style.transform = '';
        }
      };


      const handleLogoClick = (e: Event) => {
        e.preventDefault();
        
        const video = document.getElementById('how-we-work-video') as HTMLVideoElement;
        const isVideoPlaying = heroSection.classList.contains('video-playing');
        
        if (isVideoPlaying) {
          // Logo clicked while video is playing: stop video and expand bubbles (exit video mode)
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
          heroSection.classList.remove('video-playing');
          heroSection.classList.remove('collapsed'); // Re-expand case studies
          updateScrollLock();
          
          // Show headline if cursor is far enough
          const headlineEl = document.getElementById('hero-headline');
          if (headlineEl && window.innerWidth > 768) {
            headlineEl.classList.add('headline-hidden'); // Stay hidden when expanded
          }
        } else {
          // Normal behavior
          const isCollapsed = heroSection.classList.contains('collapsed');
          heroSection.classList.toggle('collapsed');
          updateScrollLock();
          
          const headlineEl = document.getElementById('hero-headline');
          if (headlineEl) {
            if (isCollapsed) {
              headlineEl.classList.add('headline-hidden');
            } else {
              if (window.innerWidth <= 768) {
                headlineEl.classList.remove('headline-hidden');
              } else {
                headlineEl.classList.add('headline-hidden');
              }
            }
          }
        }
      };

      // ── Mouse Move Parallax Parallax Drift for Floating Bubbles ──────────────────
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const headlineEl = document.getElementById('hero-headline');
        if (headlineEl) {
          if (window.innerWidth > 768) {
            const isVideoPlaying = heroSection.classList.contains('video-playing');
            if (isVideoPlaying) {
              headlineEl.classList.add('headline-hidden');
              return;
            }

            const isCollapsed = heroSection.classList.contains('collapsed');
            if (!isCollapsed) {
              headlineEl.classList.add('headline-hidden');
            } else {
              const rect = logoBtn.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              
              const dx = e.clientX - centerX;
              const dy = e.clientY - centerY;
              const distSq = dx * dx + dy * dy;
              
              if (distSq < 57600) { // 240px squared
                headlineEl.classList.add('headline-hidden');
              } else {
                headlineEl.classList.remove('headline-hidden');
              }
            }
          }
        }

        if (window.innerWidth <= 768 || bubbles.length === 0) return;
        if (heroSection.classList.contains('collapsed')) return;

        const normX = (e.clientX / window.innerWidth) - 0.5;
        const normY = (e.clientY / window.innerHeight) - 0.5;

        bubbles.forEach((bubble, idx) => {
          const factor = (idx + 1) * 12;
          const driftX = normX * factor;
          const driftY = normY * factor;
          
          const video = bubble.querySelector('.bubble-video') as HTMLElement;
          if (video) {
            video.style.setProperty('--drift-x', `${driftX}px`);
            video.style.setProperty('--drift-y', `${driftY}px`);
          }
        });
      };

      // ── Header Scroll Handler ───────────────────────────────────────────────────
      let lastScrollY = window.scrollY;
      const handleHeaderScroll = () => {
        if (!siteHeader) return;
        const cur = window.scrollY;
        const threshold = window.innerHeight * 0.8;
        if (cur > threshold && cur > lastScrollY) {
          siteHeader.classList.add('header-hidden');
        } else {
          siteHeader.classList.remove('header-hidden');
        }
        lastScrollY = cur;
      };

      // ── Beliefs Scroll Handler ──────────────────────────────────────────────────
      const beliefItems = document.querySelectorAll('.belief-scroll-item');
      const dynamicWordsContainer = document.getElementById('dynamic-belief-words');

      const handleBeliefScroll = () => {
        if (window.innerWidth <= 1024) return;
        if (!dynamicWordsContainer || beliefItems.length === 0) return;

        const centerY = window.innerHeight / 2;
        const maxDist = window.innerHeight / 2.5;

        let activeIndex = 0;
        let minDistance = Infinity;

        beliefItems.forEach(item => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const dist = Math.abs(centerY - itemCenter);

          let opacity = 1 - (dist / maxDist);
          if (opacity < 0.2) opacity = 0.2;
          if (opacity > 1) opacity = 1;

          (item as HTMLElement).style.opacity = opacity.toString();

          if (dist < minDistance) {
            minDistance = dist;
            activeIndex = parseInt(item.getAttribute('data-index') || "0");
          }
        });

        dynamicWordsContainer.style.transform = `translateY(-${activeIndex * 60}px)`;
      };

      // ── Fable Word Scroll Reveal Handler ─────────────────────────────────────────
      const fableContainer = document.querySelector('.about-story');
      const fableWords = document.querySelectorAll('.fable-word');

      const handleFableScroll = () => {
        if (!fableContainer || fableWords.length === 0) return;

        const rect = fableContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const startY = viewportHeight * 0.85;
        const elementHeight = rect.height;

        let progress = (startY - rect.top) / (elementHeight + viewportHeight * 0.45);
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        fableWords.forEach(word => {
          const index = parseInt(word.getAttribute('data-index') || "0");
          const total = fableWords.length;
          const wordOffset = index / total;
          const activeProgress = progress * 1.08 - 0.04;
          
          let opacity = 0.15;
          const diff = activeProgress - wordOffset;
          if (diff > 0) {
            const windowSize = 0.035; 
            opacity = 0.15 + (0.85 * Math.min(diff / windowSize, 1));
          }
          (word as HTMLElement).style.opacity = opacity.toString();
        });
      };

      // Bind Listeners
      setupBubbleVideoAutoCropping();

      logoBtn.addEventListener('mouseenter', handleLogoMouseEnter);
      logoBtn.addEventListener('mousemove', handleLogoMouseMove);
      logoBtn.addEventListener('mouseleave', handleLogoMouseLeave);
      logoBtn.addEventListener('click', handleLogoClick);



      // Transition click handler for case studies
      const handleProjectBubbleClick = (e: MouseEvent) => {
        const link = e.currentTarget as HTMLAnchorElement;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('/#') || href === '/#work') return;
        
        e.preventDefault();
        
        // Save state to return to expanded bubbles when coming back (browser back button fallback)
        try {
          sessionStorage.setItem('returnExpanded', 'true');
        } catch (err) {}
        
        // Disable body scroll during transition
        document.body.style.overflow = 'hidden';
        
        const rect = link.getBoundingClientRect();
        const videoEl = link.querySelector('video') as HTMLVideoElement;
        const videoSrc = videoEl ? videoEl.getAttribute('src') : null;
        const playheadTime = videoEl ? videoEl.currentTime : 0;
        
        try {
          sessionStorage.setItem('transitionVideoTime', playheadTime.toString());
        } catch (err) {}
        
        // Calculate center and radius of the clicked bubble relative to the viewport
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radius = rect.width / 2;

        // Create full screen overlay matching the bubble
        const overlay = document.createElement('div');
        overlay.className = 'bubble-transition-overlay';
        
        // Initialize clipped to the circular bounds of the clicked bubble
        const initialClip = `circle(${radius}px at ${centerX}px ${centerY}px)`;
        overlay.style.clipPath = initialClip;
        overlay.style.webkitClipPath = initialClip;
        
        if (videoSrc) {
          const video = document.createElement('video');
          video.src = videoSrc;
          video.autoplay = true;
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          video.style.width = '100%';
          video.style.height = '100%';
          video.style.objectFit = 'cover';
          video.currentTime = playheadTime; // Sync playhead!
          overlay.appendChild(video);
        }
        
        document.body.appendChild(overlay);
        
        // Force reflow
        overlay.offsetHeight;
        
        // Expand clip-path to swallow the screen (150vmax ensures total coverage from any center)
        const finalClip = `circle(150vmax at ${centerX}px ${centerY}px)`;
        overlay.style.clipPath = finalClip;
        overlay.style.webkitClipPath = finalClip;
        
        // Fade out body wrapper content
        const main = document.querySelector('main');
        const header = document.querySelector('.site-header');
        if (main) {
          main.style.transition = 'opacity 0.6s ease';
          main.style.opacity = '0';
        }
        if (header) {
          header.style.transition = 'opacity 0.6s ease';
          header.style.opacity = '0';
        }
        
        // Navigate
        setTimeout(() => {
          router.push(href);
          
          // Cleanup overlay shortly after navigation begins to prevent issues on page load
          setTimeout(() => {
            overlay.style.opacity = '0';
            
            setTimeout(() => {
              if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
              }
              document.body.style.overflow = '';
              if (main) {
                main.style.opacity = '';
                main.style.transition = '';
              }
              if (header) {
                header.style.opacity = '';
                header.style.transition = '';
              }
            }, 600);
          }, 400);
        }, 750);
      };

      const projectBubbles = document.querySelectorAll('.project-bubble:not([data-project="anchor"]):not([data-project="decorative"])');
      projectBubbles.forEach(bubble => {
        bubble.addEventListener('click', handleProjectBubbleClick as EventListener);
      });

      // ── Dynamic Video Auto-Cropping (No Black Borders) ─────────────────────────
      function setupBubbleVideoAutoCropping() {
        const videos = document.querySelectorAll('.bubble-video') as NodeListOf<HTMLVideoElement>;
        
        videos.forEach((vid) => {
          let processed = false;
          let checkCount = 0;
          const maxChecks = 25; // Try up to 25 times
          let intervalId: any = null;

          const analyzeFrame = () => {
            if (processed || checkCount >= maxChecks) {
              if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
              }
              return;
            }

            if (vid.paused || vid.ended || vid.readyState < 2) {
              return; // Video not playing or not ready
            }

            checkCount++;

            try {
              const videoWidth = vid.videoWidth;
              const videoHeight = vid.videoHeight;
              if (videoWidth === 0 || videoHeight === 0) return;

              // Create offscreen canvas for scanning
              const canvas = document.createElement('canvas');
              const width = 160;
              const height = Math.round((videoHeight / videoWidth) * width) || 90;
              canvas.width = width;
              canvas.height = height;

              const ctx = canvas.getContext('2d');
              if (!ctx) return;

              ctx.drawImage(vid, 0, 0, width, height);
              const imgData = ctx.getImageData(0, 0, width, height);
              const data = imgData.data;

              // Check if frame is too dark (e.g. initial transition / black screen)
              let maxVal = 0;
              for (let i = 0; i < data.length; i += 4) {
                const val = Math.max(data[i], data[i+1], data[i+2]);
                if (val > maxVal) maxVal = val;
              }

              if (maxVal < 25) {
                return; // Wait for a brighter frame
              }

              // Scan bounding box of non-black pixels
              const BLACK_THRESHOLD = 15;
              let minY = height;
              let maxY = 0;
              let minX = width;
              let maxX = 0;
              let hasContent = false;

              for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                  const idx = (y * width + x) * 4;
                  const r = data[idx];
                  const g = data[idx + 1];
                  const b = data[idx + 2];
                  if (r > BLACK_THRESHOLD || g > BLACK_THRESHOLD || b > BLACK_THRESHOLD) {
                    hasContent = true;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                  }
                }
              }

              if (!hasContent) return;

              const w = maxX - minX + 1;
              const h = maxY - minY + 1;

              // Safeguard against too-small bounding box (e.g. tiny logo on dark background)
              if (w < width * 0.15 || h < height * 0.15) {
                return;
              }

              // Found valid content frame! Crop now.
              processed = true;
              if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
              }

              // Normalize margins
              const L = minX / width;
              const R = (width - 1 - maxX) / width;
              const T = minY / height;
              const B = (height - 1 - maxY) / height;

              const marginThreshold = 0.02;
              if (L < marginThreshold && R < marginThreshold && T < marginThreshold && B < marginThreshold) {
                console.log(`Video ${vid.src || vid.currentSrc} has no significant borders.`);
                vid.style.setProperty('--tx', '0%');
                vid.style.setProperty('--ty', '0%');
                vid.style.setProperty('--zoom-factor', '1');
                return;
              }

              // Content fraction
              const fx = w / width;
              const fy = h / height;
              const aspect = videoWidth / videoHeight;

              // Calculate required crop scale
              let S = 1.0;
              if (aspect >= 1) {
                S = Math.max(1 / (fx * aspect), 1 / fy);
              } else {
                S = Math.max(1 / fx, aspect / fy);
              }

              // Center alignment offset
              const cx = L + fx / 2;
              const cy = T + fy / 2;
              const txPercent = -(cx - 0.5) * 100;
              const tyPercent = -(cy - 0.5) * 100;

              console.log(`Cropping bubble video:`, {
                src: vid.src || vid.currentSrc,
                aspect,
                margins: { L, R, T, B },
                zoom: S,
                tx: txPercent,
                ty: tyPercent
              });

              vid.style.setProperty('--tx', `${txPercent}%`);
              vid.style.setProperty('--ty', `${tyPercent}%`);
              vid.style.setProperty('--zoom-factor', `${S}`);

            } catch (err) {
              console.error("Error auto-cropping video:", err);
            }
          };

          const startPolling = () => {
            if (processed) return;
            if (!intervalId) {
              intervalId = setInterval(analyzeFrame, 250);
            }
          };

          vid.addEventListener('playing', startPolling);
          vid.addEventListener('timeupdate', startPolling);
          
          if (!vid.paused) {
            startPolling();
          }
        });
      };

      // ── Scroll Intercept when Collapsed (Elastic Pull-to-Expand) ────────────────
      const handleRelease = () => {
        if (releaseTimeout) {
          clearTimeout(releaseTimeout);
          releaseTimeout = null;
        }

        if (pullY > 0) {
          const isCollapsed = heroSection.classList.contains('collapsed');
          if (isCollapsed) {
            const visualPull = Math.min(80, Math.pow(pullY, 0.72));
            if (visualPull > 30) {
              // Trigger pop-out
              heroSection.classList.remove('collapsed');
              const headlineEl = document.getElementById('hero-headline');
              if (headlineEl && window.innerWidth > 768) {
                headlineEl.classList.add('headline-hidden');
              }

              // Snap back with spring bounce
              if (heroContainer) {
                heroContainer.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
                heroContainer.style.transform = 'translateY(0px)';
              }

              // Lock scroll for 1.2s during pop-out animation
              isLockedDuringAnimation = true;
              updateScrollLock();

              setTimeout(() => {
                isLockedDuringAnimation = false;
                updateScrollLock();
              }, 1200);

            } else {
              // Snap back smoothly
              if (heroContainer) {
                heroContainer.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
                heroContainer.style.transform = 'translateY(0px)';
              }
            }
          }
          pullY = 0;
        }
      };

      const handleScrollAttempt = (e: WheelEvent) => {
        if (isLockedDuringAnimation || videoState === 'snapping' || isSnappingToCard) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (isLocked) {
          e.preventDefault();
          e.stopPropagation();

          if (workActiveIndex !== -1) {
            if (Date.now() - lastSnapTime < 850) {
              return;
            }
            const deltaY = e.deltaY;
            if (Math.abs(deltaY) > 5) {
              if (deltaY > 0) {
                transitionToCard(workActiveIndex + 1);
              } else {
                transitionToCard(workActiveIndex - 1);
              }
            }
            return;
          }

          const pageVideo = document.getElementById('how-we-work-page-video') as HTMLVideoElement;
          if (!pageVideo) return;

          const deltaY = e.deltaY;
          if (Math.abs(deltaY) > 5) {
            if (deltaY > 0) {
              handleUserScrollDown(pageVideo);
            } else {
              handleUserScrollUp(pageVideo);
            }
          }
          return;
        }

        const isCollapsed = heroSection.classList.contains('collapsed');
        if (isCollapsed) {
          if (e.deltaY > 0 || pullY > 0) {
            e.preventDefault();
            pullY += e.deltaY;
            if (pullY < 0) pullY = 0;

            const dampedY = Math.min(80, Math.pow(pullY, 0.72));
            if (heroContainer) {
              heroContainer.style.transition = 'none';
              heroContainer.style.transform = `translateY(-${dampedY}px)`;
            }

            if (dampedY > 30) {
              // Trigger pop-out immediately
              heroSection.classList.remove('collapsed');
              const headlineEl = document.getElementById('hero-headline');
              if (headlineEl && window.innerWidth > 768) {
                headlineEl.classList.add('headline-hidden');
              }

              // Snap back with spring bounce
              if (heroContainer) {
                heroContainer.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
                heroContainer.style.transform = 'translateY(0px)';
              }

              // Lock scroll for 1.2s during pop-out animation
              isLockedDuringAnimation = true;
              updateScrollLock();

              setTimeout(() => {
                isLockedDuringAnimation = false;
                updateScrollLock();
              }, 1200);

              pullY = 0;
              if (releaseTimeout) {
                clearTimeout(releaseTimeout);
                releaseTimeout = null;
              }
            } else {
              if (releaseTimeout) clearTimeout(releaseTimeout);
              releaseTimeout = setTimeout(handleRelease, 150);
            }
          }
        }
      };

      let touchStartY = 0;
      const handleTouchStart = (e: TouchEvent) => {
        const isHeader = (e.target as HTMLElement).closest('.site-header');
        if ((isLockedDuringAnimation || videoState === 'snapping' || isLocked) && !isHeader) {
          e.stopPropagation();
        }

        touchStartY = e.touches[0].clientY; // ALWAYS track touch start position!

        if (heroSection.classList.contains('collapsed') && !isLockedDuringAnimation) {
          isPulling = true;
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        const isHeader = (e.target as HTMLElement).closest('.site-header');
        if ((isLockedDuringAnimation || videoState === 'snapping' || isSnappingToCard) && !isHeader) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (isLocked && !isHeader) {
          e.preventDefault();
          e.stopPropagation();

          if (workActiveIndex !== -1) {
            if (Date.now() - lastSnapTime < 850) {
              return;
            }
            const touchCurrentY = e.touches[0].clientY;
            const diffY = touchStartY - touchCurrentY; // Positive when dragging finger up (scrolling down)
            if (Math.abs(diffY) > 30) {
              if (diffY > 0) {
                transitionToCard(workActiveIndex + 1);
              } else {
                transitionToCard(workActiveIndex - 1);
              }
              touchStartY = touchCurrentY;
            }
            return;
          }

          const pageVideo = document.getElementById('how-we-work-page-video') as HTMLVideoElement;
          if (pageVideo) {
            const touchCurrentY = e.touches[0].clientY;
            const diffY = touchStartY - touchCurrentY; // Positive when dragging finger up (scrolling down)
            if (Math.abs(diffY) > 5) {
              if (diffY > 0) {
                handleUserScrollDown(pageVideo);
              } else {
                handleUserScrollUp(pageVideo);
              }
              touchStartY = touchCurrentY;
            }
          }
          return;
        }

        const isCollapsed = heroSection.classList.contains('collapsed');
        if (isCollapsed && isPulling) {
          const touchCurrentY = e.touches[0].clientY;
          const diffY = touchStartY - touchCurrentY;
          if (diffY > 0) {
            e.preventDefault();
            pullY = diffY;

            const dampedY = Math.min(80, Math.pow(pullY, 0.72));
            if (heroContainer) {
              heroContainer.style.transition = 'none';
              heroContainer.style.transform = `translateY(-${dampedY}px)`;
            }

            if (dampedY > 30) {
              // Trigger pop-out immediately
              heroSection.classList.remove('collapsed');
              const headlineEl = document.getElementById('hero-headline');
              if (headlineEl && window.innerWidth > 768) {
                headlineEl.classList.add('headline-hidden');
              }

              // Snap back with spring bounce
              if (heroContainer) {
                heroContainer.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
                heroContainer.style.transform = 'translateY(0px)';
              }

              // Lock scroll for 1.2s during pop-out animation
              isLockedDuringAnimation = true;
              updateScrollLock();

              setTimeout(() => {
                isLockedDuringAnimation = false;
                updateScrollLock();
              }, 1200);

              pullY = 0;
              isPulling = false;
            }
          }
        }
      };

      const handleTouchEnd = () => {
        if (isPulling) {
          isPulling = false;
          handleRelease();
        }
      };

      window.addEventListener('wheel', handleScrollAttempt, { passive: false, capture: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

      window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
      window.addEventListener('scroll', handleHeaderScroll, { passive: true });
      window.addEventListener('scroll', handleBeliefScroll, { passive: true });
      window.addEventListener('scroll', handleFableScroll, { passive: true });
      setTimeout(handleFableScroll, 50);

      const handleVideoTimeUpdate = (e: Event) => {
        const vid = e.target as HTMLVideoElement;
        // Clip video at 39.0s right after the green pulse fades and before the bomb moves left
        if (vid.currentTime >= 39.0) {
          vid.currentTime = 0;
          vid.play().catch((err) => console.log("Loop seek failed:", err));
        }
      };

      if (video) {
        video.addEventListener('timeupdate', handleVideoTimeUpdate);
      }

      // ── Scroller & Snapper for How We Work Video Snapping ───────────────────────
      let isSnappingToVideo = false;

      handleScrollRef.current = (e: any) => {
        const statementSec = document.getElementById('statement');
        if (!statementSec) return;

        const rect = statementSec.getBoundingClientRect();
        const isScrollingDown = e.direction === 1;

        // Snap to statement section when scrolling into view
        if (lenisRef.current && !isLockedDuringAnimation && !isSnappingToVideo) {
          if (videoState === 'idle' && workActiveIndex === -1 && !isSnappingToCard) {
            const triggerZoneDown = window.innerHeight * 0.85;
            const triggerZoneUp = window.innerHeight * 0.15;

            // Scroll down enters from top, scroll up enters from bottom
            if (isScrollingDown && rect.top < triggerZoneDown && rect.top > 50) {
              isSnappingToVideo = true;
              videoState = 'snapping';
              lenisRef.current.scrollTo(statementSec, {
                duration: 0.8,
                easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t), // easeOutExpo
                onComplete: () => {
                  isSnappingToVideo = false;
                  videoState = 'snapped_closed';
                  isLocked = true;
                  updateScrollLock();
                  if (resolvedPageVideo) {
                    resolvedPageVideo.currentTime = 0;
                    resolvedPageVideo.pause();
                  }
                }
              });
            } else if (!isScrollingDown && rect.bottom > triggerZoneUp && rect.bottom < window.innerHeight - 50) {
              isSnappingToVideo = true;
              videoState = 'snapping';
              lenisRef.current.scrollTo(statementSec, {
                duration: 0.8,
                easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t), // easeOutExpo
                onComplete: () => {
                  isSnappingToVideo = false;
                  videoState = 'snapped_closed';
                  isLocked = true;
                  updateScrollLock();
                  if (resolvedPageVideo) {
                    resolvedPageVideo.currentTime = 0;
                    resolvedPageVideo.pause();
                  }
                }
              });
            }
          }
        }

        // Direct navigation check (clicked a link, scrolled instantly)
        if (videoState === 'idle' && Math.abs(rect.top) < 5) {
          videoState = 'snapped_closed';
          isLocked = true;
          updateScrollLock();
          if (resolvedPageVideo) {
            resolvedPageVideo.currentTime = 0;
            resolvedPageVideo.pause();
          }
        }

        // Reset to idle if scrolled far out of view
        if (videoState === 'finished' || videoState === 'snapped_closed' || videoState === 'snapped_expanded') {
          if (rect.bottom < -200 || rect.top > window.innerHeight + 200) {
            videoState = 'idle';
            isLocked = false;
            wantsRewind = null;
            updateScrollLock();
            if (resolvedPageVideo) {
              resolvedPageVideo.currentTime = 0;
              resolvedPageVideo.pause();
            }
          }
        }

        // Case study snapping (Entrance snapping)
        const workSec = document.getElementById('work');
        if (workSec && !isLocked && !isLockedDuringAnimation && !isSnappingToVideo && !isSnappingToCard && videoState !== 'snapping') {
          const workRect = workSec.getBoundingClientRect();
          const cards = workSec.querySelectorAll('.fs-card');

          if (workActiveIndex === -1 && cards.length > 0) {
            // Scrolling down from Hero to Work: snap to Card 0
            if (isScrollingDown && workRect.top < window.innerHeight * 0.85 && workRect.top > 50) {
              isSnappingToCard = true;
              lastSnapTime = Date.now();
              lenisRef.current?.scrollTo(cards[0], {
                duration: 0.8,
                onComplete: () => {
                  isSnappingToCard = false;
                  workActiveIndex = 0;
                  isLocked = true;
                  updateScrollLock();
                }
              });
            }
            // Scrolling up from How We Work to Work: snap to Card 3 (last card)
            else if (!isScrollingDown && workRect.bottom > 50 && workRect.bottom < window.innerHeight - 50) {
              isSnappingToCard = true;
              lastSnapTime = Date.now();
              lenisRef.current?.scrollTo(cards[cards.length - 1], {
                duration: 0.8,
                onComplete: () => {
                  isSnappingToCard = false;
                  workActiveIndex = cards.length - 1;
                  isLocked = true;
                  updateScrollLock();
                }
              });
            }
            // Direct navigation click to #work
            else if (Math.abs(workRect.top) < 5) {
              workActiveIndex = 0;
              isLocked = true;
              updateScrollLock();
            }
          }
        }
      };

      const transitionToCard = (targetIndex: number) => {
        const workSec = document.getElementById('work');
        if (!workSec) return;
        const cards = workSec.querySelectorAll('.fs-card');

        if (targetIndex >= 0 && targetIndex < cards.length) {
          isSnappingToCard = true;
          lastSnapTime = Date.now();
          isLocked = false;
          updateScrollLock(); // Unlock temporarily to allow Lenis scrollTo to run

          if (lenisRef.current) {
            lenisRef.current.start();
            lenisRef.current.scrollTo(cards[targetIndex], {
              duration: 0.8,
              onComplete: () => {
                isSnappingToCard = false;
                workActiveIndex = targetIndex;
                isLocked = true;
                updateScrollLock(); // Re-lock scroll at the target card
              }
            });
          } else {
            isSnappingToCard = false;
            workActiveIndex = targetIndex;
            isLocked = true;
            updateScrollLock();
          }
        } else if (targetIndex < 0) {
          // Scroll up and escape out of the work section (back to Hero)
          isSnappingToCard = true;
          lastSnapTime = Date.now();
          isLocked = false;
          updateScrollLock();
          workActiveIndex = -1;

          if (lenisRef.current) {
            lenisRef.current.start();
            const curScroll = lenisRef.current.scroll || window.scrollY;
            lenisRef.current.scrollTo(curScroll - window.innerHeight * 0.9, {
              duration: 0.8,
              onComplete: () => {
                isSnappingToCard = false;
              }
            });
          } else {
            isSnappingToCard = false;
          }
        } else if (targetIndex >= cards.length) {
          // Scroll down and escape out of the work section (down to How We Work)
          isSnappingToCard = true;
          lastSnapTime = Date.now();
          isLocked = false;
          updateScrollLock();
          workActiveIndex = -1;

          if (lenisRef.current) {
            lenisRef.current.start();
            const curScroll = lenisRef.current.scroll || window.scrollY;
            lenisRef.current.scrollTo(curScroll + window.innerHeight * 0.9, {
              duration: 0.8,
              onComplete: () => {
                isSnappingToCard = false;
              }
            });
          } else {
            isSnappingToCard = false;
          }
        }
      };

      const handleUserScrollDown = (pageVideo: HTMLVideoElement) => {
        if (videoState === 'snapped_closed') {
          videoState = 'playing_expand';
          wantsRewind = null;
          pageVideo.play().catch(err => console.log("Failed to play video:", err));
        } else if (videoState === 'snapped_expanded') {
          wantsRewind = 'down';
        }
      };

      const handleUserScrollUp = (pageVideo: HTMLVideoElement) => {
        if (videoState === 'snapped_closed') {
          videoState = 'idle';
          wantsRewind = null;
          isLocked = false;
          updateScrollLock();
          // Scroll up directly to Card 3 (last card)
          const workSec = document.getElementById('work');
          if (workSec) {
            const cards = workSec.querySelectorAll('.fs-card');
            if (cards.length > 0) {
              transitionToCard(cards.length - 1);
              return;
            }
          }
          // Fallback if no cards found
          if (lenisRef.current) {
            lenisRef.current.start();
            const curScroll = lenisRef.current.scroll || window.scrollY;
            lenisRef.current.scrollTo(curScroll - 350, { duration: 0.5 });
          }
        } else if (videoState === 'snapped_expanded') {
          wantsRewind = 'up';
        }
      };

      const runVideoTransitionLoop = () => {
        if (!active) return;
        const pageVideo = resolvedPageVideo || (document.getElementById('how-we-work-page-video') as HTMLVideoElement);
        if (pageVideo) {
          if (!resolvedPageVideo) {
            resolvedPageVideo = pageVideo;
          }
          const t = pageVideo.currentTime;
          const duration = pageVideo.duration || 8.0;
          const loopStart = duration - 1.0;

          if (videoState === 'playing_expand') {
            if (pageVideo.ended || t >= duration - 0.1 || (pageVideo.paused && t > 0.95 * duration)) {
              videoState = 'snapped_expanded';
              breathDirection = 'backward'; // start by breathing backward (inwards) from the end
              wantsRewind = null;
              pageVideo.pause();
              lastTime = performance.now();
            }
          } else if (videoState === 'snapped_expanded') {
            if (wantsRewind) {
              if (breathDirection === 'backward') {
                // If already breathing backward, continue the backward motion directly to rewind!
                if (wantsRewind === 'down') {
                  videoState = 'playing_contract';
                } else {
                  videoState = 'playing_contract_up';
                }
                wantsRewind = null;
                lastTime = performance.now();
              } else {
                // If breathing forward, wait to reach the end frame (duration) before rewinding
                if (t >= duration - 0.05 || pageVideo.ended) {
                  pageVideo.pause();
                  pageVideo.currentTime = duration;
                  if (wantsRewind === 'down') {
                    videoState = 'playing_contract';
                  } else {
                    videoState = 'playing_contract_up';
                  }
                  wantsRewind = null;
                  lastTime = performance.now();
                } else if (pageVideo.paused) {
                  pageVideo.play().catch(err => console.log("Breathing forward play resume failed:", err));
                }
              }
            } else {
              // Boomerang Breathing Loop (never gets static, plays back-and-forth)
              if (breathDirection === 'forward') {
                if (t >= duration - 0.05 || pageVideo.ended) {
                  breathDirection = 'backward';
                  pageVideo.pause();
                  lastTime = performance.now();
                } else if (pageVideo.paused) {
                  pageVideo.play().catch(err => console.log("Breathing forward play resume failed:", err));
                }
              } else {
                // Breath backward (manually decrementing time towards loopStart)
                if (pageVideo.seeking) {
                  // Wait for the seek to complete, do not update lastTime so we accumulate delta
                  checkFrameId = requestAnimationFrame(runVideoTransitionLoop);
                  return;
                }

                const now = performance.now();
                const delta = (now - lastTime) / 1000;
                lastTime = now;

                // Breathe backward at a gentle, slow pace (0.5x speed)
                let nextTime = pageVideo.currentTime - delta * 0.5;
                if (nextTime <= loopStart) {
                  nextTime = loopStart;
                  pageVideo.currentTime = loopStart;
                  breathDirection = 'forward';
                  pageVideo.play().catch(err => console.log("Breathing forward play failed:", err));
                } else {
                  pageVideo.currentTime = nextTime;
                }
              }
            }
          } else if (videoState === 'playing_contract' || videoState === 'playing_contract_up') {
            if (pageVideo.seeking) {
              // Wait for the previous seek to complete, do not update lastTime so we accumulate delta
              checkFrameId = requestAnimationFrame(runVideoTransitionLoop);
              return;
            }

            const now = performance.now();
            const delta = (now - lastTime) / 1000;
            lastTime = now;

            // Rewind by delta * 2.0 speed (snappy, matches implementation plan)
            let nextTime = pageVideo.currentTime - delta * 2.0;
            if (nextTime <= 0) {
              nextTime = 0;
              pageVideo.currentTime = 0;
              
              if (videoState === 'playing_contract') {
                videoState = 'finished';
                isLocked = false;
                updateScrollLock();
                const pricingSec = document.getElementById('pricing');
                if (pricingSec && lenisRef.current) {
                  lenisRef.current.start();
                  lenisRef.current.scrollTo(pricingSec, {
                    duration: 0.8,
                    easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
                  });
                }
              } else {
                videoState = 'snapped_closed';
              }
            } else {
              pageVideo.currentTime = nextTime;
            }
          }
        }

        lastTime = performance.now();
        checkFrameId = requestAnimationFrame(runVideoTransitionLoop);
      };

      // Start the frame loop
      runVideoTransitionLoop();

      // Global anchor click listener to reset lock
      const handleGlobalAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a');
        if (!target) return;
        const href = target.getAttribute('href');
        if (href && (href.startsWith('#') || href.startsWith('/#'))) {
          videoState = 'idle';
          workActiveIndex = -1;
          isLocked = false;
          wantsRewind = null;
          updateScrollLock();
          if (resolvedPageVideo) {
            resolvedPageVideo.pause();
            resolvedPageVideo.currentTime = 0;
          }
          if (lenisRef.current) {
            lenisRef.current.start();
          }
        }
      };
      document.addEventListener('click', handleGlobalAnchorClick);

      // ── Intersection Observer for Sweep Reveal Headlines ───────────────────────
      const setupSweepObserver = () => {
        if (!active) return;
        const sweepRevealElements = document.querySelectorAll('.sweep-reveal-text');
        if (sweepRevealElements.length === 0) {
          sweepTimeout = setTimeout(setupSweepObserver, 100);
          return;
        }

        sweepObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              sweepObserver?.unobserve(entry.target);
            }
          });
        }, { threshold: 0.02 });

        sweepRevealElements.forEach(el => {
          sweepObserver?.observe(el);
        });
      };

      setupSweepObserver();

      // ── CARD DETAILS DROPDOWN ──────────────────────────────────────────────────
      const toggleLinks = document.querySelectorAll('.toggle-details');
      const dropdownClickHandlers: { el: Element; fn: EventListener }[] = [];
      toggleLinks.forEach(link => {
        const handler = (e: Event) => {
          e.preventDefault();
          const targetId = link.getAttribute('data-target');
          if (!targetId) return;
          const targetEl = document.getElementById(targetId);

          if (targetEl) {
            const isOpen = targetEl.classList.toggle('open');
            if (isOpen) {
              setTimeout(() => {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 300);
            }
          }
        };
        link.addEventListener('click', handler);
        dropdownClickHandlers.push({ el: link, fn: handler });
      });

      // ── TESTIMONIALS CAROUSEL ──────────────────────────────────────────────────
      const carousel = document.getElementById('testimonialsCarousel');
      const btnPrev = document.getElementById('tPrev');
      const btnNext = document.getElementById('tNext');

      let handlePrevClick: (() => void) | null = null;
      let handleNextClick: (() => void) | null = null;

      if (carousel && btnPrev && btnNext) {
        const getCardWidth = () => {
          const firstCard = carousel.querySelector('.testimonial-card');
          if (!firstCard) return 0;
          const gap = parseInt(getComputedStyle(carousel).gap) || 24;
          return firstCard.getBoundingClientRect().width + gap;
        };

        handleNextClick = () => {
          carousel.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
        };

        handlePrevClick = () => {
          carousel.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
        };

        btnNext.addEventListener('click', handleNextClick);
        btnPrev.addEventListener('click', handlePrevClick);
      }

      // ── Wind overlay ───────────────────────────────────────────────────
      (function initWind() {
        const WIND = {
            width: 3840, height: 2160, fps: 24, seed: 42,
            nStreaksBg: 52,   streakSpdLo: 140, streakSpdHi: 290,
            streakLenLo: 120, streakLenHi: 380, streakAlpLo: 28, streakAlpHi: 72,
            streakColor: [155, 165, 172],
            nStreaksFg: 10, fgAlpLo: 7,  fgAlpHi: 16,
            nParticles: 65, partSpdLo: 210, partSpdHi: 430,
            partWLo: 4, partWHi: 10, partHLo: 22, partHHi: 58,
            partAlpLo: 20, partAlpHi: 58, partGrayLo: 142, partGrayHi: 172,
            nShimmerArcs: 4, shimmerBaseA: 42, noseFracX: 0.500, noseFracY: 0.905,
        };

        function makePRNG(seed: number) {
            let s = seed >>> 0;
            return {
                next() {
                    s = (s + 0x6D2B79F5) >>> 0;
                    let t = Math.imul(s ^ (s >>> 15), 1 | s);
                    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
                    return ((t ^ (t >>> 14)) >>> 0) / 0x100000000;
                },
                int(lo: number, hi: number)   { return (lo + Math.floor(this.next() * (hi - lo))) | 0; },
                float(lo: number, hi: number) { return lo + this.next() * (hi - lo); },
            };
        }

        function buildParticles(cfg: any) {
            const { width: W, height: H } = cfg;
            const rng = makePRNG(cfg.seed), ss = H / 2160;
            const xl=(W*.02)|0, xr=(W*.98)|0, xl5=(W*.05)|0, xr5=(W*.95)|0;
            const bgStreaks = Array.from({ length: cfg.nStreaksBg }, () => ({
                x: rng.int(xl,xr), y0: rng.int(0,H),
                spd: rng.float(cfg.streakSpdLo,cfg.streakSpdHi)*ss,
                len: rng.int((cfg.streakLenLo*ss)|0,(cfg.streakLenHi*ss)|0),
                alp: rng.int(cfg.streakAlpLo,cfg.streakAlpHi), drift: rng.int(-8,8),
            }));
            const fgStreaks = Array.from({ length: cfg.nStreaksFg }, () => ({
                x: rng.int(xl5,xr5), y0: rng.int(0,H),
                spd: rng.float(cfg.streakSpdLo,cfg.streakSpdHi*1.2)*ss,
                len: rng.int((cfg.streakLenLo*ss)|0,(cfg.streakLenHi*ss)|0),
                alp: rng.int(cfg.fgAlpLo,cfg.fgAlpHi), drift: rng.int(-6,6),
            }));
            const particles = Array.from({ length: cfg.nParticles }, () => ({
                x: rng.int(xl,xr), y0: rng.int(0,H),
                spd: rng.float(cfg.partSpdLo,cfg.partSpdHi)*ss,
                rw: rng.int(cfg.partWLo,cfg.partWHi)/2, rh: rng.int(cfg.partHLo,cfg.partHHi)/2,
                alp: rng.int(cfg.partAlpLo,cfg.partAlpHi)/255, gray: rng.int(cfg.partGrayLo,cfg.partGrayHi),
            }));
            return { bgStreaks, fgStreaks, particles };
        }

        function ds(c: CanvasRenderingContext2D, s: any, fi: number, H: number, rgb: number[]) {
            const [r,g,b]=rgb,yT=((s.y0-fi*s.spd)%H+H)%H,yB=Math.min(yT+s.len,H);
            c.strokeStyle=`rgba(${r},${g},${b},${s.alp/255})`;c.lineWidth=2;c.lineCap='round';
            c.beginPath();c.moveTo(s.x,yT);c.lineTo(s.x+s.drift,yB);c.stroke();
            const w=yT+s.len-H;if(w>0){c.beginPath();c.moveTo(s.x,0);c.lineTo(s.x+s.drift,w);c.stroke();}
        }
        function dp(c: CanvasRenderingContext2D, p: any, fi: number, H: number) {
            const cy=((p.y0-fi*p.spd)%H+H)%H,g=p.gray;
            const grd=c.createLinearGradient(p.x,cy-p.rh,p.x,cy+p.rh);
            grd.addColorStop(0,`rgba(${g+12},${g+16},${g+12},0)`);
            grd.addColorStop(.3,`rgba(${g},${g+4},${g+2},${p.alp})`);
            grd.addColorStop(.7,`rgba(${g},${g+4},${g+2},${p.alp})`);
            grd.addColorStop(1,`rgba(${g+8},${g+12},${g+8},0)`);
            c.beginPath();c.ellipse(p.x,cy,p.rw,p.rh,0,0,Math.PI*2);c.fillStyle=grd;c.fill();
        }
        function dsh(c: CanvasRenderingContext2D, nx: number, ny: number, cfg: any) {
            for(let j=0;j<cfg.nShimmerArcs;j++){
                const sp=55+j*70,dp2=30+j*40,yo=30+j*48,al=Math.max(8,cfg.shimmerBaseA-j*9)/255,lw=Math.max(1,3-j);
                c.strokeStyle=`rgba(215,220,212,${al})`;c.lineWidth=lw;c.lineCap='round';
                c.beginPath();c.moveTo(nx,ny+yo);c.lineTo(nx-sp,ny+yo+dp2);c.stroke();
                c.beginPath();c.moveTo(nx,ny+yo);c.lineTo(nx+sp,ny+yo+dp2);c.stroke();
                c.beginPath();c.arc(nx,ny+yo,18+j*6,Math.PI*.17,Math.PI*.83);c.stroke();
            }
        }

        const wc = document.getElementById('wind-canvas') as HTMLCanvasElement;
        if (!wc) return;
        wc.width = WIND.width; wc.height = WIND.height;
        const wCtx = wc.getContext('2d', { alpha: true });
        if (!wCtx) return;
        const sys  = buildParticles(WIND);
        let fi = 0, wLast = 0;
        const wInt = 1000 / WIND.fps;

        let windFrameId: number;
        function windFrame(ts: number) {
            if (!active) return;
            if (ts - wLast < wInt * 0.9) { windFrameId = requestAnimationFrame(windFrame); return; }
            wLast = ts;
            wCtx.clearRect(0, 0, WIND.width, WIND.height);
            for (const s of sys.bgStreaks) ds(wCtx,s,fi,WIND.height,WIND.streakColor);
            for (const p of sys.particles) dp(wCtx,p,fi,WIND.height);
            dsh(wCtx, WIND.noseFracX*WIND.width, WIND.noseFracY*WIND.height, WIND);
            for (const s of sys.fgStreaks) ds(wCtx,s,fi,WIND.height,WIND.streakColor);
            fi++;
            windFrameId = requestAnimationFrame(windFrame);
        }
        windFrameId = requestAnimationFrame(windFrame);

        // Hook animation frame cancel into the main cleanupFn
        const prevCleanup = cleanupFn;
        cleanupFn = () => {
            if (prevCleanup) prevCleanup();
            cancelAnimationFrame(windFrameId);
        };
      })();

      cleanupFn = () => {
        logoBtn.removeEventListener('mouseenter', handleLogoMouseEnter);
        logoBtn.removeEventListener('mousemove', handleLogoMouseMove);
        logoBtn.removeEventListener('mouseleave', handleLogoMouseLeave);
        logoBtn.removeEventListener('click', handleLogoClick);



        projectBubbles.forEach(bubble => {
          bubble.removeEventListener('click', handleProjectBubbleClick as EventListener);
        });

        if (video) {
          video.removeEventListener('timeupdate', handleVideoTimeUpdate);
        }
        if (sweepTimeout) clearTimeout(sweepTimeout);
        if (videoTimeout) clearTimeout(videoTimeout);

        if (checkFrameId) {
          cancelAnimationFrame(checkFrameId);
        }
        document.removeEventListener('click', handleGlobalAnchorClick);

        handleScrollRef.current = undefined;

        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (lenisRef.current) {
          lenisRef.current.start();
        }

        window.removeEventListener('wheel', handleScrollAttempt, { capture: true });
        window.removeEventListener('touchstart', handleTouchStart, { capture: true });
        window.removeEventListener('touchmove', handleTouchMove, { capture: true });
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('touchcancel', handleTouchEnd);
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('scroll', handleHeaderScroll);
        window.removeEventListener('scroll', handleBeliefScroll);
        window.removeEventListener('scroll', handleFableScroll);

        if (sweepObserver) {
          sweepObserver.disconnect();
        }
        if (videoObserver) {
          videoObserver.disconnect();
        }

        dropdownClickHandlers.forEach(({ el, fn }) => {
          el.removeEventListener('click', fn);
        });

        if (btnNext && handleNextClick) {
          btnNext.removeEventListener('click', handleNextClick);
        }
        if (btnPrev && handlePrevClick) {
          btnPrev.removeEventListener('click', handlePrevClick);
        }
      };
    };

    init();

    return () => {
      active = false;
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, []);

  return null;
}
