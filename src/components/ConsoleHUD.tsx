
"use client";

import React, { useState, useEffect } from 'react';

export const ConsoleHUD = () => {
  const [time, setTime] = useState('');
  const [threadId, setThreadId] = useState('');
  const [load, setLoad] = useState(0);

  useEffect(() => {
    setThreadId(Math.random().toString(16).slice(2, 8).toUpperCase());
    
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setLoad(Math.floor(Math.random() * 40) + 20);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Grids */}
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      
      {/* Decorative Loading Bars Everywhere */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary/5 overflow-hidden">
        <div className="h-full w-1/4 bg-primary/40 animate-bar-move blur-[1px]"></div>
      </div>

      <div className="absolute top-1/4 left-0 w-1/2 h-[1px] bg-primary/10">
        <div className="h-full w-1/3 bg-primary/60 animate-bar-move [animation-duration:10s]"></div>
      </div>
      
      {/* Corner Data Blocks */}
      <div className="absolute top-4 left-4 md:top-12 md:left-12 font-mono text-[7px] md:text-[9px] text-primary space-y-1 md:space-y-2 opacity-60">
        <div className="flex items-center gap-1 md:gap-2">
          <span className="w-1 md:h-1.5 md:w-1.5 h-1 bg-primary animate-pulse"></span>
          <span className="glow-text">NODE_88_ALPHA</span>
        </div>
        <div className="space-y-0.5 md:space-y-1 pl-2 md:pl-4 border-l border-primary/20">
          <div>LAT: 34.0522 N</div>
          <div>LON: 118.2437 W</div>
          <div className="text-[6px] md:text-[8px] text-primary/40">BUFFER_STREAM_0X03</div>
        </div>
      </div>

      <div className="absolute top-4 right-4 md:top-12 md:right-12 font-mono text-[7px] md:text-[9px] text-primary text-right space-y-1 md:space-y-2 opacity-60">
        <div className="glow-text uppercase">System Core Stable</div>
        <div className="flex flex-col items-end gap-1">
          <div className="w-20 md:w-32 h-1 bg-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/30" style={{ width: `${load}%` }}></div>
          </div>
          <span className="text-[6px] md:text-[8px]">CORE_TEMP: 42°C</span>
        </div>
      </div>

      {/* Side HUD Meters - Hidden on Mobile */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col gap-12">
        <div className="space-y-2">
            <div className="text-[8px] text-primary font-bold tracking-widest uppercase vertical-text glow-text">Sensors</div>
            <div className="flex flex-col gap-[2px]">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className={`h-1 w-3 ${i < load / 2 ? 'bg-primary' : 'bg-primary/10'}`}></div>
                ))}
            </div>
        </div>
        <div className="space-y-2">
            <div className="text-[8px] text-accent font-bold tracking-widest uppercase vertical-text glow-text">Adjudicate</div>
            <div className="flex flex-col gap-[2px]">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className={`h-1 w-3 ${i % 3 === 0 ? 'bg-accent' : 'bg-accent/10'}`}></div>
                ))}
            </div>
        </div>
      </div>

      {/* Floating Mini Readouts - Hidden on Mobile */}
      <div className="hidden xl:flex absolute right-6 top-1/3 space-y-8">
        <div className="flex flex-col items-end font-mono text-[7px] text-primary/40">
          <span>TX_RATE: 1.2 GB/S</span>
          <span>RX_RATE: 0.8 GB/S</span>
          <div className="w-16 h-[2px] bg-primary/20 mt-1"></div>
        </div>
      </div>

      {/* Bottom Data Bar */}
      <div className="absolute bottom-2 md:bottom-6 inset-x-4 md:inset-x-12 flex items-end justify-between border-b border-primary/20 pb-2 md:pb-4">
        <div className="flex items-center gap-4 md:gap-12">
            <div className="flex flex-col gap-0.5 md:gap-1">
                <span className="text-[6px] md:text-[8px] text-primary/40 uppercase tracking-widest">Hash</span>
                <span className="text-[10px] md:text-xs font-mono text-primary glow-text">0x{threadId || '------'}</span>
            </div>
            <div className="hidden sm:flex flex-col gap-1">
                <span className="text-[8px] text-primary/40 uppercase tracking-widest">Frequency</span>
                <span className="text-xs font-mono text-primary">5.88 GHZ</span>
            </div>
            <div className="flex flex-col gap-0.5 md:gap-1">
                <span className="text-[6px] md:text-[8px] text-accent uppercase tracking-widest">Auth</span>
                <span className="text-[10px] md:text-xs font-mono text-accent">ROOT_DIRECTOR</span>
            </div>
            {/* Tiny decoration bar - Hidden on small mobile */}
            <div className="hidden md:flex gap-[2px] pb-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`w-1 h-3 ${i < 6 ? 'bg-primary' : 'bg-primary/20'}`}></div>
              ))}
            </div>
        </div>
        <div className="flex flex-col items-end gap-0.5 md:gap-1">
            <span className="text-[6px] md:text-[8px] text-primary/40 uppercase tracking-widest">Internal Clock</span>
            <span className="text-xl md:text-3xl font-headline font-light tracking-tighter text-primary glow-text">{time || '--:--:--'}</span>
        </div>
      </div>
    </div>
  );
};
