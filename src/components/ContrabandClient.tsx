"use client";

import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import Carousel from './Carousel';

const loopsData = [
  {
    videoSrc: "/assets/conntraband assets/contraband page video 2.mp4",
    description: "Why is someone intentionally ruining a bed?",
    stamp: "Opens immediately"
  },
  {
    videoSrc: "/assets/conntraband assets/contraband page video 3.mp4",
    description: "What just happened here? Who is involved?",
    stamp: "Opens within first few seconds"
  },
  {
    videoSrc: "/assets/conntraband assets/contraband page video 4.mp4",
    description: "What do these objects have in common? They certainly don't seem random.",
    stamp: "Opens at 4 seconds"
  },
  {
    videoSrc: "/assets/conntraband assets/contraband page video 5.mp4",
    description: "Whose lipstick is that? Whose phone number? Whatever this is, it didn't begin here.",
    stamp: "Opens at 9 seconds"
  },
  {
    videoSrc: "/assets/conntraband assets/contraband page video 6.mp4",
    description: "What is that object expanding, and why does it feel like it means something?",
    stamp: "Opens at 11 seconds"
  }
];

const PREVIEW_LOOP_TIMES: Record<string, number> = {
  sugarcube: 11.8,
  candy: 5.2,
  popsicle: 6.0,
  fossil: 6.4,
  projection: 9.8,
  have_it_all_16x9: 33.0,
  have_it_all_shortie_16x9: 14.0
};

const vaultItems = [
  {
    id: 'have_it_all_16x9',
    title: 'Have It All',
    sub: '01 / SKU FILM',
    previewSrc: '/assets/conntraband assets/cluster_have_it_all.mp4'
  },
  {
    id: 'popsicle',
    title: 'Popsicle SKU',
    sub: '02 / SKU FILM',
    previewSrc: '/assets/conntraband assets/cluster_popsicle.mp4'
  },
  {
    id: 'candy',
    title: 'Candy SKU',
    sub: '03 / SKU FILM',
    previewSrc: '/assets/conntraband assets/cluster_candy.mp4'
  },
  {
    id: 'sugarcube',
    title: 'SugarCube SKU',
    sub: '04 / SKU FILM',
    previewSrc: '/assets/conntraband assets/cluster_sugarcube.mp4'
  },
  {
    id: 'have_it_all_shortie_16x9',
    title: 'Have It All — Shortie',
    sub: '05 / SKU FILM',
    previewSrc: '/assets/conntraband assets/cluster_shortie.mp4'
  },
  {
    id: 'fossil',
    title: 'Fossil SKU',
    sub: '06 / SKU FILM',
    previewSrc: '/assets/conntraband assets/cluster_fossil.mp4'
  },
  {
    id: 'projection',
    title: 'Light Projection',
    sub: '07 / SKU FILM',
    previewSrc: '/assets/conntraband assets/cluster_projection.mp4'
  }
];

function CarouselVideo({ src, isActive, onTimeUpdate }: { src: string, isActive: boolean, onTimeUpdate: any }) {
  const ref = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      if (isActive) {
        ref.current.play().catch(err => console.log("Autoplay failed:", err));
      } else {
        ref.current.pause();
        ref.current.currentTime = 0.05;
      }
    }
  }, [isActive, src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      preload="metadata"
      onTimeUpdate={onTimeUpdate}
    />
  );
}

