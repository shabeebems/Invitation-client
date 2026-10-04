"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  alpha: number;
  color: string;
  type: "petal" | "leaf";
}

export default function BotanicalPetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };

    const colors = [
      "rgba(255, 252, 245, 0.85)", // White Jasmine Petal
      "rgba(247, 237, 222, 0.78)", // Warm Champagne Petal
      "rgba(235, 218, 205, 0.72)", // Blush Petal
      "rgba(148, 163, 110, 0.65)", // Delicate Olive Leaf
    ];

    const petalCount = Math.min(Math.floor((width * height) / 18000), 45);
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      const isLeaf = Math.random() < 0.25;
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 0.4 + Math.random() * 0.6,
        size: isLeaf ? 10 + Math.random() * 8 : 12 + Math.random() * 10,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: 0.01 + Math.random() * 0.02,
        rotSpeedY: 0.015 + Math.random() * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
        alpha: 0.6 + Math.random() * 0.35,
        color: isLeaf ? colors[3] : colors[Math.floor(Math.random() * 3)],
        type: isLeaf ? "leaf" : "petal",
      });
    }

    function onResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function onMouseMove(e: MouseEvent) {
      mouse.vx = e.clientX - mouse.lastX;
      mouse.vy = e.clientY - mouse.lastY;
      mouse.lastX = mouse.x = e.clientX;
      mouse.lastY = mouse.y = e.clientY;
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.vx = touch.clientX - mouse.lastX;
        mouse.vy = touch.clientY - mouse.lastY;
        mouse.lastX = mouse.x = touch.clientX;
        mouse.lastY = mouse.y = touch.clientY;
      }
    }

    function onTouchEnd() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    let windTime = 0;

    function render() {
      if (!ctx) return;
      windTime += 0.008;
      ctx.clearRect(0, 0, width, height);

      const ambientWind = Math.sin(windTime) * 0.35;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Natural sway physics
        p.x += p.vx + ambientWind + Math.sin(p.rotY) * 0.3;
        p.y += p.vy;

        p.rotX += p.rotSpeedX;
        p.rotY += p.rotSpeedY;
        p.rotZ += p.rotSpeedZ;

        // Interactive cursor breeze reaction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (1 - dist / 120) * 2.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
          p.rotSpeedZ += (Math.random() - 0.5) * 0.05;
        }

        // Wrap around bottom
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Render 3D simulated petal shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotZ);
        ctx.scale(Math.cos(p.rotX), Math.sin(p.rotY));

        ctx.fillStyle = p.color;
        ctx.beginPath();

        if (p.type === "leaf") {
          // Pointed olive leaf
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.45, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size * 0.45, 0, 0, -p.size);
        } else {
          // Soft curved flower petal
          ctx.moveTo(0, -p.size * 0.8);
          ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.6, p.size * 0.8, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.7, -p.size * 0.6, 0, -p.size * 0.8);
        }

        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.95 }}
    />
  );
}
