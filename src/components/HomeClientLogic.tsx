// @ts-nocheck
"use client";
import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { useRouter } from 'next/navigation';

export default function HomeClientLogic() {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const router = useRouter();

  useEffect(() => {
    lenisRef.current = lenis;
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
      const decorativeBubble = document.querySelector('[data-project="decorative"]');

      // If key elements are not ready in the DOM, wait for the next frame
      if (!logoBtn || !heroSection) {
        requestAnimationFrame(init);
        return;
      }

      const video = document.getElementById('how-we-work-video') as HTMLVideoElement;
      let resolvedPageVideo: HTMLVideoElement | null = null;
      let sweepObserver: IntersectionObserver | null = null;
      let videoObserver: IntersectionObserver | null = null;
      let sweepTimeout: NodeJS.Timeout | null = null;
      let videoTimeout: NodeJS.Timeout | null = null;

      // Check if we should return in expanded state (e.g. back button clicked or back navigation)
      const shouldBeExpanded = typeof window !== 'undefined' && (
        sessionStorage.getItem('returnExpanded') === 'true' || 
        window.location.search.includes('expanded=true')
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
      document.body.style.overflow = '';
      const main = document.querySelector('main');
      if (main) main.style.opacity = '1';
      if (siteHeader) {
        (siteHeader as HTMLElement).style.opacity = '1';
        siteHeader.classList.remove('header-hidden');
      }

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

      const handleDecorativeClick = (e: Event) => {
        e.preventDefault();
        // Collapse all project bubbles back into the logo bubble
        heroSection.classList.add('collapsed');
        // Activate video playing mode immediately
        heroSection.classList.add('video-playing');
        
        // Hide the hero headline
        const headlineEl = document.getElementById('hero-headline');
        if (headlineEl) {
          headlineEl.classList.add('headline-hidden');
        }

        // Play the video
        const video = document.getElementById('how-we-work-video') as HTMLVideoElement;
        if (video) {
          video.currentTime = 0;
          video.play().catch(err => console.log("Autoplay failed:", err));
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
          
          // Show headline if cursor is far enough
          const headlineEl = document.getElementById('hero-headline');
          if (headlineEl && window.innerWidth > 768) {
            headlineEl.classList.add('headline-hidden'); // Stay hidden when expanded
          }
        } else {
          // Normal behavior
          const isCollapsed = heroSection.classList.contains('collapsed');
          heroSection.classList.toggle('collapsed');
          
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
            video.style.transform = `translate(${driftX}px, ${driftY}px)`;
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
      logoBtn.addEventListener('mouseenter', handleLogoMouseEnter);
      logoBtn.addEventListener('mousemove', handleLogoMouseMove);
      logoBtn.addEventListener('mouseleave', handleLogoMouseLeave);
      logoBtn.addEventListener('click', handleLogoClick);

      if (decorativeBubble) {
        decorativeBubble.addEventListener('click', handleDecorativeClick);
      }

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
            if (overlay.parentNode) {
              overlay.parentNode.removeChild(overlay);
            }
            document.body.style.overflow = '';
            if (main) main.style.opacity = '1';
            if (header) header.style.opacity = '1';
          }, 1000);
        }, 750);
      };

      const projectBubbles = document.querySelectorAll('.project-bubble:not([data-project="decorative"])');
      projectBubbles.forEach(bubble => {
        bubble.addEventListener('click', handleProjectBubbleClick as EventListener);
      });

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

      // ── Intersection Observer for How We Work Page Video ───────────────────────
      const setupVideoObserverAndListener = () => {
        if (!active) return;
        const pageVideoEl = document.getElementById('how-we-work-page-video') as HTMLVideoElement;
        if (!pageVideoEl) {
          videoTimeout = setTimeout(setupVideoObserverAndListener, 100);
          return;
        }

        resolvedPageVideo = pageVideoEl;
        pageVideoEl.addEventListener('timeupdate', handleVideoTimeUpdate);

        videoObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const vid = entry.target as HTMLVideoElement;
              vid.currentTime = 0;
              vid.play().catch(err => console.log("Failed to play in-view video:", err));
              videoObserver?.unobserve(vid);
            }
          });
        }, { threshold: 0.1 });

        videoObserver.observe(pageVideoEl);
      };

      setupSweepObserver();
      setupVideoObserverAndListener();

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

        if (decorativeBubble) {
          decorativeBubble.removeEventListener('click', handleDecorativeClick);
        }

        projectBubbles.forEach(bubble => {
          bubble.removeEventListener('click', handleProjectBubbleClick as EventListener);
        });

        if (video) {
          video.removeEventListener('timeupdate', handleVideoTimeUpdate);
        }
        if (sweepTimeout) clearTimeout(sweepTimeout);
        if (videoTimeout) clearTimeout(videoTimeout);

        if (resolvedPageVideo) {
          resolvedPageVideo.removeEventListener('timeupdate', handleVideoTimeUpdate);
        }

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
