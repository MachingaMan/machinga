"use client";

import { useRef, useState, useEffect } from 'react';

export default function InspectPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [frameRate, setFrameRate] = useState(24);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(err => console.log(err));
      setIsPlaying(true);
    }
  };

  const stepFrame = (direction: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
    const frameTime = 1 / frameRate;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + direction * frameTime));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = parseFloat(e.target.value);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        handlePlayPause();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepFrame(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepFrame(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, frameRate]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0c0c0e',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <header style={{ marginBottom: '2rem', borderBottom: '1px solid #222', paddingBottom: '1rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>Machinga Video Timeline Inspector</h1>
          <p style={{ color: '#888', margin: '0.5rem 0 0 0' }}>
            Use this tool to scrub through <code>Machinga_Compact_10s_Landscape_4K.mp4</code> and find the exact timestamps for state loops.
          </p>
        </header>

        <div style={{
          position: 'relative',
          backgroundColor: '#000',
          borderRadius: '12px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          marginBottom: '2rem'
        }}>
          <video
            ref={videoRef}
            src="/assets/Machinga_Compact_10s_Landscape_4K.mp4"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            playsInline
            muted preload="metadata" />
        </div>

        {/* Scrubber and Timing controls */}
        <div style={{
          backgroundColor: '#141417',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #222',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={handlePlayPause}
                style={{
                  backgroundColor: '#0FC823',
                  color: '#000',
                  border: 'none',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '6px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? 'Pause [Space]' : 'Play [Space]'}
              </button>
              <button onClick={() => stepFrame(-1)} style={{ backgroundColor: '#222', color: '#fff', border: '1px solid #44', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
                -1 Frame [←]
              </button>
              <button onClick={() => stepFrame(1)} style={{ backgroundColor: '#222', color: '#fff', border: '1px solid #44', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
                +1 Frame [→]
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <span style={{ color: '#888', fontSize: '0.8rem', display: 'block' }}>Current Time</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace', color: '#0FC823' }}>
                  {currentTime.toFixed(4)}s
                </span>
              </div>
              <div>
                <span style={{ color: '#888', fontSize: '0.8rem', display: 'block' }}>Total Duration</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                  {duration.toFixed(4)}s
                </span>
              </div>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={duration || 10}
            step={0.001}
            value={currentTime}
            onChange={handleSliderChange}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              accentColor: '#0FC823',
              cursor: 'pointer'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            <span>0.0000s</span>
            <span>{(duration * 0.25).toFixed(4)}s</span>
            <span>{(duration * 0.5).toFixed(4)}s</span>
            <span>{(duration * 0.75).toFixed(4)}s</span>
            <span>{duration.toFixed(4)}s</span>
          </div>
        </div>

        {/* Timestamps logging panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
          <div style={{
            backgroundColor: '#141417',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #222'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', borderBottom: '1px solid #222', paddingBottom: '0.5rem' }}>State Reference</h3>
            <p style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.5' }}>
              Identify the timestamps for:
            </p>
            <ol style={{ fontSize: '0.9rem', color: '#ccc', paddingLeft: '1.2rem', lineHeight: '1.8' }}>
              <li><strong>Think Stage</strong>: The pause point or loop window where "Think" text is highlighted.</li>
              <li><strong>Make Stage</strong>: The pause point or loop window where "Make" text is highlighted.</li>
              <li><strong>Run Stage</strong>: The pause point or loop window where "Run" text is highlighted.</li>
              <li><strong>Think Make Run Stage</strong>: The final composite state before exiting.</li>
            </ol>
          </div>

          <div style={{
            backgroundColor: '#141417',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #222'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', borderBottom: '1px solid #222', paddingBottom: '0.5rem' }}>Suggested Timestamps Panel</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div>
                <button
                  onClick={() => navigator.clipboard.writeText(currentTime.toFixed(4))}
                  style={{
                    float: 'right',
                    backgroundColor: '#222',
                    color: '#fff',
                    border: '1px solid #444',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Copy Time
                </button>
                <strong style={{ display: 'block', color: '#0FC823' }}>Active Time:</strong>
                <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{currentTime.toFixed(4)}s</span>
              </div>

              <div style={{ borderTop: '1px solid #222', paddingTop: '0.8rem', color: '#aaa', fontSize: '0.9rem' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Directions for finding timestamps:</strong></p>
                <ol style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <li>Scrub until "Think" is fully visible and static. Note down the timestamp.</li>
                  <li>Scrub until "Make" is fully visible and static. Note down the timestamp.</li>
                  <li>Scrub until "Run" is fully visible and static. Note down the timestamp.</li>
                  <li>Scrub until "Think · Make · Run" are all fully visible and static.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
