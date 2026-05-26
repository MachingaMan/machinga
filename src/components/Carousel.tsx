"use client";

import Link from 'next/link';
import { useState } from 'react';

const projects = [
  { id: 'appreciate', title: 'Appreciate', subtext: 'How a fintech compounds interest', img: '/assets/APPRECIATE1.png', video: '/assets/Appreciate.MP4' },
  { id: 'aava', title: 'Aava', subtext: 'How two words made a 20-year-old water brand uncopyable', img: '/assets/AAVA3.png', video: '/assets/aava.mp4' },
  { id: 'contraband', title: 'Contraband', subtext: 'How a stain launched a luxury fragrance to 88 million people', img: '/assets/CONTRABAND2.png', video: '/assets/Contraband.MP4' },
  { id: 'hamleys', title: 'Hamleys', subtext: "How a 250-year-old toy store helped Gen Z defuse a time bomb on Valentine's Day", img: '/assets/HAMLEYS4.png', video: '/assets/hamleys.mp4' },
];

export default function Carousel({ currentProject }: { currentProject: string }) {
  const displayProjects = projects.filter(p => p.id !== currentProject);
  
  // State to track active centered card (0, 1, or 2 of the filtered displayProjects)
  const [activeIndex, setActiveIndex] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    if (index !== activeIndex) {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + 3) % 3);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % 3);
  };

  return (
    <section className="cs-carousel-section" style={{ padding: '6rem 0 10rem', backgroundColor: '#ffffff', overflow: 'hidden', position: 'relative' }}>
      <div className="cs-container" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span style={{ 
          color: 'var(--green)', 
          fontSize: '12px', 
          fontWeight: '700', 
          textTransform: 'uppercase', 
          letterSpacing: '2px', 
          display: 'block', 
          marginBottom: '0rem' 
        }}>
          Explore more case studies
        </span>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '420px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Navigation Buttons */}
        <button 
          onClick={handlePrev}
          className="carousel-nav-btn carousel-prev"
          style={{
            position: 'absolute',
            left: 'max(2rem, calc(50vw - 640px))',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid #eaeaea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            zIndex: 10,
            transition: 'all 0.3s ease',
            fontSize: '18px',
            color: '#555555'
          }}
          aria-label="Previous Project"
        >
          ←
        </button>

        <button 
          onClick={handleNext}
          className="carousel-nav-btn carousel-next"
          style={{
            position: 'absolute',
            right: 'max(2rem, calc(50vw - 640px))',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1px solid #eaeaea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            zIndex: 10,
            transition: 'all 0.3s ease',
            fontSize: '18px',
            color: '#555555'
          }}
          aria-label="Next Project"
        >
          →
        </button>

        {/* Carousel Track Container */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', height: '100%', overflow: 'visible' }}>
          {displayProjects.map((p, index) => {
            // Compute relative offset: -1 (left), 0 (center), or 1 (right)
            let diff = index - activeIndex;
            if (diff === 2) diff = -1;
            if (diff === -2) diff = 1;

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            const isHovered = hoveredIndex === index;

            // Positioning & Styling based on relative index
            let transformStr = '';
            let opacityVal = 0.35;
            let zIndexVal = 2;
            let filterStr = 'grayscale(0.8) blur(0.5px)';

            if (isCenter) {
              transformStr = 'translate(-50%, -50%) translate3d(0, 0, 0) scale(1)';
              opacityVal = 1;
              zIndexVal = 5;
              filterStr = 'none';
            } else if (isLeft) {
              const translateVal = isHovered ? 'calc(-1 * min(33vw, 400px))' : 'calc(-1 * min(35vw, 420px))';
              const scaleVal = isHovered ? 0.88 : 0.84;
              transformStr = `translate(-50%, -50%) translate3d(${translateVal}, 0, 0) scale(${scaleVal})`;
              opacityVal = isHovered ? 0.75 : 0.35;
              filterStr = isHovered ? 'grayscale(0.4)' : 'grayscale(0.8) blur(0.5px)';
              zIndexVal = 3;
            } else if (isRight) {
              const translateVal = isHovered ? 'calc(1 * min(33vw, 400px))' : 'calc(1 * min(35vw, 420px))';
              const scaleVal = isHovered ? 0.88 : 0.84;
              transformStr = `translate(-50%, -50%) translate3d(${translateVal}, 0, 0) scale(${scaleVal})`;
              opacityVal = isHovered ? 0.75 : 0.35;
              filterStr = isHovered ? 'grayscale(0.4)' : 'grayscale(0.8) blur(0.5px)';
              zIndexVal = 3;
            }

            return (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'min(76vw, 780px)',
                  height: '354px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  transform: transformStr,
                  opacity: opacityVal,
                  zIndex: zIndexVal,
                  filter: filterStr,
                  transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.25, 1, 0.3, 1), filter 0.65s cubic-bezier(0.25, 1, 0.3, 1)',
                  cursor: isCenter ? 'default' : 'pointer',
                  boxShadow: isCenter ? '0 30px 60px rgba(0,0,0,0.18)' : '0 10px 25px rgba(0,0,0,0.06)',
                  backgroundColor: '#f4f4f4'
                }}
                onClick={(e) => handleCardClick(index, e)}
                onMouseEnter={() => !isCenter && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Video */}
                <video 
                  src={p.video}
                  poster={p.img}
                  preload="metadata"
                  loop 
                  muted 
                  playsInline 
                  autoPlay
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    display: 'block',
                    transition: 'transform 0.8s ease',
                    transform: isCenter ? 'scale(1)' : 'scale(1.05)'
                  }}
                />

                {/* Glass/Visual Dark Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: isCenter 
                    ? 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)' 
                    : 'rgba(0,0,0,0.4)',
                  transition: 'background 0.65s ease',
                  zIndex: 1
                }} />

                {/* Card Info Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '55%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  textAlign: 'center',
                  pointerEvents: 'none',
                  zIndex: 2,
                  padding: '0 2.5rem',
                  boxSizing: 'border-box'
                }}>
                  <h3 className="carousel-glass-text" style={{ 
                    margin: 0, 
                    fontSize: 'clamp(2rem, 5vw, 3.8rem)', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: '2px', 
                    color: isCenter ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.4)',
                    textShadow: isCenter ? '0 10px 30px rgba(0, 0, 0, 0.5)' : '0 4px 10px rgba(0, 0, 0, 0.3)',
                    transition: 'color 0.65s ease, opacity 0.65s ease',
                    opacity: isCenter ? 1 : 0.8
                  }}>
                    {p.title}
                  </h3>
                  
                  <p className="carousel-subtext" style={{ 
                    margin: '0.6rem 0 0 0', 
                    fontSize: 'clamp(0.85rem, 1.3vw, 1.1rem)', 
                    fontWeight: 400, 
                    color: 'rgba(255, 255, 255, 0.9)',
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                    transition: 'all 0.65s cubic-bezier(0.25, 1, 0.3, 1)',
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? 'translateY(0)' : 'translateY(12px)'
                  }}>
                    {p.subtext}
                  </p>
                </div>

                {/* Clickable Area for Center Card Only */}
                {isCenter && (
                  <Link 
                    href={`/${p.id}`} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3 }}
                    aria-label={`Go to ${p.title} case study`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
