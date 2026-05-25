"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import HomeClientLogic from '@/components/HomeClientLogic';

export default function Home() {
  // Add state/refs for dropdowns and animations
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lenis = useLenis();
  
  // Set to true to show the testimonials section on the website
  const showTestimonials = false;

  // Scroll to open details dropdown
  useEffect(() => {
    if (activeDropdown && lenis) {
      const targetEl = document.getElementById(activeDropdown);
      if (targetEl) {
        setTimeout(() => {
          lenis.scrollTo(targetEl, { offset: -80, duration: 1.2 });
        }, 150);
      }
    }
  }, [activeDropdown, lenis]);

  // Auto-close active details dropdown when scrolling to another card
  useEffect(() => {
    const cards = document.querySelectorAll('.fs-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardIndex = Array.from(cards).indexOf(entry.target);
          const targetDetailsId = `details-${cardIndex + 1}`;
          setActiveDropdown(current => {
            if (current && current !== targetDetailsId) {
              return null;
            }
            return current;
          });
        }
      });
    }, { threshold: 0.3 });

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Sending as text/plain avoids CORS preflight errors with Google Apps Script
      await fetch('https://script.google.com/macros/s/AKfycbwnJS-rSkg6w1dFoU-c2zCA6Kts52nmLnc0Z1w38-uJbGjANCbgRcQVVXIcE6cq2dzfXQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error("Submission error:", error);
    }
    
    setIsSubmitting(false);
    setIsFormSubmitted(true);
  };

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDropdown(prev => prev === id ? null : id);
  };
  const pathname = usePathname();

  useEffect(() => {
    // Force all loop/background videos to play, excluding the scroll-locked hero video and how-we-work-video.
    // Next.js router cache sometimes suspends videos on navigation.
    const videos = document.querySelectorAll('video:not(#hero-video):not(#how-we-work-video)');
    videos.forEach((vid) => {
      // Re-trigger play safely
      (vid as HTMLVideoElement).play().catch((err: any) => console.log('Autoplay prevented:', err));
    });
  }, [pathname]);

  return (
    <main>
      {/* Inject the logic component without wrapping */}
      <HomeClientLogic />

    <section id="hero-bubble-section" className="hero-bubble-section collapsed">

      <div className="hero-bubble-container">
        <div id="hero-headline" className="hero-headline headline-hidden">
          <h1 className="hero-headline-text">
            <span className="line-1">We build creative systems &amp; solutions</span>
            <span className="line-2">for brands with a right to win.</span>
          </h1>
          <div className="hero-scroll-cue">
            <span className="hero-cue-text">Enter</span>
            <div className="hero-cue-line"></div>
          </div>
        </div>

        {/* Bubble 1: Largest - Lady with headphones (Appreciate) */}
        <Link href="/appreciate" className="project-bubble bubble-appreciate animate-float-1" data-project="appreciate">
          <div className="bubble-video-wrap">
            <video 
              className="bubble-video" 
              src={`/assets/Appreciate.MP4`}
              preload="metadata" loop muted playsInline autoPlay
            ></video>
          </div>
          <div className="bubble-info">
            <span className="bubble-title">APPRECIATE</span>
            <span className="bubble-desc">How a fintech compounds interest</span>
          </div>
          <div className="bubble-outer-info">
            <span className="bubble-outer-headline">How a fintech <br /> compounds interest.</span>
            <span className="bubble-outer-sub">0 &rarr; 124K followers in 18 months.</span>
          </div>
        </Link>

        {/* Bubble 2: Medium-small - Mushroom (Contraband) */}
        <Link href="/contraband" className="project-bubble bubble-contraband animate-float-2" data-project="contraband">
          <div className="bubble-video-wrap">
            <video 
              className="bubble-video" 
              src={`/assets/Contraband.MP4`}
              preload="metadata" loop muted playsInline autoPlay
            ></video>
          </div>
          <div className="bubble-info">
            <span className="bubble-title">CONTRABAND</span>
            <span className="bubble-desc">How a stain did what a celebrity couldn't</span>
          </div>
          <div className="bubble-outer-info">
            <span className="bubble-outer-headline">How a stain did <br /> what a celebrity couldn't.</span>
            <span className="bubble-outer-sub">88 million plus views in two weeks.</span>
          </div>
        </Link>

        {/* Bubble 3: Medium - Glass Flower (Aava) */}
        <Link href="/aava" className="project-bubble bubble-aava animate-float-3" data-project="aava">
          <div className="bubble-video-wrap">
            <video 
              className="bubble-video" 
              src={`/assets/aava.mp4`}
              preload="metadata" loop muted playsInline autoPlay
            ></video>
          </div>
          <div className="bubble-info">
            <span className="bubble-title">AAVA</span>
            <span className="bubble-desc">How two words made a 20-year-old water brand uncopyable</span>
          </div>
          <div className="bubble-outer-info">
            <span className="bubble-outer-headline">How two words made a <br /> 20-year-old water brand uncopyable.</span>
            <span className="bubble-outer-sub">6.5M views · Born Alkaline</span>
          </div>
        </Link>

        {/* Bubble 4: Small - Abstract Explosion (Hamleys) */}
        <Link href="/hamleys" className="project-bubble bubble-hamleys animate-float-4" data-project="hamleys">
          <div className="bubble-video-wrap">
            <video 
              className="bubble-video" 
              src={`/assets/hamleys.mp4`}
              preload="metadata" loop muted playsInline autoPlay
            ></video>
          </div>
          <div className="bubble-info">
            <span className="bubble-title">HAMLEYS</span>
            <span className="bubble-desc">Solving Valentine's for Gen Z</span>
          </div>
          <div className="bubble-outer-info">
            <span className="bubble-outer-headline">How a 265-year-old toy store solved Valentine’s for Gen Z.</span>
            <span className="bubble-outer-sub">5M+ organic views in one week. Recommissioned year two.</span>
          </div>
        </Link>

        {/* Bubble 5: How We Work Anchor */}
        <Link href="#statement" className="project-bubble bubble-tiny bubble-how-we-work animate-float-1" data-project="anchor">
          <div className="bubble-video-wrap" style={{ background: 'linear-gradient(135deg, #0FC823, #B0CB1F)' }}>
            <div className="tiny-sphere-pulse"></div>
          </div>
          <div className="bubble-outer-info">
            <span className="bubble-outer-headline how-we-work-label">HOW WE WORK</span>
          </div>
        </Link>

        {/* Bubble 6: About Machinga Anchor */}
        <Link href="#about" className="project-bubble bubble-tiny bubble-about animate-float-2" data-project="anchor">
          <div className="bubble-video-wrap" style={{ background: 'linear-gradient(135deg, #0FC823, #B0CB1F)' }}>
            <div className="tiny-sphere-pulse"></div>
          </div>
          <div className="bubble-outer-info">
            <span className="bubble-outer-headline how-we-work-label">ABOUT MACHINGA</span>
          </div>
        </Link>

        {/* Bubble 7: Things We Believe To Be True Anchor */}
        <Link href="#beliefs" className="project-bubble bubble-tiny bubble-beliefs animate-float-3" data-project="anchor">
          <div className="bubble-video-wrap" style={{ background: 'linear-gradient(135deg, #0FC823, #B0CB1F)' }}>
            <div className="tiny-sphere-pulse"></div>
          </div>
          <div className="bubble-outer-info">
            <span className="bubble-outer-headline how-we-work-label">beliefs</span>
          </div>
        </Link>

        {/* Bubble 8: Contact Form Anchor */}
        <Link href="#contact" className="project-bubble bubble-tiny bubble-contact animate-float-4" data-project="anchor">
          <div className="bubble-video-wrap" style={{ background: 'linear-gradient(135deg, #0FC823, #B0CB1F)' }}>
            <div className="tiny-sphere-pulse"></div>
          </div>
          <div className="bubble-outer-info">
            <span className="bubble-outer-headline how-we-work-label">Let's Talk</span>
          </div>
        </Link>

        {/* Video Player for How We Work (plays Machinga_Full_Sequence_v11_4K.mp4) */}
        <div id="how-we-work-video-container" className="how-we-work-video-container">
          <video 
            id="how-we-work-video"
            className="how-we-work-video"
            playsInline
            loop
            muted
            preload="auto"
          >
            <source src={`/assets/Machinga_Full_Sequence_v11_4K.mp4`} type="video/mp4" />
          </video>
        </div>

        {/* Central Machinga Logo Button (Placed last for CSS layout layer overlaying) */}
        <button id="hero-logo-btn" className="hero-logo-btn logo-intro-hidden" aria-label="Explore Machinga Work">
          <img 
            src={`/assets/machinga_logos.png`}
            alt="Machinga logo" 
            className="logo-icon-img"
          />
          <div className="logo-btn-ring"></div>
        </button>

      </div>
    </section>



    {/*  Work Section  */}
    <section className="fs-cards-section" id="work">
        <div className="fs-card">
            <video className="fs-card-bg" src={`/assets/Appreciate.MP4`} loop muted playsInline preload="none"></video>
            <div className="fs-card-content">
                <h2 className="fs-card-title">APPRECIATE</h2>
                <p className="fs-card-sub">How a fintech compounds interest</p>
                <p className="fs-card-text">0 &rarr; 124K followers in 18 months.</p>
                <div className="fs-card-tags">
                    <span className="fs-tag">Content Strategy</span>
                    <span className="fs-tag">Engine Architecture</span>
                    <span className="fs-tag">Multi-format Production</span>
                    <span className="fs-tag">Creator Discovery</span>
                    <span className="fs-tag">Ongoing Optimisation</span>
                </div>
            </div>
            <div className="scroll-down-indicator">
                <button 
                    onClick={(e) => toggleDropdown('details-1', e)} 
                    className="toggle-details"
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'inherit'
                    }}
                >
                    <span style={{ fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase' }}>DETAIL</span>
                    <span className="arrow" style={{ fontSize: '1.2rem', marginTop: '2px' }}>&darr;</span>
                </button>
            </div>
        </div>

        <div id="details-1" className={`card-details-dropdown ${activeDropdown === 'details-1' ? 'open' : ''}`}>
            <div className="card-details-container">
                <div className="details-left-side">
                    <h4 className="details-section-title">The Insight</h4>
                    <p className="details-section-text">Finance content doesn't have to be boring. Everyone was educating. Nobody was entertaining. The insight: make finance feel like culture, not curriculum.</p>
                    <h4 className="details-section-title">The Work</h4>
                    <p className="details-section-text">We built a content engine from scratch. Multi-format, high-frequency, relentlessly consistent. An animal podcast explaining IPOs. Investigative deep-dives. Creator collabs before creators blew up. 6–8 pieces per week, every week, for 18 months.</p>
                    <Link href="/appreciate" className="details-btn">View Full Case Study</Link>
                </div>
                <div className="details-right-side">
                    <div className="stats-grid">
                        <div className="stat-box">
                            <div className="stat-number">124K+</div>
                            <div className="stat-label">Instagram followers from 0</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">400K+</div>
                            <div className="stat-label">Total audience across platforms</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">1M+</div>
                            <div className="stat-label">Views consistently on viral bets</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">100M+</div>
                            <div className="stat-label">Total views over 18 months</div>
                        </div>
                    </div>
                    <h4 className="details-section-title">Engagement Model</h4>
                    <p className="details-section-text">Content Engine — Full-service retainer, embedded team, ongoing production</p>
                </div>
            </div>
        </div>

        <div className="fs-card">
            <video className="fs-card-bg" src={`/assets/Contraband.MP4`} loop muted playsInline preload="none"></video>
            <div className="fs-card-content">
                <h2 className="fs-card-title">CONTRABAND</h2>
                <p className="fs-card-sub">How a stain did what a celebrity couldn't.</p>
                <p className="fs-card-text">88M+ views in 2 weeks.</p>
                <div className="fs-card-tags">
                    <span className="fs-tag">Campaign Strategy</span>
                    <span className="fs-tag">Scripts</span>
                    <span className="fs-tag">End-to-End DVC Production</span>
                </div>
            </div>
            <div className="scroll-down-indicator">
                <button 
                    onClick={(e) => toggleDropdown('details-2', e)} 
                    className="toggle-details"
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'inherit'
                    }}
                >
                    <span style={{ fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase' }}>DETAIL</span>
                    <span className="arrow" style={{ fontSize: '1.2rem', marginTop: '2px' }}>&darr;</span>
                </button>
            </div>
        </div>

        <div id="details-2" className={`card-details-dropdown ${activeDropdown === 'details-2' ? 'open' : ''}`}>
            <div className="card-details-container">
                <div className="details-left-side">
                    <h4 className="details-section-title">The Insight</h4>
                    <p className="details-section-text">You can't show a smell through a screen. The budget said no humans on camera either. Two constraints. One answer: don't show the evening at all. Show what it left behind. A stain is sillage made visible entirely in the viewer’s imagination. Each ruined object is a fragrance note. The mess is the recipe.</p>
                    <h4 className="details-section-title">The Work</h4>
                    <p className="details-section-text">Slow-moving, beautiful, and whimsical hero film carefully engineered for virality. Plus a snackable 5 seconder with the same instinct, but completely different velocity. Two films, one creative system, 88M+ views.</p>
                    <Link href="/contraband" className="details-btn">View Full Case Study</Link>
                </div>
                <div className="details-right-side">
                    <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div className="stat-box">
                            <div className="stat-number">88M+</div>
                            <div className="stat-label">Total views</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">1.1M+</div>
                            <div className="stat-label">Likes on hero film</div>
                        </div>
                    </div>
                    <h4 className="details-section-title">Engagement Model</h4>
                    <p className="details-section-text">Campaign/Project — Campaign Strategy | Scripts | End-to-End DVC Production</p>
                </div>
            </div>
        </div>

        <div className="fs-card">
            <video className="fs-card-bg" src={`/assets/aava.mp4`} loop muted playsInline preload="none"></video>
            <div className="fs-card-content">
                <h2 className="fs-card-title">AAVA</h2>
                <p className="fs-card-sub">How two words made a 20-year-old water brand uncopyable</p>
                <p className="fs-card-text">6.5M views · Born Alkaline</p>
                <div className="fs-card-tags">
                    <span className="fs-tag">Brand Strategy</span>
                    <span className="fs-tag">Campaign</span>
                    <span className="fs-tag">FMGC</span>
                </div>
            </div>
            <div className="scroll-down-indicator">
                <button 
                    onClick={(e) => toggleDropdown('details-3', e)} 
                    className="toggle-details"
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'inherit'
                    }}
                >
                    <span style={{ fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase' }}>DETAIL</span>
                    <span className="arrow" style={{ fontSize: '1.2rem', marginTop: '2px' }}>&darr;</span>
                </button>
            </div>
        </div>

        <div id="details-3" className={`card-details-dropdown ${activeDropdown === 'details-3' ? 'open' : ''}`}>
            <div className="card-details-container">
                <div className="details-left-side">
                    <h4 className="details-section-title">The Insight</h4>
                    <p className="details-section-text">Every brand was claiming "alkaline," including those stripping water with RO and re-ionising it. The word had been diluted into meaninglessness. Aava's water has been naturally alkaline for 20 years. The goal: find a line that isn't just true, but that an imposter cannot safely steal.</p>
                    <h4 className="details-section-title">The Work</h4>
                    <p className="details-section-text">Three films, three registers. An earnest brand launch built on deliberate understatement. A deadpan anti-ad where every RTB lands as a negative that's actually a positive. A viral comedy where a fake brand called Generic enacts exactly what competitors do. Nothing exaggerated. Reposted by Zepto and Instamart.</p>
                    <Link href="/aava" className="details-btn">View Full Case Study</Link>
                </div>
                <div className="details-right-side">
                    <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div className="stat-box">
                            <div className="stat-number">6.5M+</div>
                            <div className="stat-label">Total Views</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">200K+</div>
                            <div className="stat-label">Total Likes</div>
                        </div>
                    </div>
                    <h4 className="details-section-title">Engagement Model</h4>
                    <p className="details-section-text">Creative Strategy | Campaign / Project — Brand Strategy | Positioning | Scripts | End-to-End DVC Production</p>
                </div>
            </div>
        </div>

        <div className="fs-card">
            <video className="fs-card-bg" src={`/assets/hamleys.mp4`} loop muted playsInline preload="none"></video>
            <div className="fs-card-content">
                <h2 className="fs-card-title">HAMLEYS</h2>
                <p className="fs-card-sub">How a 265-year-old toy store solved Valentine’s for Gen Z.</p>
                <p className="fs-card-text">5M+ organic views in one week. Recommissioned year two.</p>
                <div className="fs-card-tags">
                    <span className="fs-tag">Campaign Strategy</span>
                    <span className="fs-tag">On-ground Activation</span>
                    <span className="fs-tag">Video Production</span>
                    <span className="fs-tag">Social Media Content</span>
                </div>
            </div>
            <div className="scroll-down-indicator">
                <button 
                    onClick={(e) => toggleDropdown('details-4', e)} 
                    className="toggle-details"
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'inherit'
                    }}
                >
                    <span style={{ fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase' }}>DETAIL</span>
                    <span className="arrow" style={{ fontSize: '1.2rem', marginTop: '2px' }}>&darr;</span>
                </button>
            </div>
        </div>

        <div id="details-4" className={`card-details-dropdown ${activeDropdown === 'details-4' ? 'open' : ''}`}>
            <div className="card-details-container">
                <div className="details-left-side">
                    <h4 className="details-section-title">The Insight</h4>
                    <p className="details-section-text">Hamleys was seeing Valentine's week footfall from an audience it had never marketed to. Gen Z couples. The opportunity was obvious. What wasn't obvious was what to say to them. Valentine's Day for this generation isn't romantic. It's a pressure test of the relationship status.</p>
                    <h4 className="details-section-title">The Work</h4>
                    <p className="details-section-text">A campaign built entirely around naming the anxiety, not selling the product. Social content, a visual identity that went the opposite direction of every other Valentine's brand, and a life-sized bear in mall atriums that let people say something without having to say anything at all.</p>
                    <Link href="/hamleys" className="details-btn">View Full Case Study</Link>
                </div>
                <div className="details-right-side">
                    <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div className="stat-box">
                            <div className="stat-number">5M+</div>
                            <div className="stat-label">Organic views in one week</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">Year 2</div>
                            <div className="stat-label">Campaign recommissioned</div>
                        </div>
                    </div>
                    <h4 className="details-section-title">Engagement Model</h4>
                    <p className="details-section-text">Creative Strategy | Campaign/Project — Campaign Strategy | On-ground Activation | Video Production | Social Media Content</p>
                </div>
            </div>
        </div>
    </section>

    {/*  Services Marquee  */}
    <section className="marquee-section" id="home">
        <div className="marquee-content">
            <span>
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Content Strategy
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Creative Direction
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Video Production
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Social Media
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Campaign Development
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Brand Strategy
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> AI Filmmaking
            </span>
            <span>
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Content Strategy
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Creative Direction
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Video Production
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Social Media
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Campaign Development
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> Brand Strategy
                <img src={`/assets/machinga_logos.png`} alt="logo" className="marquee-logo" /> AI Filmmaking
            </span>
        </div>
    </section>

    {/*  How We Work Title & Video Section  */}
    <section className="statement-section reveal-on-scroll" id="statement" style={{ paddingBottom: '0', paddingTop: '80px' }}>
        <div className="container" style={{ marginBottom: '2rem' }}>
            <span className="statement-label">HOW WE WORK</span>
        </div>
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor: '#ffffff', position: 'relative' }}>
            <video 
                id="how-we-work-page-video"
                src={`/assets/Machinga_Full_Sequence_v11_4K.mp4`}
                loop 
                muted 
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#ffffff' }}
            ></video>
            <canvas id="wind-canvas" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}></canvas>
        </div>
    </section>

    {/*  Pricing & Engagement Section  */}
    <section className="pricing-section reveal-on-scroll" id="pricing" style={{ paddingTop: '80px' }}>
        <div className="container" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 64px)', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1, margin: '0 0 1rem 0', letterSpacing: '-1px' }}>
                <span className="sweep-reveal-text">One size fits none.</span>
            </h2>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#666666', fontWeight: 500, margin: 0 }}>
                Buy to scope. Nothing more. Nothing less.
            </p>
        </div>
        <div className="container pricing-grid">
            <div className="pricing-card">
                <h3>CONTENT<br />ENGINE</h3>
                <h4>Think. Make. Run. All of it.</h4>
                <p className="desc">Full-service creative partnership. We develop your content strategy, embed a dedicated
                    team, and run your content operation. You get an in-house creative department without building one.
                </p>
                <ul className="features">
                    <li>Dedicated team & strategy</li>
                    <li>Ongoing production</li>
                    <li>Performance optimisation</li>
                </ul>
                <Link href="/appreciate" className="pricing-case-link">LIKE APPRECIATE →</Link>
                <div className="price-box">
                    <span className="label">Starting at</span>
                    <span className="price">₹4L<span>/month</span></span>
                </div>
            </div>
            <div className="pricing-card">
                <h3>CREATIVE<br />STRATEGY</h3>
                <h4>We Think. You make. We guide</h4>
                <p className="desc">Strategic direction without full execution. We develop your content strategy, create
                    concepts and scripts, and provide creative oversight—you or your team handles production. Get our
                    thinking without our production costs.</p>
                <ul className="features">
                    <li>Content strategy & concept</li>
                    <li>Scripts & briefs</li>
                    <li>Ongoing strategic counsel</li>
                </ul>
                <Link href="/hamleys" className="pricing-case-link">LIKE HAMLEYS →</Link>
                <div className="price-box">
                    <span className="label">Starting at</span>
                    <span className="price">₹1.5L<span>/month</span></span>
                </div>
            </div>
            <div className="pricing-card highlight-card">
                <h3>CAMPAIGN /<br />PROJECT</h3>
                <h4>Think. Make. Ship.</h4>
                <p className="desc">One-off creative work. Campaign concepts, brand films, launch content,
                    repositioning—defined scope, clear deliverables, fixed timeline. When you need something specific
                    done well.</p>
                <ul className="features">
                    <li>Defined scope & timeline</li>
                    <li>Creative development</li>
                    <li>Full production</li>
                </ul>
                <Link href="/contraband" className="pricing-case-link">LIKE CONTRABAND →</Link>
                <div className="price-box">
                    <span className="label">Starting at</span>
                    <span className="price">₹5L</span>
                </div>
            </div>
        </div>
    </section>

    {/*  Testimonials  */}
    {showTestimonials && (
        <section className="testimonials-section reveal-on-scroll" id="testimonials">
            <div className="container">

                {/* Quote image — 205×180 from assets */}
                <img
                    src={`/assets/testimonialsimg/Qotes.png`}
                    alt=""
                    width={205}
                    height={180}
                    className="testimonials-quote-img"
                    aria-hidden="true"
                />

                {/* Carousel wrapper — relative so arrows can be absolutely placed on sides */}
                <div className="testimonials-carousel-wrapper">

                    {/* LEFT arrow */}
                    <button className="t-arrow t-arrow--prev" id="tPrev" aria-label="Previous testimonial">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                    </button>

                    {/* Carousel track — padding lets shadows breathe on all sides */}
                    <div className="testimonials-carousel" id="testimonialsCarousel">

                        {/* Card 1 — Appreciate */}
                        <div className="testimonial-card">
                            <blockquote className="testimonial-text">
                                “Everyone was trying to teach people finance; Machinga showed us how to make them laugh first. We went from zero to 124K followers with a retention rate we didn't think was possible on social media. They didn't build a calendar; they built a content machine that runs itself.”
                            </blockquote>
                            <div className="testimonial-author">
                                <div className="testimonial-meta">
                                    <span className="testimonial-name">A. G.</span>
                                    <span className="testimonial-role">Co-founder & Head of Growth, FinTech Startup</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 — Contraband */}
                        <div className="testimonial-card">
                            <blockquote className="testimonial-text">
                                “How do you convey fragrance through a smartphone screen? Machinga's answer was 'Let it Stain'—a campaign that did the visual unthinkable to white sheets and reached over 80 million people in two weeks. Zero actors, zero traditional copy. Just pure curiosity loops.”
                            </blockquote>
                            <div className="testimonial-author">
                                <div className="testimonial-meta">
                                    <span className="testimonial-name">A. B.</span>
                                    <span className="testimonial-role">Founder, Luxury Fragrance Brand</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 — Aava */}
                        <div className="testimonial-card">
                            <blockquote className="testimonial-text">
                                “Competitors spent millions engineering temporary pH numbers to catch a trend. Machinga gave us two words: 'Born Alkaline.' It was a line so structurally true to our geography that no competitor could copy it without exposing their own chemical processes. Uncopyable brand positioning.”
                            </blockquote>
                            <div className="testimonial-author">
                                <div className="testimonial-meta">
                                    <span className="testimonial-name">B. M.</span>
                                    <span className="testimonial-role">Managing Director, Beverage Brand</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 — Hamleys */}
                        <div className="testimonial-card">
                            <blockquote className="testimonial-text">
                                “Valentine's Day is an anxiety event for Gen Z. Instead of pushing romantic cliches, Machinga told our customers to 'Skip the Awkward' with plush bears. It turned our stores into viral locations and drove a massive spike in organic foot traffic. We recommissioned it the very next year.”
                            </blockquote>
                            <div className="testimonial-author">
                                <div className="testimonial-meta">
                                    <span className="testimonial-name">M. S.</span>
                                    <span className="testimonial-role">CEO, Global Toy Retailer</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT arrow */}
                    <button className="t-arrow t-arrow--next" id="tNext" aria-label="Next testimonial">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    </button>

                </div>
            </div>
        </section>
    )}

    {/*  About Machinga & Beliefs  */}
    <section className="about-section reveal-on-scroll" id="about">
        <div className="container" style={{ paddingTop: "120px" }}>
            <span className="statement-label" style={{ display: 'block', marginBottom: '3rem' }}>ABOUT MACHINGA</span>
            
            <div className="about-story" style={{ marginBottom: "8rem", maxWidth: "1100px" }}>
                {(() => {
                    const paragraphs = [
                        "A farmer once held a meeting for the fruits in his garden. He needed one of them to handle something important.",
                        "The mango brought a deck. The jackfruit brought a methodology with its own acronym. The dragon fruit, uninvited as always, brought three case studies and a mood board. The avocado brought a proprietary framework for measuring creative impact on a scale of one to ten.",
                        "A tiny coconut-fruit rolled in. No slides. No acronyms. No framework. Just a twig it had bent into a toy.",
                        "The farmer hadn't laughed that hard in three days of pitches."
                    ];
                    
                    let globalWordIndex = 0;
                    
                    return paragraphs.map((para, pIndex) => {
                        const words = para.split(/\s+/);
                        const isLastPara = pIndex === paragraphs.length - 1;
                        
                        return (
                            <p 
                                key={pIndex} 
                                style={{ 
                                    fontSize: "clamp(1.8rem, 4.2vw, 3.5rem)", 
                                    lineHeight: "1.3", 
                                    fontWeight: isLastPara ? "800" : "700", 
                                    color: "#1a1a1a", 
                                    marginBottom: isLastPara ? "0" : "2.5rem",
                                    letterSpacing: "-0.02em"
                                }}
                            >
                                {words.map((word, wIndex) => {
                                    const index = globalWordIndex++;
                                    return (
                                        <span key={wIndex}>
                                            <span 
                                                className="fable-word" 
                                                data-index={index}
                                                style={{ 
                                                    opacity: 0.15, 
                                                    transition: "opacity 0.12s ease-out, color 0.12s ease-out",
                                                }}
                                            >
                                                {word}
                                            </span>
                                            {wIndex < words.length - 1 ? " " : ""}
                                        </span>
                                    );
                                })}
                            </p>
                        );
                    });
                })()}
            </div>
            
            <div className="about-coconut-wrapper" style={{ position: "relative", height: "112px", marginBottom: "1rem" }}>
                <img src={`/assets/coconut.png`} alt="Coconut" className="about-coconut-img" style={{ top: 0 }} />
            </div>
            
            <div className="about-text-grid" style={{ marginBottom: "8rem" }}>
                <div className="about-left-col">
                    <h2 className="name-title" style={{ margin: 0 }}>MACHINGA</h2>
                    <p className="pronunciation" style={{ marginTop: "0.5rem", marginBottom: "2rem" }}>/MUH - CHIN - GAH/</p>
                    <p className="definition" style={{ fontSize: "1rem", lineHeight: "1.6", color: "#666666", margin: 0 }}>
                        <sup style={{ color: "var(--green)", fontWeight: "bold", marginRight: "4px" }}>1</sup> 
                        A palm-sized coconut fruit used to make innovative handmade toys for kids of all ages. Crudely translated from Malayalam.
                    </p>
                </div>
                <div className="about-right-col">
                    <p className="explanation" style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)", lineHeight: "1.7", color: "#1a1a1a", fontWeight: 500, margin: 0 }}>
                        <sup style={{ color: "var(--green)", fontWeight: "bold", marginRight: "6px" }}>2</sup> 
                        An independent creative company. We work with brands the way long collaborators work. Slowly, with disagreement, and with a shared interest in the work being worth the time.
                    </p>
                </div>
            </div>

            <div id="beliefs" className="beliefs-subsection" style={{ marginTop: '8rem', paddingTop: '4rem', borderTop: '1px solid #eaeaea' }}>
                <span className="statement-label" style={{ display: 'block', marginBottom: '1.5rem' }}>BELIEFS</span>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 64px)', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1, margin: '0 0 4rem 0', letterSpacing: '-1px' }}>
                    <span className="sweep-reveal-text">Things we believe to be true.</span>
                </h2>

                <div className="beliefs-scroll-layout" style={{'display': 'flex', 'position': 'relative', 'marginTop': '3rem'}}>
                    {/*  Left Sticky Column  */}
                    <div className="beliefs-left"
                        style={{'width': '350px', 'position': 'sticky', 'top': '50vh', 'height': '60px', 'transform': 'translateY(-50%)', 'display': 'flex', 'alignItems': 'flex-start', 'gap': '12px', 'overflow': 'hidden', 'fontSize': '40px', 'fontWeight': '800', 'color': '#999999', 'textTransform': 'uppercase'}}>
                        <span style={{'height': '60px', 'lineHeight': '60px'}}>ON</span>
                        <div id="dynamic-belief-words"
                            style={{'display': 'flex', 'flexDirection': 'column', 'transition': 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)', 'marginTop': '0'}}>
                            <span style={{'height': '60px', 'lineHeight': '60px', 'color': '#1a1a1a'}}>Strategy</span>
                            <span style={{'height': '60px', 'lineHeight': '60px', 'color': '#1a1a1a'}}>Content</span>
                            <span style={{'height': '60px', 'lineHeight': '60px', 'color': '#1a1a1a'}}>Briefs</span>
                            <span style={{'height': '60px', 'lineHeight': '60px', 'color': '#1a1a1a'}}>Creative</span>
                            <span style={{'height': '60px', 'lineHeight': '60px', 'color': '#1a1a1a'}}>Attention</span>
                            <span style={{'height': '60px', 'lineHeight': '60px', 'color': '#1a1a1a'}}>Reality</span>
                        </div>
                    </div>

                    {/*  Right Scrolling Column  */}
                    <div className="beliefs-right" style={{'flex': '1'}}>
                        <div className="belief-scroll-item" data-index="0" data-tag="On Strategy"
                            style={{'padding': '3vh 0', 'opacity': '0.2', 'transition': 'opacity 0.5s ease'}}>
                            <h4 style={{'fontSize': '20px', 'fontWeight': '800', 'color': '#1a1a1a', 'marginBottom': '8px'}}>Strategy
                                isn't a phase you rush through.</h4>
                            <p style={{'fontSize': '14px', 'color': '#888888'}}>It's the reason everything else works.</p>
                        </div>
                        <div className="belief-scroll-item" data-index="1" data-tag="On Content"
                            style={{'padding': '3vh 0', 'opacity': '0.2', 'transition': 'opacity 0.5s ease'}}>
                            <h4 style={{'fontSize': '20px', 'fontWeight': '800', 'color': '#1a1a1a', 'marginBottom': '8px'}}>Content
                                should be an engine, not a slot machine.</h4>
                            <p style={{'fontSize': '14px', 'color': '#888888'}}>Systems beat one-offs. Every time.</p>
                        </div>
                        <div className="belief-scroll-item" data-index="2" data-tag="On Briefs"
                            style={{'padding': '3vh 0', 'opacity': '0.2', 'transition': 'opacity 0.5s ease'}}>
                            <h4 style={{'fontSize': '20px', 'fontWeight': '800', 'color': '#1a1a1a', 'marginBottom': '8px'}}>The brief is
                                rarely about what the brief says it's about.</h4>
                            <p style={{'fontSize': '14px', 'color': '#888888'}}>Dig until you hit the real question.</p>
                        </div>
                        <div className="belief-scroll-item" data-index="3" data-tag="On Creative"
                            style={{'padding': '3vh 0', 'opacity': '0.2', 'transition': 'opacity 0.5s ease'}}>
                            <h4 style={{'fontSize': '20px', 'fontWeight': '800', 'color': '#1a1a1a', 'marginBottom': '8px'}}>The best
                                creative comes from understanding, not guessing.</h4>
                            <p style={{'fontSize': '14px', 'color': '#888888'}}>Do the homework. Then do the fun part.</p>
                        </div>
                        <div className="belief-scroll-item" data-index="4" data-tag="On Attention"
                            style={{'padding': '3vh 0', 'opacity': '0.2', 'transition': 'opacity 0.5s ease'}}>
                            <h4 style={{'fontSize': '20px', 'fontWeight': '800', 'color': '#1a1a1a', 'marginBottom': '8px'}}>Compound
                                interest works for attention too.</h4>
                            <p style={{'fontSize': '14px', 'color': '#888888'}}>Show up consistently, or don't bother showing up.
                            </p>
                        </div>
                        <div className="belief-scroll-item" data-index="5" data-tag="On Reality"
                            style={{'padding': '3vh 0', 'opacity': '0.2', 'transition': 'opacity 0.5s ease'}}>
                            <h4 style={{'fontSize': '20px', 'fontWeight': '800', 'color': '#1a1a1a', 'marginBottom': '8px'}}>Virality
                                isn't luck.</h4>
                            <p style={{'fontSize': '14px', 'color': '#888888'}}>It's research dressed up as spontaneity.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    {/*  Contact  */}
    <section className="contact-section reveal-on-scroll" id="contact">
        <div className="container">
            <div className="contact-card">
                <div className="contact-info-side">
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 64px)', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.1, margin: '0 0 2rem 0', letterSpacing: '-1px' }}>
                        <span className="sweep-reveal-text" style={{ display: 'block' }}>Start the</span>
                        <span className="sweep-reveal-text" style={{ display: 'block', transitionDelay: '0.2s' }}>conversation.</span>
                    </h2>
                    <p className="prompt-text">Tell us what you're after. Get a quick read on your brief.</p>
                    <a href="mailto:hello@studiomachinga.com" className="email-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0FC823" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                            </path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        hello@studiomachinga.com
                    </a>
                </div>
                <div className="contact-form-side">
                    {!isFormSubmitted ? (
                        <form className="contact-form" id="contact-us-form" onSubmit={handleFormSubmit}>
                            <div className="form-field">
                                <input type="text" name="name" placeholder="Name" required />
                            </div>
                            <div className="form-field">
                                <input type="email" name="email" placeholder="Email" required />
                            </div>
                            <div className="form-field form-field--textarea">
                                <textarea name="message" placeholder="Brief / Message" rows={4} required></textarea>
                            </div>
                            <button type="submit" className="btn-gradient" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Let’s talk.'}
                            </button>
                        </form>
                    ) : (
                        <div id="contact-success-message" className="success-message" style={{ display: 'block' }}>
                            <h3>Thank you!</h3>
                            <p>Your message has been received. We'll be in touch soon.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>

    
    </main>
  );
}
