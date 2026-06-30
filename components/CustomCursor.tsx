'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[101] h-2 w-2 rounded-full bg-[#CCFF00] pointer-events-none shadow-[0_0_14px_rgba(204,255,0,0.85)]"
        animate={{ x: mousePosition.x + 12, y: mousePosition.y + 12 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
      />
      <motion.div
        className="fixed left-0 top-0 z-[100] h-7 w-7 rounded-full border border-[#CCFF00]/70 bg-black/10 pointer-events-none shadow-[0_0_0_1px_rgba(0,0,0,0.45),0_0_18px_rgba(204,255,0,0.25)]"
        animate={{ x: mousePosition.x + 2, y: mousePosition.y + 2 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />
    </>
  );
}
