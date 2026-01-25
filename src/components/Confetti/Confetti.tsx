'use client';

import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number; // Duration in milliseconds (default 3000)
  onComplete?: () => void;
}

export const Confetti: React.FC<ConfettiProps> = ({ 
  active, 
  duration = 3000,
  onComplete 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const streamingRef = useRef(false);
  const waveAngleRef = useRef(0);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = React.useState(true);
  
  // Store latest callback in ref to avoid dependency issues
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!active) {
      return;
    }

    startConfetti();

    // Auto-stop generating new confetti after duration, but let existing ones fall
    if (duration > 0) {
      stopTimeoutRef.current = setTimeout(() => {
        stopConfetti(); // Stop generating new particles
        // Wait for particles to fall off screen before completing
        cleanupTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }, 1500); // Give particles time to fall off screen
      }, duration);
    }

    return () => {
      // Only clear timeouts on unmount
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
      }
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active, duration]); // Include active and duration as deps

  const stopConfetti = () => {
    streamingRef.current = false;
  };

  const startConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clear any existing particles to ensure fresh start
    particlesRef.current = [];
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) return;

    const maxParticleCount = 120; // Slightly reduced for faster effect
    const colors = [
      '#6366f1', // indigo
      '#8b5cf6', // violet
      '#ec4899', // pink
      '#f59e0b', // amber
      '#10b981', // emerald
      '#3b82f6', // blue
      '#f97316', // orange
      '#a855f7', // purple
    ];

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < maxParticleCount; i++) {
      particlesRef.current.push(resetParticle({}, width, height, colors));
    }

    streamingRef.current = true;

    const runAnimation = () => {
      if (!canvas || !context) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      if (particlesRef.current.length === 0) {
        animationFrameRef.current = null;
        return;
      }

      updateParticles(width, height, colors);
      drawParticles(context);
      animationFrameRef.current = requestAnimationFrame(runAnimation);
    };

    runAnimation();
  };

  const resetParticle = (particle: any, width: number, height: number, colors: string[]) => {
    particle.color = colors[Math.floor(Math.random() * colors.length)];
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = 0;
    return particle;
  };

  const updateParticles = (width: number, height: number, colors: string[]) => {
    const particleSpeed = 2;
    waveAngleRef.current += 0.01;

    for (let i = 0; i < particlesRef.current.length; i++) {
      const particle = particlesRef.current[i];
      
      // Always move particles down
      particle.tiltAngle += particle.tiltAngleIncrement;
      particle.x += Math.sin(waveAngleRef.current);
      particle.y += (Math.cos(waveAngleRef.current) + particle.diameter + particleSpeed) * 0.5;
      particle.tilt = Math.sin(particle.tiltAngle) * 15;

      // Remove particles that are off screen
      if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
        if (streamingRef.current && particlesRef.current.length <= 120) {
          // Only reset particles if we're still streaming (generating new ones)
          resetParticle(particle, width, height, colors);
        } else {
          // Otherwise, remove the particle (let it fall off)
          particlesRef.current.splice(i, 1);
          i--;
        }
      }
    }
  };

  const drawParticles = (context: CanvasRenderingContext2D) => {
    for (let i = 0; i < particlesRef.current.length; i++) {
      const particle = particlesRef.current[i];
      context.beginPath();
      context.lineWidth = particle.diameter;
      context.strokeStyle = particle.color;
      const x = particle.x + particle.tilt;
      context.moveTo(x + particle.diameter / 2, particle.y);
      context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
      context.stroke();
    }
  };

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};
