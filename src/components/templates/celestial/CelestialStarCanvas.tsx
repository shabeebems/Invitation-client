"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  speed: number;
}

export default function CelestialStarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000, isHovering: false };

    // Palette: Champagne gold, starlight white, astral cyan
    const colors = ["#f3e3b6", "#ffffff", "#e0e7ff", "#fef08a", "#bae6fd"];

    // Initialize stars
    const starCount = Math.min(Math.floor((width * height) / 9000), 160);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: 0.015 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Meteors
    const meteors: Meteor[] = [];
    function spawnMeteor() {
      if (meteors.length >= 2) return;
      const startX = Math.random() * width * 0.8;
      const startY = Math.random() * height * 0.3;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3;
      const speed = 7 + Math.random() * 6;
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 80 + Math.random() * 60,
        alpha: 1,
        speed,
      });
    }

    let meteorTimer = setInterval(spawnMeteor, 4500);

    function onResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovering = true;
    }

    function onMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isHovering = false;
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.isHovering = true;
      }
    }

    function onTouchEnd() {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isHovering = false;
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw Constellation Mesh Connections
      const maxConnectDist = 85;
      for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i];

        // Connection to mouse cursor
        if (mouse.isHovering) {
          const dxMouse = mouse.x - s1.x;
          const dyMouse = mouse.y - s1.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 130) {
            const alpha = (1 - distMouse / 130) * 0.45;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(243, 227, 182, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Gentle gravity pull toward cursor
            s1.x += dxMouse * 0.008;
            s1.y += dyMouse * 0.008;
          }
        }

        // Connection between adjacent stars
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(220, 200, 150, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Update position
        s.x += s.vx;
        s.y += s.vy;

        // Wrap around borders
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Twinkle effect
        s.twinklePhase += s.twinkleSpeed;
        const currentAlpha = Math.max(0.15, Math.min(1, s.alpha + Math.sin(s.twinklePhase) * 0.35));

        // Draw star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Subtle glow for brighter stars
        if (s.radius > 1.4) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(243, 227, 182, 0.15)";
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }

      // Update and draw meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= 0.015;

        if (m.alpha <= 0 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
          continue;
        }

        const gradient = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - (m.vx / m.speed) * m.length,
          m.y - (m.vy / m.speed) * m.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        gradient.addColorStop(0.3, `rgba(243, 227, 182, ${m.alpha * 0.7})`);
        gradient.addColorStop(1, "rgba(243, 227, 182, 0)");

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x - (m.vx / m.speed) * m.length,
          m.y - (m.vy / m.speed) * m.length
        );
        ctx.stroke();

        // Star head glow
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(meteorTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 h-full w-full"
      style={{ opacity: 0.88 }}
    />
  );
}
