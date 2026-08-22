"use client";

import { useEffect, useRef } from "react";

/**
 * A warm pool of lamp-light that lazily trails the cursor.
 * Purely decorative; hidden from AT and disabled for reduced motion / touch.
 */
export function LampGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let tx = window.innerWidth * 0.3;
    let ty = window.innerHeight * 0.2;
    let x = tx;
    let y = ty;

    const onMove = (e: PointerEvent) => {
      // light sits above the pointer, like a desk lamp overhead
      tx = e.clientX;
      ty = Math.max(40, e.clientY - 120);
      if (!raf) loop();
    };

    const loop = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };

    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="lamp-glow" aria-hidden="true" />;
}
