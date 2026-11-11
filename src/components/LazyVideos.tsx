"use client";

import { useEffect } from "react";

/**
 * Plays every <video data-autoplay> only while it is on (or near) the screen.
 *
 * A plain `autoPlay` attribute makes the browser download every film on the page
 * the moment it loads. These videos use preload="none" and a poster instead, so
 * nothing is fetched until the visitor scrolls close to them.
 */
export default function LazyVideos() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = new WeakSet<HTMLVideoElement>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (reduceMotion) return; // leave the poster up
            video.muted = true;
            video.play().catch(() => {});
          } else if (!video.paused) {
            video.pause();
          }
        });
      },
      { rootMargin: "300px 0px" }
    );

    const scan = () => {
      document.querySelectorAll<HTMLVideoElement>("video[data-autoplay]").forEach((video) => {
        if (seen.has(video)) return;
        seen.add(video);
        io.observe(video);
      });
    };

    scan();
    // Pages and carousels mount videos after navigation, so keep watching for new ones.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
