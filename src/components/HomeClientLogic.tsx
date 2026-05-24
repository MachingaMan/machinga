// @ts-nocheck
"use client";
import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

export default function HomeClientLogic() {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

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

      // If key elements are not ready in the DOM, wait for the next frame
      if (!logoBtn || !heroSection) {
        requestAnimationFrame(init);
        return;
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

      const handleLogoClick = (e: Event) => {
        e.preventDefault();
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
      };

      // ── Mouse Move Parallax Parallax Drift for Floating Bubbles ──────────────────
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const headlineEl = document.getElementById('hero-headline');
        if (headlineEl) {
          if (window.innerWidth > 768) {
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

      // Bind Listeners
      logoBtn.addEventListener('mouseenter', handleLogoMouseEnter);
      logoBtn.addEventListener('mousemove', handleLogoMouseMove);
      logoBtn.addEventListener('mouseleave', handleLogoMouseLeave);
      logoBtn.addEventListener('click', handleLogoClick);

      window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
      window.addEventListener('scroll', handleHeaderScroll, { passive: true });
      window.addEventListener('scroll', handleBeliefScroll, { passive: true });

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

      cleanupFn = () => {
        logoBtn.removeEventListener('mouseenter', handleLogoMouseEnter);
        logoBtn.removeEventListener('mousemove', handleLogoMouseMove);
        logoBtn.removeEventListener('mouseleave', handleLogoMouseLeave);
        logoBtn.removeEventListener('click', handleLogoClick);

        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('scroll', handleHeaderScroll);
        window.removeEventListener('scroll', handleBeliefScroll);

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
