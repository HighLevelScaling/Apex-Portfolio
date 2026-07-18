'use client';

import { track } from '@vercel/analytics';

export default function LeadAutomation() {
  return (
    <a
      href="#lead-capture"
      className="fixed bottom-5 right-5 z-40 hidden cursor-pointer border border-white/10 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-black shadow-2xl transition-colors hover:bg-[#CCFF00] md:inline-flex"
      onClick={() => track('lead_floating_cta_clicked', { source: 'floating_cta' })}
    >
      Start Project
    </a>
  );
}