export default function ContrabandClient() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeVideoAspect, setActiveVideoAspect] = useState<'landscape' | 'portrait'>('landscape');
  
  const [carouselActiveIndex, setCarouselActiveIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Gentle auto-rotation loop
  useEffect(() => {
    if (activeVideo || dragStartX !== null || isHovered) return;

    const interval = setInterval(() => {
      setCarouselActiveIndex((prev) => (prev + 1) % 7);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeVideo, dragStartX, isHovered]);
  
  // Custom video player controls state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();

  // Section 04 loops scroll tracking
  const loopsSectionRef = useRef<HTMLElement>(null);
  const [loopsScrollProgress, setLoopsScrollProgress] = useState(0);
  const [activeLoopIndex, setActiveLoopIndex] = useState(0);
  
  const activeLoopIndexRef = useRef(0);
  const isSnappingRef = useRef(false);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevScrollTopRef = useRef<number | null>(null);

  const visualActiveIndex = activeLoopIndex;

  const scheduleSnap = (
    scrollTop: number, 
    scrollStart: number, 
    scrollEnd: number, 
    totalScrollable: number
  ) => {
    // Clear any existing snap timer
    if (snapTimeoutRef.current) {
      clearTimeout(snapTimeoutRef.current);
    }

    // Do not run JS snap animations on mobile layouts (let CSS scroll-snap handle it)
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    // If we are currently animating a snap, don't schedule a new one
    if (isSnappingRef.current) return;

    // Only snap if we are inside the pinned section and not at the boundaries.
    // Boundary padding of 15px prevents snapping when entering/exiting,
    // which allows the browser to scroll past the top/bottom natively.
    if (scrollTop > scrollStart + 15 && scrollTop < scrollEnd - 15) {
      snapTimeoutRef.current = setTimeout(() => {
        const currentScroll = window.scrollY;
        // Re-verify we are still in bounds and not snapping
        if (currentScroll <= scrollStart + 15 || currentScroll >= scrollEnd - 15 || isSnappingRef.current) return;

        const progress = (currentScroll - scrollStart) / totalScrollable;
        const step = 1 / (loopsData.length - 1);
        const targetIndex = Math.min(loopsData.length - 1, Math.max(0, Math.round(progress / step)));
        const targetScrollY = scrollStart + targetIndex * step * totalScrollable;

        // If we are already extremely close to the snap target, don't trigger animation
        if (Math.abs(currentScroll - targetScrollY) < 3) return;

        isSnappingRef.current = true;
        if (lenis) {
          lenis.scrollTo(targetScrollY, {
            duration: 0.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease out
            immediate: false,
            onComplete: () => {
              // Settle delay to ensure inertia events are cleared
              setTimeout(() => {
                isSnappingRef.current = false;
              }, 50);
            }
          });
        } else {
          window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
          setTimeout(() => {
            isSnappingRef.current = false;
          }, 600);
        }
      }, 200); // 200ms debounce
    }
  };

  const updateScrollProgress = (scrollTop: number) => {
    if (!loopsSectionRef.current) return;
    const rect = loopsSectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + scrollTop;
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;
    
    const scrollStart = sectionTop;
    const scrollEnd = sectionTop + sectionHeight - viewportHeight;
    const totalScrollable = scrollEnd - scrollStart;
    
    if (totalScrollable <= 0) return;
    
    const progress = Math.max(0, Math.min(1, (scrollTop - scrollStart) / totalScrollable));
    setLoopsScrollProgress(progress);

    // Update active loop index based on proximity in real-time
    const step = 1 / (loopsData.length - 1);
    const targetIndex = Math.min(loopsData.length - 1, Math.max(0, Math.round(progress / step)));
    
    if (targetIndex !== activeLoopIndexRef.current) {
      setActiveLoopIndex(targetIndex);
      activeLoopIndexRef.current = targetIndex;
    }

    // Schedule snap when scroll stops
    scheduleSnap(scrollTop, scrollStart, scrollEnd, totalScrollable);
  };

  useEffect(() => {
    const handleScroll = () => {
      updateScrollProgress(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, []);

  useLenis(() => {
    updateScrollProgress(window.scrollY);
  });

  // Inline Video Player State
  const [isInlinePlaying, setIsInlinePlaying] = useState(false);
  const [isInlineMuted, setIsInlineMuted] = useState(false);
  const [inlineProgress, setInlineProgress] = useState(0);
  const [inlineTime, setInlineTime] = useState({ current: 0, duration: 0 });
  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  // Auto-hide controls state
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    // Only auto-hide if video is playing
    if (isInlinePlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const handleToggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = inlineVideoRef.current?.parentElement;
    const video = inlineVideoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.log(err));
    } else {
      if (container && container.requestFullscreen) {
        container.requestFullscreen().catch(err => {
          video.requestFullscreen().catch(e => console.log(e));
        });
      } else if (video.requestFullscreen) {
        video.requestFullscreen().catch(err => console.log(err));
      } else if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
      }
    }
  };

  const toggleInlinePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (inlineVideoRef.current) {
      if (isInlinePlaying) {
        inlineVideoRef.current.pause();
        setIsInlinePlaying(false);
      } else {
        // If we are currently showing the loop video, we need to switch src to the main video
        if (inlineVideoRef.current.src.includes('contraband page video 1.mp4')) {
          inlineVideoRef.current.src = '/assets/conntraband assets/summer_chase_hero.mp4';
          inlineVideoRef.current.loop = false;
          inlineVideoRef.current.muted = isInlineMuted;
          inlineVideoRef.current.load();
        }
        
        inlineVideoRef.current.play()
          .then(() => {
            setIsInlinePlaying(true);
            setShowControls(true);
            if (controlsTimeoutRef.current) {
              clearTimeout(controlsTimeoutRef.current);
            }
            controlsTimeoutRef.current = setTimeout(() => {
              setShowControls(false);
            }, 2500);
          })
          .catch(err => {
            console.log("Inline play failed:", err);
            if (inlineVideoRef.current) {
              inlineVideoRef.current.muted = true;
              setIsInlineMuted(true);
              inlineVideoRef.current.play().then(() => {
                setIsInlinePlaying(true);
                setShowControls(true);
                if (controlsTimeoutRef.current) {
                  clearTimeout(controlsTimeoutRef.current);
                }
                controlsTimeoutRef.current = setTimeout(() => {
                  setShowControls(false);
                }, 2500);
              });
            }
          });
      }
    }
  };

  const handleStartInlinePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (inlineVideoRef.current) {
      flushSync(() => {
        inlineVideoRef.current!.src = '/assets/conntraband assets/summer_chase_hero.mp4';
        inlineVideoRef.current!.loop = false;
        inlineVideoRef.current!.muted = false;
        setIsInlineMuted(false);
        setIsInlinePlaying(true);
        setShowControls(true);
      });

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
      
      inlineVideoRef.current.play()
        .catch(err => {
          console.log("Play failed:", err);
          if (inlineVideoRef.current) {
            inlineVideoRef.current.muted = true;
            setIsInlineMuted(true);
            inlineVideoRef.current.play();
          }
        });
    }
  };

  const toggleInlineMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (inlineVideoRef.current) {
      const nextMuted = !isInlineMuted;
      inlineVideoRef.current.muted = nextMuted;
      setIsInlineMuted(nextMuted);
    }
  };

  const handleInlineTimeUpdate = () => {
    if (inlineVideoRef.current) {
      const current = inlineVideoRef.current.currentTime;
      const duration = inlineVideoRef.current.duration || 0;
      setInlineTime({ current, duration });
      if (duration > 0) {
        setInlineProgress((current / duration) * 100);
      }
    }
  };

  const handleInlineProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (inlineVideoRef.current && inlineTime.duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * inlineTime.duration;
      inlineVideoRef.current.currentTime = newTime;
      setInlineProgress((clickX / width) * 100);
    }
  };

  const handleInlineEnded = () => {
    setIsInlinePlaying(false);
    if (inlineVideoRef.current) {
      inlineVideoRef.current.src = '/assets/conntraband assets/contraband page video 1.mp4';
      inlineVideoRef.current.loop = true;
      inlineVideoRef.current.muted = true;
      inlineVideoRef.current.load();
      inlineVideoRef.current.play().catch(e => console.log("Re-loop play failed:", e));
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Lock smooth scroll when overlay is active
  useEffect(() => {
    if (activeVideo) {
      lenis?.stop();
      document.body.classList.add('lenis-stopped');
      document.documentElement.classList.add('lenis-stopped');
      // Set playing and mute state
      setIsPlaying(true);
      setIsMuted(false);
    } else {
      lenis?.start();
      document.body.classList.remove('lenis-stopped');
      document.documentElement.classList.remove('lenis-stopped');
    }
    return () => {
      lenis?.start();
      document.body.classList.remove('lenis-stopped');
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [activeVideo, lenis]);

  // Handle time update in the video player
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setProgress((current / total) * 100);
      
      // Format time
      const curM = Math.floor(current / 60);
      const curS = Math.floor(current % 60).toString().padStart(2, '0');
      const totM = Math.floor(total / 60);
      const totS = Math.floor(total % 60).toString().padStart(2, '0');
      
      setCurrentTime(`${curM}:${curS}`);
      setDuration(`${totM}:${totS}`);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(err => console.log(err));
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress((clickX / width) * 100);
    }
  };

  const handleOpenVideo = (src: string, aspect: 'landscape' | 'portrait' = 'landscape') => {
    // Force React to synchronously render the modal and video src into the DOM
    // before we invoke play() to prevent DOM updates from aborting the play promise
    flushSync(() => {
      setActiveVideoAspect(aspect);
      setActiveVideo(src);
      setIsMuted(false);
      setIsPlaying(true);
    });
    
    // Play synchronously within the user click gesture to bypass autoplay restrictions on audio
    if (videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Play promise failed:", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(e => console.log("Muted fallback failed:", e));
          }
        });
      }
    }
  };

  const handlePreviewTimeUpdate = (key: string) => (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const loopTime = PREVIEW_LOOP_TIMES[key];
    if (loopTime && video.currentTime >= loopTime) {
      video.currentTime = 0.05;
    }
  };

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
    setActiveVideo(null);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.type === 'pointerdown') return;
    setDragStartX(e.clientX);
    setDragOffset(0);
    setHasDragged(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX === null) return;
    const deltaX = e.clientX - dragStartX;
    setDragOffset(deltaX);
    if (Math.abs(deltaX) > 10) {
      setHasDragged(true);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX === null) return;
    const deltaX = e.clientX - dragStartX;
    const threshold = 60;
    if (deltaX > threshold) {
      setCarouselActiveIndex((prev) => (prev - 1 + 7) % 7);
    } else if (deltaX < -threshold) {
      setCarouselActiveIndex((prev) => (prev + 1) % 7);
    }
    setDragStartX(null);
    setDragOffset(0);
    setTimeout(() => {
      setHasDragged(false);
    }, 50);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <main className="cs-page">
      {/* Hero Section */}
      <section className="cs-fs-hero">
        <video 
          className="cs-fs-hero-bg contraband-video" 
          src="/assets/Contraband.MP4"
          autoPlay loop muted playsInline
          preload="metadata"></video>
        <div className="cs-fs-hero-content">
          <h1 className="cs-fs-hero-title">CONTRABAND</h1>
          <p className="cs-fs-hero-sub">How a stain did what a celebrity couldn't</p>
          <p className="cs-fs-hero-text">88 million plus views in two weeks.</p>
          <div className="cs-fs-hero-tags-container">
            <div className="cs-fs-hero-tags-row-engagement">
              <span className="cs-fs-tag cs-fs-tag-white">Campaign/Project</span>
            </div>
            <div className="cs-fs-hero-tags-row-sub">
              <span className="cs-fs-tag">Campaign Strategy</span>
              <span className="cs-fs-tag">Scripts</span>
              <span className="cs-fs-tag">End-to-End DVC Production</span>
            </div>
          </div>
        </div>

        <Link href="/?expanded=true" className="cs-fs-back-btn" style={{ textDecoration: 'none' }} aria-label="Back to Work">
          ←
        </Link>

        <div className="cs-fs-scroll-indicator">
          <a href="#challenge" className="cs-fs-scroll-btn" style={{ textDecoration: 'none' }}>
            <span>CASE STUDY</span>
            <div className="cs-cue-line"></div>
          </a>
        </div>
      </section>

      {/* Editorial Header */}
      <section className="cs-hero" id="challenge" style={{ paddingTop: "180px" }}>
        <div className="cs-container">
          <h1 className="cs-title" style={{ lineHeight: "1.1", marginBottom: "4rem", display: 'block' }}>
            <span className="sweep-reveal-text">Illicit, But</span> <br />
            <span className="sweep-reveal-text" style={{ transitionDelay: '0.8s' }}>Not</span> <span className="sweep-reveal-text green-text" style={{ transitionDelay: '1.0s' }}>Explicit.</span>
          </h1>

          <div className="cs-meta" style={{ marginBottom: "4rem" }}>
            <div className="meta-item">
              <span className="meta-label">Brand</span>
              <span className="meta-value" style={{ fontWeight: "600" }}>Contraband</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Work</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Campaign Concept</span>
                <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Script</span>
                <span style={{ padding: "8px 12px", border: "1px solid #888", color: "#888", borderRadius: "50px", fontSize: "14px" }}>Production</span>
              </div>
            </div>
            <div className="meta-item">
              <span className="meta-label">Platform</span>
              <span className="meta-value" style={{ fontWeight: "600" }}>Instagram</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Result</span>
              <span className="meta-value" style={{ fontWeight: "600" }}>88M+ views in two weeks.<br />1.1M likes.</span>
            </div>
          </div>

          {/* Blinking Eyes GIF Hero */}
          <div className="cs-hero-image" style={{ marginBottom: "4rem" }}>
            <img 
              src="/assets/contraband_gdrive/contraband_tv_blinking.gif" 
              alt="Contraband Blinking Hero" 
              style={{ width: "100%", maxWidth: "800px", display: "block", margin: "0 auto" }}
            />
          </div>
        </div>
      </section>

      {/* Section 01 */}
      <section className="cs-block-section">
        <div className="cs-container">
          <div className="cs-content-narrow">
            <span className="cs-section-label">01 — The Brief</span>
            <p className="cs-section-text">Most fragrance briefs ask for aspiration. Beautiful people. Golden hour. The suggestion of a life you could be living.</p>
            <p className="cs-section-text">This one was harder.</p>
            <p className="cs-section-text">Contraband came with a specific mandate: the brand personality is rooted in whimsy, absurdity, and the particular excitement of wanting something you probably shouldn't.</p>
            
            <div style={{ borderLeft: "4px solid var(--green)", paddingLeft: "1.5rem", margin: "3rem 0", fontSize: "1.8rem", fontWeight: "800", color: "#1a1a1a", lineHeight: "1.3" }}>
              Heart wants what it wants. Break free.
            </div>
            
            <p className="cs-section-text">Not a fragrance brief. A permission brief. The work had to feel illicit without being illegal, luxurious without being sterile, and playful without being cheap. All three, simultaneously. There was also a production constraint that sharpened everything: no humans in the shoot. Budget, not philosophy. But it forced a more interesting question. If you can't show a person experiencing the fragrance, how do you convey personality, lifestyle, and sensation with objects alone? And underneath all of it, the problem that never goes away with fragrance: you are trying to sell a smell through a screen. The one sense the medium cannot transmit is the one sense the product is entirely about.</p>
            <p className="cs-section-text">Contraband trusted us to find the answer. That trust was not small. The brief asked for something that didn't have an obvious solution, and the client didn't flinch when we brought back something genuinely strange.</p>
          </div>
        </div>
      </section>

      {/* Section 02 */}
      <section className="cs-block-section" style={{ paddingTop: "2rem" }}>
        <div className="cs-container">
          <div className="cs-content-narrow">
            <span className="cs-section-label">02 — The Brand + The SKU</span>
            <h2 className="cs-section-heading">Every Contraband fragrance tells its story</h2>
            <p className="cs-section-text">Contraband is a luxury fragrance house founded by Ananya Birla. The founding act is the brand's first statement: deliberately not a family venture. The name is not a metaphor for smuggling. It is a metaphor for desire: the specific quality of wanting something you've been told to resist.</p>
            <p className="cs-section-text">Every Contraband fragrance tells its story in three acts: The Introduction (top notes, the first handshake), The Discovery (heart, true character), The Impression (base, the memory that lingers after the person has gone). This is not just product architecture. It is the creative brief for every film. The beginning hooks. The middle reveals. The ending refuses to leave.</p>
            <p className="cs-section-text">Summer Chase is the fourth SKU, unreleased at the time of the campaign, which meant it had no history, no loyal user base, no inherited associations. It had to build its mythology from scratch. The brand's own copy for the fragrance does the brief's work better than a strategy document could:</p>
            
            <div style={{ borderLeft: "4px solid var(--green)", paddingLeft: "1.5rem", margin: "3rem 0", fontSize: "1.8rem", fontWeight: "800", color: "#1a1a1a", lineHeight: "1.3" }}>
              Where reality blurs at the edges. Some things were never meant to be right, just unforgettable. Would you still choose it, knowing how it ends?
            </div>
            
            <p className="cs-section-text">This is a fragrance about the morning after, not the night before. The conscious mistake. The scent of a decision you'd make again.</p>
          </div>
        </div>
      </section>
      {/* Section 03 */}
      <section className="cs-block-section" style={{ paddingTop: "2rem", paddingBottom: 0 }}>
        <div className="cs-container">
          <div className="cs-content-narrow">
            <span className="cs-section-label">03 — The Idea</span>
            <p className="cs-section-text" style={{ fontSize: "2rem", fontWeight: "600", lineHeight: "1.3", color: "#1a1a1a", marginBottom: "2rem" }}>The question every fragrance campaign has to answer: if you can't show the smell, what do you show?</p>
            <p className="cs-section-text">The obvious answer, showing the experience, the moment, the charged glance, is what every fragrance brand does. It asks the viewer to feel something they can only observe from outside. We asked a different question: what if you don't show the experience at all? What if you show only what it left behind?</p>
            
            <div style={{ borderLeft: "4px solid var(--green)", paddingLeft: "1.5rem", margin: "3rem 0", fontSize: "1.8rem", fontWeight: "800", color: "#1a1a1a", lineHeight: "1.3" }}>
              Don't show the evening. Show what it left behind.
            </div>
          </div>
        </div>
      </section>

      {/* Full-width dark container for the video player - taking up natural auto-scaling height */}
      <section className="cs-inline-player-wrapper" style={{ background: "#0c0c0e", width: "100vw", height: "auto", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw", marginTop: "4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div 
          className="cs-inline-player-container" 
          style={{ width: "100%", height: "auto", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            if (isInlinePlaying) {
              setShowControls(false);
              if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
              }
            }
          }}
        >
          
          {/* The Video Element */}
          <video 
            ref={inlineVideoRef}
            src="/assets/conntraband assets/contraband page video 1.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} 
            preload="metadata"
            onTimeUpdate={handleInlineTimeUpdate}
            onEnded={handleInlineEnded}
            onClick={!isInlinePlaying ? handleStartInlinePlay : undefined}
          />

          {/* Click to Play Overlay (only when NOT playing the main video) */}
          {!isInlinePlaying && (
            <div 
              className="cs-video-play-overlay" 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.2)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer" }}
              onClick={handleStartInlinePlay}
            >
              <div className="cs-play-button-glass">
                <span className="cs-play-arrow"></span>
              </div>
            </div>
          )}

          {/* Custom Controls Bar (only when playing the main video) */}
          {isInlinePlaying && (
            <div 
              className="cs-player-controls-bar"
              style={{
                opacity: showControls ? 1 : 0,
                transform: showControls ? 'translateY(0)' : 'translateY(10px)',
                pointerEvents: showControls ? 'auto' : 'none',
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
            >
              {/* Play / Pause */}
              <button className="cs-player-btn" onClick={toggleInlinePlay} aria-label={isInlinePlaying ? "Pause" : "Play"}>
                {isInlinePlaying ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              
              {/* Mute / Unmute */}
              <button className="cs-player-btn" onClick={toggleInlineMute} aria-label={isInlineMuted ? "Unmute" : "Mute"}>
                {isInlineMuted ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L8 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                )}
              </button>

              {/* Progress Slider */}
              <div className="cs-player-progress-container" onClick={handleInlineProgressChange}>
                <div className="cs-player-progress-bg">
                  <div 
                    className="cs-player-progress-fill" 
                    style={{ width: `${inlineProgress}%` }}
                  />
                </div>
              </div>

              {/* Time Display */}
              <div className="cs-player-time">
                {formatTime(inlineTime.current)} / {formatTime(inlineTime.duration)}
              </div>

              {/* Fullscreen Toggle */}
              <button className="cs-player-btn" onClick={handleToggleFullscreen} aria-label="Fullscreen">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Section 04 */}
      <section className="cs-block-section" style={{ paddingTop: "2rem", paddingBottom: "6rem" }}>
        <div className="cs-container">
          <div className="cs-content-narrow">
            <span className="cs-section-label">04 — How It Works</span>
            <h2 className="cs-section-heading">Let it Stain</h2>
            <p className="cs-section-text">88 million views is not a number that happens. It is a number that is built. Here is what was built, and why.</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "3rem" }}>
              {/* Box 1 */}
              <div style={{ border: "1px solid #e0e0e0", borderRadius: "16px", padding: "2.5rem", background: "#ffffff" }}>
                <h3 style={{ color: "var(--green)", fontSize: "1.5rem", fontWeight: "800", marginBottom: "1rem", textTransform: "uppercase" }}>The hook is a visual taboo.</h3>
                <p style={{ color: "#666666", fontSize: "1.1rem", lineHeight: "1.6", margin: "0" }}>Humans are wired to protect clean surfaces. Watching something irreversibly ruin white bedsheets produces immediate cognitive friction: the kind that stops a thumb mid-scroll before the brain decides to stop. The hook is not just beautiful. It is uncomfortable. That is the point.</p>
              </div>

              {/* Box 2 */}
              <div style={{ border: "1px solid #e0e0e0", borderRadius: "16px", padding: "2.5rem", background: "#ffffff" }}>
                <h3 style={{ color: "var(--green)", fontSize: "1.5rem", fontWeight: "800", marginBottom: "1rem", textTransform: "uppercase" }}>The curiosity loops are stacked.</h3>
                <p style={{ color: "#666666", fontSize: "1.1rem", lineHeight: "1.6", margin: "0" }}>Viral retention is built on information gaps — the distance between what a viewer sees and what they understand. This film stacks five, in sequence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04 - Curiosity Loops (Scroll Pinned Dark Section) */}
      <section ref={loopsSectionRef} className="cs-loops-pinned-track">
        <div className="cs-loops-sticky-viewport">
          <div className="cs-loops-container">
            <div className="cs-loops-left">
              <span className="cs-section-label" style={{ color: "#888", display: "block", marginBottom: "0.5rem" }}>
                04 — How It Works
              </span>
              <h2 style={{ color: "#ffffff", fontSize: "2.5rem", fontWeight: "800", marginBottom: "1.5rem", textTransform: "none", letterSpacing: "-1px" }}>
                The Curiosity Stack
              </h2>
              <p style={{ color: "#888888", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "2rem", maxWidth: "420px" }}>
                Viral retention is built on information gaps — the distance between what a viewer sees and what they understand. Scroll through the film's five sequential curiosity loops.
              </p>
              
              <div className="cs-loops-captions-container">
                {loopsData.map((loop, idx) => {
                  const isActive = idx === visualActiveIndex;
                  const isPast = idx < visualActiveIndex;
                  return (
                    <div 
                      key={idx} 
                      className={`cs-loops-caption-card ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                      style={{
                        position: idx === 0 ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : (isPast ? 'translateY(-20px)' : 'translateY(20px)'),
                        transition: 'opacity 0.4s ease, transform 0.4s ease',
                        pointerEvents: isActive ? 'auto' : 'none',
                        boxSizing: 'border-box'
                      }}
                    >
                      <span style={{ color: "#8e8e93", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", display: "block" }}>
                        Loop 0{idx + 1}
                      </span>
                      <p style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: "600", lineHeight: "1.4", margin: "0.5rem 0" }}>
                        {loop.description}
                      </p>
                      <p style={{ color: "var(--green)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
                        {loop.stamp}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              {/* Progress dots */}
              <div className="cs-loops-progress-dots" style={{ display: 'flex', gap: '0.5rem', marginTop: '2.5rem' }}>
                {loopsData.map((_, idx) => {
                  const isActive = idx === visualActiveIndex;
                  return (
                    <div 
                      key={idx} 
                      style={{
                        width: isActive ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: isActive ? 'var(--green)' : '#2c2c2e',
                        transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)'
                      }}
                    />
                  );
                })}
              </div>
            </div>
            
            <div className="cs-loops-right">
              <div className="cs-card-stack-wrapper">
                {loopsData.map((loop, idx) => {
                  const cardsCount = loopsData.length;
                  
                  let cardStyle = {};
                  
                  if (idx < visualActiveIndex) {
                    const direction = idx % 2 === 0 ? -140 : 140;
                    const rotateDir = idx % 2 === 0 ? -12 : 12;
                    cardStyle = {
                      transform: `translateX(${direction}%) rotate(${rotateDir}deg)`,
                      opacity: 0,
                      pointerEvents: 'none'
                    };
                  } else if (idx === visualActiveIndex) {
                    cardStyle = {
                      transform: 'translate(0, 0) scale(1)',
                      opacity: 1,
                      pointerEvents: 'auto'
                    };
                  } else {
                    const depth = idx - visualActiveIndex;
                    const scale = 1 - depth * 0.05;
                    const translateOffset = depth * 15;
                    const opacity = 1 - depth * 0.25;
                    
                    cardStyle = {
                      transform: `translate(${translateOffset}px, ${translateOffset}px) scale(${scale})`,
                      opacity: Math.max(0, opacity),
                      pointerEvents: 'none'
                    };
                  }

                  return (
                    <div 
                      key={idx} 
                      className="cs-stack-card" 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: cardsCount - idx,
                        transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease',
                        ...cardStyle
                      }}
                    >
                      <div className="phone-frame dark-bezel">
                        <video 
                          src={loop.videoSrc} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          preload="metadata"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '32px'
                          }}
                        />
                      </div>
                      
                      <div className="cs-loops-mobile-caption" style={{ display: 'none' }}>
                        <span style={{ color: "#8e8e93", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                          Loop 0{idx + 1}
                        </span>
                        <p style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: "600", lineHeight: "1.4", margin: "0.4rem 0" }}>
                          {loop.description}
                        </p>
                        <p style={{ color: "var(--green)", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {loop.stamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Arrives Section */}
      <section className="cs-block-section" style={{ paddingTop: "2rem" }}>
        <div className="cs-container">
          <div className="cs-content-narrow">
            <div style={{ border: "1px solid #e0e0e0", borderRadius: "36px", padding: "3rem", marginBottom: "4rem" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#1a1a1a", marginBottom: "1.5rem" }}>The product arrives at 17 seconds. Not before.</h3>
              <p style={{ color: "#666666", fontSize: "1.1rem", lineHeight: "1.6", margin: "0" }}>By this point, the viewer has watched more than 70% of the film without knowing what is being advertised, or even knowing if something is being advertised. Average view duration this high is what algorithms reward with reach. The Summer Chase bottle rolls into the mess, found in it, not presented above it. A product on a surface is a product in an advertisement. A product in the wreckage is a product in a story. When the bottle lands and "LET IT STAIN" appears, the brain connects backwards through the entire film simultaneously. The mess was the recipe. The fragrance notes were the ingredients. The stain is the sillage: the scent's trail, its longevity, the mark it refuses to stop making. "LET IT STAIN" does three things at once: describes what you're watching, characterises the emotional territory, and functions as a philosophy. The brand's entire thesis compressed to a command. Not a tagline. A permission slip.</p>
            </div>
          </div>

          <div className="cs-image-center" style={{ marginTop: "0", marginBottom: "4rem" }}>
            <video src="/assets/conntraband assets/contraband page video 1.mp4" autoPlay loop muted playsInline style={{ width: "100%", borderRadius: "20px", objectFit: "cover", display: "block", maxHeight: "600px" }} preload="metadata"></video>
          </div>

          <div className="cs-content-narrow">
            <div style={{ borderLeft: "4px solid var(--green)", paddingLeft: "1.5rem", margin: "0 0 3rem 0", fontSize: "24px", fontWeight: "800", color: "#1a1a1a", lineHeight: "1.3" }}>
              "Let It Stain" does three things at once: describes what you're watching, characterises the emotional territory, and functions as a philosophy. Not a tagline. A permission slip.
            </div>
          </div>
        </div>
      </section>

      {/* Section 05: The Snackable (Teapot Vertical Film) - Cinematic Dark Section */}
      <section className="cs-dark-section cs-snackable-dark-section">
        <div className="cs-container">
          <div className="cs-dark-grid">
            <div className="cs-split-image" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {/* Premium iPhone Bezel mockup for Vertical 9:16 Video */}
              <div 
                className="cs-video-thumbnail-container vertical"
                style={{ 
                  width: "330px", 
                  height: "586px", 
                  maxWidth: "100%", 
                  border: "10px solid #1c1c1e", 
                  borderRadius: "48px", 
                  boxSizing: "border-box", 
                  display: "flex", 
                  cursor: "pointer", 
                  position: "relative", 
                  overflow: "hidden",
                  boxShadow: "0 30px 60px -15px rgba(0,0,0,0.8)",
                  backgroundColor: "#000"
                }}
                onClick={() => handleOpenVideo('/assets/contraband_gdrive/Summer Chase/MP4/Summer Chase_Shortie_  VR.mp4', 'portrait')}
              >
                <video src="/assets/conntraband assets/summer_chase_teapot.mp4" autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} preload="metadata"></video>
                <div className="cs-video-play-overlay">
                  <div className="cs-play-button-glass">
                    <span className="cs-play-arrow"></span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="cs-section-label" style={{ color: "#888" }}>05 — The Five-Second Cut</span>
              <h2 className="cs-section-heading">The Snackable</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <p className="cs-section-text">The same creative DNA at a completely different velocity. A glass teapot on a tray, amber tea inside. From above, the Summer Chase bottle plunks in. Tea spills from the spout onto a dish of compressed coin tissues: they rise. Cut to close-up: the bottle rising through the amber liquid. Five seconds. Done.</p>
                <p className="cs-section-text">No narrative, no buildup. The hook is pure cognitive dissonance (a luxury bottle brewing in a teapot) and the loop is frictionless enough that the completion rate runs well past 100%. The film has restarted before the brain finishes processing what it saw. 26.4 million views from a video shorter than a breath.</p>
                <p className="cs-section-text">The teapot cut didn't ride the success of Let It Stain. It ran on its own mechanics. Two films, the same creative system. Proof that the approach was replicable, not a fluke.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 06 — The Numbers */}
      <section className="cs-stats-section" style={{ borderTop: "none", paddingTop: "6rem", paddingBottom: "4rem" }}>
        <div className="cs-container">
          <div className="cs-content-narrow" style={{ marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="cs-section-label" style={{ marginBottom: "0", whiteSpace: "nowrap" }}>06 — The Numbers</span>
            <div style={{ flexGrow: "1", height: "1px", backgroundColor: "#e0e0e0" }}></div>
          </div>
          
          <div className="cs-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            <div className="cs-stat-item">
              <h4>88<span style={{ fontSize: "inherit", color: "var(--green)" }}>M+</span></h4>
              <span>Total views</span>
            </div>
            <div className="cs-stat-item">
              <h4>1.1<span style={{ fontSize: "inherit", color: "var(--green)" }}>M+</span></h4>
              <span>Likes on hero film</span>
            </div>
          </div>
          
          <div className="cs-content-narrow" style={{ marginTop: "4rem" }}>
            <p className="cs-section-text">Let It Stain: 88 million views in two weeks. 1.1 million likes. The snackable cut: 26.4 million views. For a fragrance brand's fourth SKU, no human talent, a brief that asked luxury to feel illicit without being explicit.</p>
            <p className="cs-section-text" style={{ fontWeight: "600", color: "#1a1a1a", marginTop: "2rem" }}>The number is not the point. The architecture is the point. The number is what happens when the architecture works.</p>
          </div>
        </div>
      </section>

      {/* Section 07 — Visual Archive (Structured Alignments) */}
      <section className="cs-gallery-section" style={{ backgroundColor: "#0c0c0e", paddingTop: "8rem", paddingBottom: "8rem", color: "#ffffff", overflow: "hidden" }}>
        {/* The Main Vault Copy (Left-Aligned) */}
        <div className="cs-container" style={{ marginBottom: "4rem" }}>
          <div style={{ maxWidth: "700px" }}>
            <span className="cs-section-label" style={{ color: "#888", display: "block", marginBottom: "1rem" }}>07 — Visual Craft Archive</span>
            <h2 className="cs-section-heading" style={{ color: "#ffffff", fontSize: "clamp(2.5rem, 4vw, 48px)", lineHeight: "1.1", marginBottom: "1.5rem", textTransform: "none", fontWeight: "800", letterSpacing: "-1px" }}>The Campaign Vault.</h2>
            <p style={{ color: "#888888", fontSize: "1.1rem", lineHeight: "1.6", margin: "0" }}>
              To establish the visual universe of Contraband, we crafted several other product-focused SKU films. Left out of the main case study narrative, these films study visual weight, tactile textures, and absurd loops.
            </p>
          </div>
        </div>

        <div className="cs-container-large" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative', overflow: 'visible' }}>
          <div 
            className={`cs-carousel-stage ${dragStartX !== null ? 'dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="cs-carousel-track">
              {vaultItems.map((item, idx) => {
                let baseOffset = idx - carouselActiveIndex;
                if (baseOffset < -3) baseOffset += 7;
                if (baseOffset > 3) baseOffset -= 7;
                
                // Add real-time drag offset
                let floatOffset = baseOffset + (dragOffset / 320);
                // Wrap to loop correctly
                if (floatOffset < -3.5) floatOffset += 7;
                if (floatOffset > 3.5) floatOffset -= 7;
                
                const isActive = idx === carouselActiveIndex;
                const absOffset = Math.abs(floatOffset);
                const zIndex = Math.round(10 - absOffset);
                
                return (
                  <div
                    key={item.id}
                    className={`cs-carousel-card ${isActive ? 'active' : ''}`}
                    style={{
                      '--offset': floatOffset,
                      '--abs-offset': absOffset,
                      '--z-index': zIndex,
                    } as React.CSSProperties}
                    onClick={() => {
                      if (hasDragged) return;
                      if (!isActive) {
                        setCarouselActiveIndex(idx);
                      }
                    }}
                  >
                    <div className="cs-gallery-video-wrapper">
                      <CarouselVideo
                        src={item.previewSrc}
                        isActive={isActive}
                        onTimeUpdate={handlePreviewTimeUpdate(item.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cs-carousel-indicators" style={{ marginTop: "4rem" }}>
            {vaultItems.map((_, idx) => (
              <button 
                key={idx}
                className={`cs-carousel-dot ${idx === carouselActiveIndex ? 'active' : ''}`}
                onClick={() => setCarouselActiveIndex(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 08 — The Footprint */}
      <section className="cs-block-section" style={{ backgroundColor: "#ffffff" }}>
        <div className="cs-container">
          <div className="cs-content-narrow">
            <span className="cs-section-label">08 — The Footprint</span>
            <h2 className="cs-section-heading">This isn't an ad campaign. It's the physics of organic obsession.</h2>
            <p className="cs-section-text">Traditional advertising asks for permission to speak. It presents a sterile, idealized aspiration and hopes the viewer doesn't scroll past before the logo appears.</p>
            <p className="cs-section-text">We built a system that stops the thumb by violating a basic human instinct: the urge to keep clean surfaces pristine. By stacking curiosity loops and staging visual friction, the content works because it feels illegal to look away. 88 million views didn't happen because of a media budget; they happened because we engineered a visual loop that refuses to leave the brain.</p>
            
            <div style={{ borderLeft: "4px solid var(--green)", paddingLeft: "2rem", marginTop: "4rem", marginBottom: "4rem" }}>
              <p style={{ fontSize: "clamp(1.8rem, 5vw, 36px)", fontWeight: "800", lineHeight: "1.2", margin: "0", color: "#1a1a1a" }}>
                Show the scene and the audience watches. Show the evidence and the audience writes the scene. The second one stays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section style={{ backgroundColor: "#1D1D1F", padding: "4rem 0" }}>
        <div className="cs-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
            <span style={{ backgroundColor: "#ffffff", color: "#000000", border: "1px solid #ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", fontWeight: "700", whiteSpace: "nowrap" }}>Campaign/Project</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
            <span style={{ border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap" }}>Campaign Strategy</span>
            <span style={{ border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap" }}>Scripts</span>
            <span style={{ border: "1px solid #48484A", color: "#ffffff", padding: "14px 36px", borderRadius: "50px", fontSize: "1rem", whiteSpace: "nowrap" }}>End-to-End DVC Production</span>
          </div>
        </div>
      </section>

      {/* Ready to build yours */}
      <section className="cs-next-project" style={{ background: "#ffffff", padding: "8rem 0", textAlign: "center", position: "relative", zIndex: "10" }}>
        <div className="cs-next-content" style={{ color: "#1a1a1a", maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: "2" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ height: "1px", backgroundColor: "#888", width: "60px" }}></div>
            <span style={{ color: "#888", margin: "0", textTransform: "uppercase", fontSize: "12px", letterSpacing: "2px", fontWeight: "700" }}>READY FOR YOUR LAUNCH</span>
            <div style={{ height: "1px", backgroundColor: "#888", width: "60px" }}></div>
          </div>
          <h2 className="cs-next-title" style={{ color: "#1a1a1a", marginBottom: "3rem" }}>Tell us what’s <span style={{ color: "var(--green)" }}>impossible.</span></h2>
          <Link href="/#contact" className="btn-gradient" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none", padding: "16px 36px", borderRadius: "30px", fontWeight: "600" }}>
            Start the conversation
          </Link>
        </div>
      </section>

      <Carousel currentProject="contraband" />

      {/* Fullscreen Video Player Modal Overlay */}
      <div 
        className={`cs-fullscreen-overlay ${activeVideo ? 'active' : ''}`} 
        onClick={handleCloseVideo}
        style={{ 
          display: activeVideo ? 'flex' : 'none',
          opacity: activeVideo ? 1 : 0,
          pointerEvents: activeVideo ? 'all' : 'none',
          transition: 'opacity 0.3s ease'
        }}
      >
        <div className={`cs-fullscreen-player-container ${activeVideoAspect}`} onClick={e => e.stopPropagation()}>
          <video 
            ref={videoRef}
            src={activeVideo || undefined} 
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)} 
            preload="metadata" 
          />
          
          {/* Custom Sleek Controls */}
          <div className="cs-player-controls-bar">
            {/* Play / Pause */}
            <button className="cs-player-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            
            {/* Mute / Unmute */}
            <button className="cs-player-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L8 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              )}
            </button>

            {/* Progress Slider */}
            <div className="cs-player-progress-container" onClick={handleProgressChange}>
              <div className="cs-player-progress-bg">
                <div className="cs-player-progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* Time Display */}
            <span className="cs-player-time">{currentTime} / {duration}</span>
          </div>

          {/* Close Button */}
          <button className="cs-player-close-btn" onClick={handleCloseVideo} aria-label="Close Player">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </main>
  );
}
