"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [isOverHowWeWork, setIsOverHowWeWork] = useState(false);
  const [darkBgColor, setDarkBgColor] = useState('rgba(29, 29, 31, 0.95)');
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Normalize pathname to strip trailing slashes
  const normalizedPath = pathname.replace(/\/$/, "");
  const isCaseStudy = normalizedPath === '/appreciate' || normalizedPath === '/hamleys' || normalizedPath === '/contraband' || normalizedPath === '/aava';
  const isHomepage = normalizedPath === "";

  // The header background is transparent if we have not scrolled past the hero threshold AND the menu is closed.
  // Also transparent when scrolling over the homepage 'How We Work' video section.
  const isTransparent = (!isScrolledPast && !isOpen) || (isOverHowWeWork && !isOpen);

  useEffect(() => {
    // Always reset states when pathname changes
    setIsScrolledPast(false);
    setIsOverDark(false);
    setIsOverHowWeWork(false);
    setIsHidden(false);

    let lastScroll = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleScroll = () => {
      const cur = Math.max(0, window.scrollY);
      
      if (isCaseStudy) {
        const threshold = window.innerHeight * 0.9;
        if (cur <= 10) {
          setIsScrolledPast(false);
        } else {
          setIsScrolledPast(cur > threshold);
        }
      } else if (isHomepage) {
        const threshold = window.innerHeight * 0.8;
        if (cur <= 10) {
          setIsScrolledPast(false);
        } else {
          setIsScrolledPast(cur > threshold);
        }
      } else {
        setIsScrolledPast(cur > 50);
      }

      // Hide / Show logic (site-wide)
      const threshold = isCaseStudy 
        ? window.innerHeight * 0.9 
        : (isHomepage ? window.innerHeight * 0.8 : 50);

      if (cur > threshold && cur > lastScroll) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScroll = cur;

      // Check if overlapping with the 'How We Work' video section
      const statementSec = document.getElementById('statement');
      if (statementSec) {
        const rect = statementSec.getBoundingClientRect();
        setIsOverHowWeWork(rect.top <= 80 && rect.bottom >= 0);
      } else {
        setIsOverHowWeWork(false);
      }

      // Check if the header currently overlaps with any dark section
      const sections = document.querySelectorAll('section, footer');
      let darkDetected = false;
      let detectedColor = 'rgba(29, 29, 31, 0.95)';

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i] as HTMLElement;
        const rect = sec.getBoundingClientRect();

        // Check if Y=40 (approx middle of header height) is within the section bounding box
        if (rect.top <= 40 && rect.bottom >= 40) {
          const computedStyle = window.getComputedStyle(sec);
          const bgColor = computedStyle.backgroundColor;

          if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
            continue;
          }

          // Parse RGB/RGBA values
          const rgbMatch = bgColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10);
            const g = parseInt(rgbMatch[2], 10);
            const b = parseInt(rgbMatch[3], 10);
            const a = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1;

            if (a === 0) {
              continue;
            }

            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            if (brightness < 120) {
              darkDetected = true;
              detectedColor = `rgba(${r}, ${g}, ${b}, 0.95)`;
            }
          }
          break;
        }
      }

      setIsOverDark(darkDetected);
      setDarkBgColor(detectedColor);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Staggered initial scroll checks to ensure we capture the scroll position after Next.js scroll restoration
    const t1 = setTimeout(handleScroll, 50);
    const t2 = setTimeout(handleScroll, 200);
    const t3 = setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, isCaseStudy, isHomepage]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .site-header.header-dark .menu-toggle span {
          background-color: #ffffff !important;
        }
        .site-header.header-dark .header-logo-img {
          filter: brightness(0) invert(1) !important;
        }
        .site-header.header-dark .desktop-nav {
          background: rgba(29, 29, 31, 0.94) !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 
                      0 4px 12px rgba(0, 0, 0, 0.2),
                      inset 0 1px 2px rgba(255, 255, 255, 0.1) !important;
        }
        .site-header.header-dark .desktop-nav a {
          color: #e3e3e3 !important;
        }
        .site-header.header-dark .desktop-nav a:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }
      `}} />
      <header 
        className={`site-header ${isTransparent ? "header-transparent" : ""} ${isOverDark ? "header-dark" : ""} ${isHidden ? "header-hidden" : ""}`}
        style={isTransparent ? {
          background: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          color: isOverDark ? '#ffffff' : '#000000'
        } : {
          background: isOverDark ? darkBgColor : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: isOverDark ? '#ffffff' : '#000000'
        }}
      >
      <Link href="/" className="logo" onClick={(e) => {
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}>
        <img
          src={`/assets/Machinga logo with text.png`}
          alt="Machinga"
          width={206}
          height={44}
          className="header-logo-img"
        />
      </Link>

      <button
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav 
        className={`desktop-nav ${isOpen ? "open" : ""}`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="/#work" onClick={() => setIsOpen(false)}>Work</Link>
        <Link href="/#statement" onClick={() => setIsOpen(false)}>How We Work</Link>
        <Link href="/#about" onClick={() => setIsOpen(false)}>About</Link>
        <Link href="/#contact" className="nav-contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
      </nav>
    </header>
    </>
  );
}
