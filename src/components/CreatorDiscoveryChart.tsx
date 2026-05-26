"use client";

import { useEffect, useRef, useState } from 'react';

export default function CreatorDiscoveryChart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`cs-chart-section ${isActive ? 'active' : ''}`}
      style={{
        backgroundColor: "#1D1D1F", 
        color: "#ffffff",
        paddingTop: "6rem", 
        paddingBottom: "6rem",
        overflow: "hidden"
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .cs-chart-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }
        
        .cs-chart-inset {
          position: absolute;
          top: 8%;
          left: 12%;
          width: 42%;
          z-index: 10;
          pointer-events: none;
        }

        .cs-chart-inset h2 {
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: 1.2rem;
          color: #ffffff;
        }

        .cs-chart-inset p {
          font-size: 0.95rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.6);
        }

        .cs-chart-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Micro-animations for growth curves */
        .cs-chart-curve {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          transition: stroke-dashoffset 2.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .cs-chart-section.active .cs-chart-curve {
          stroke-dashoffset: 0;
        }

        /* Animate hired marker group */
        .cs-chart-marker-group {
          opacity: 0;
          transform: scale(0.6);
          transform-origin: 285px 372px;
          transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 2s,
                      transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 2s;
        }

        .cs-chart-section.active .cs-chart-marker-group {
          opacity: 1;
          transform: scale(1);
        }

        /* Animate face avatar circles */
        .cs-chart-avatar-group {
          opacity: 0;
          transform: scale(0.6);
          transform-origin: 670px 165px;
          transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 2.2s,
                      transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 2.2s;
        }

        .cs-chart-section.active .cs-chart-avatar-group {
          opacity: 1;
          transform: scale(1);
        }

        /* Animate coordinate lines and grids */
        .cs-chart-gridline {
          opacity: 0;
          transition: opacity 1s ease;
        }
        .cs-chart-section.active .cs-chart-gridline {
          opacity: 1;
        }

        .cs-chart-axis-label {
          opacity: 0;
          transition: opacity 0.8s ease 0.5s;
        }
        .cs-chart-section.active .cs-chart-axis-label {
          opacity: 1;
        }

        @media (max-width: 767px) {
          .cs-chart-inset {
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            margin-bottom: 2.5rem;
            pointer-events: auto;
            text-align: left;
            padding: 0 1.5rem;
          }
          .cs-chart-inset h2 {
            font-size: 1.8rem;
          }
          .cs-chart-svg {
            padding: 0 0.5rem;
          }
        }
      `}} />

      <div className="cs-container">
        {/* Label */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="cs-section-label" style={{ color: "rgba(255,255,255,0.4)" }}>04 — Creator Discovery</span>
        </div>

        {/* Chart Wrapper */}
        <div className="cs-chart-container">
          {/* Inset Text inside chart's negative space */}
          <div className="cs-chart-inset">
            <h2>We find them before the market prices them in.</h2>
            <p>Fees for both had more than tripled in 12 months since we hired them.*</p>
          </div>

          {/* SVG Chart */}
          <svg className="cs-chart-svg" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Drop shadow filters for neon laser lines */}
              <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Circular clip-paths for faces */}
              <clipPath id="circle-clip-nitesh">
                <circle cx="670" cy="50" r="18" />
              </clipPath>
              <clipPath id="circle-clip-vir">
                <circle cx="670" cy="280" r="18" />
              </clipPath>
            </defs>

            {/* Gridlines */}
            {/* Horizontal Grid */}
            <line className="cs-chart-gridline" x1="60" y1="360" x2="670" y2="360" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line className="cs-chart-gridline" x1="60" y1="280" x2="670" y2="280" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line className="cs-chart-gridline" x1="60" y1="190" x2="670" y2="190" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line className="cs-chart-gridline" x1="60" y1="100" x2="670" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line className="cs-chart-gridline" x1="60" y1="50" x2="670" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Vertical Grid */}
            <line className="cs-chart-gridline" x1="230" y1="50" x2="230" y2="400" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line className="cs-chart-gridline" x1="570" y1="50" x2="570" y2="400" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

            {/* Launch vertical dashed marker line */}
            <line className="cs-chart-gridline" x1="400" y1="50" x2="400" y2="400" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="5 5" />

            {/* Coordinates Axes */}
            <line x1="60" y1="400" x2="670" y2="400" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="670" y1="50" x2="670" y2="400" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

            {/* Y Axis Labels */}
            <text className="cs-chart-axis-label" x="50" y="404" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="end" fontFamily="Inter, sans-serif">0</text>
            <text className="cs-chart-axis-label" x="50" y="364" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="end" fontFamily="Inter, sans-serif">100K</text>
            <text className="cs-chart-axis-label" x="50" y="284" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="end" fontFamily="Inter, sans-serif">200K</text>
            <text className="cs-chart-axis-label" x="50" y="194" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="end" fontFamily="Inter, sans-serif">300K</text>
            <text className="cs-chart-axis-label" x="50" y="104" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="end" fontFamily="Inter, sans-serif">400K</text>
            <text className="cs-chart-axis-label" x="50" y="54" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="end" fontFamily="Inter, sans-serif">500K+</text>

            {/* X Axis Labels */}
            <text className="cs-chart-axis-label" x="60" y="422" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">-12 Months</text>
            <text className="cs-chart-axis-label" x="230" y="422" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">-6 Months</text>
            <text className="cs-chart-axis-label" x="400" y="422" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">Launch</text>
            <text className="cs-chart-axis-label" x="570" y="422" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">+6 Months</text>
            <text className="cs-chart-axis-label" x="670" y="422" fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="middle" fontFamily="Inter, sans-serif">+12 Months</text>

            {/* Exponential Growth Curves */}
            {/* Curve 1: Nitesh Shetty (88K Hired, 500K at +12M) */}
            <path 
              className="cs-chart-curve" 
              d="M 60,392 C 160,390 220,380 300,361 C 380,335 480,200 670,50" 
              fill="none" 
              stroke="#00FF66" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
              filter="url(#glow-green)"
            />

            {/* Curve 2: Vir Saini (40K Hired, 200K at +12M) */}
            <path 
              className="cs-chart-curve" 
              d="M 60,396 C 160,395 250,390 350,384 C 420,378 520,350 670,280" 
              fill="none" 
              stroke="#00E5FF" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
              filter="url(#glow-cyan)"
            />

            {/* Face Avatars Group on the right ends of the lines */}
            <g className="cs-chart-avatar-group">
              {/* Nitesh Shetty circular headshot */}
              <image 
                href="/assets/Appreciate case studies assets/nitesh_avatar.png"
                x="652" 
                y="32" 
                width="36" 
                height="36" 
                clipPath="url(#circle-clip-nitesh)"
              />
              <circle cx="670" cy="50" r="18" fill="none" stroke="#00FF66" strokeWidth="2.5" />
              <text x="696" y="54" fill="rgba(255,255,255,0.85)" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">Nitesh Shetty</text>

              {/* Vir Saini circular headshot */}
              <image 
                href="/assets/Appreciate case studies assets/vir_avatar.png"
                x="652" 
                y="262" 
                width="36" 
                height="36" 
                clipPath="url(#circle-clip-vir)"
              />
              <circle cx="670" cy="280" r="18" fill="none" stroke="#00E5FF" strokeWidth="2.5" />
              <text x="696" y="284" fill="rgba(255,255,255,0.85)" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">Vir Saini</text>
            </g>

            {/* Hired Tooltip/Badge & Markers Group */}
            <g className="cs-chart-marker-group">
              {/* Single "WE HIRED HERE" Badge */}
              <rect x="215" y="280" width="140" height="28" rx="6" fill="#1D1D1F" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <text x="285" y="297" fill="#ffffff" fontSize="10" fontWeight="700" letterSpacing="0.5" textAnchor="middle" fontFamily="Inter, sans-serif">WE HIRED HERE</text>

              {/* Dotted attribution lines coming from the badge bottom center */}
              <line x1="285" y1="308" x2="300" y2="361" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="285" y1="308" x2="350" y2="384" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="3 3" />

              {/* Nitesh Hired Marker & Follower Count */}
              <circle cx="300" cy="361" r="6" fill="#00FF66" stroke="#ffffff" strokeWidth="2" />
              <text x="286" y="364" fill="#00FF66" fontSize="10" fontWeight="700" textAnchor="end" fontFamily="Inter, sans-serif">88K</text>

              {/* Vir Hired Marker & Follower Count */}
              <circle cx="350" cy="384" r="6" fill="#00E5FF" stroke="#ffffff" strokeWidth="2" />
              <text x="336" y="387" fill="#00E5FF" fontSize="10" fontWeight="700" textAnchor="end" fontFamily="Inter, sans-serif">40K</text>
            </g>
          </svg>
        </div>

        {/* Concept text description below the chart */}
        <div style={{ maxWidth: "800px", margin: "4rem auto 0 auto", padding: "0 1.5rem" }}>
          <p className="cs-section-text" style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginBottom: "1.5rem", lineHeight: "1.6" }}>
            Across all three workflows, the most structurally significant thing we built is a methodology for identifying creators before the market prices them in.
          </p>
          <p className="cs-section-text" style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
            The Nitesh and Vir collaborations both happened at a point when those creators were significantly less expensive than they became in the months that followed. In both cases, fees had more than tripled by the time that window closed.
          </p>
          <p className="cs-section-text" style={{ color: "rgba(255,255,255,0.7)", marginBottom: "3rem", lineHeight: "1.6" }}>
            The economics of early discovery compound: not just in money saved, but in relationships built before the creator has ten agencies in their inbox.
          </p>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", fontStyle: "italic", margin: "0" }}>
              *The full methodology is not for publishing. The outcomes are.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
