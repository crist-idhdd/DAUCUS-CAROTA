"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Activity, Terminal } from 'lucide-react';

interface AnalysisOverlayProps {
  onComplete: () => void;
}

const FAKE_MESSAGES = [
  "Initializing aesthetic telemetry...",
  "Loading neural classification matrix...",
  "Scanning chromatic variance indices...",
  "Evaluating emotional resonance patterns...",
  "Cross-referencing historical art markers...",
  "Detecting algorithmic integrity deviations...",
  "Synthesizing aesthetic compliance metrics...",
  "Performing state directive audit...",
  "Finalizing adjudication sequence..."
];

export const AnalysisOverlay = ({ onComplete }: AnalysisOverlayProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [threadId, setThreadId] = useState<number | null>(null);
  const [durations, setDurations] = useState<number[]>([]);

  useEffect(() => {
    // Generate values only on client after mount to prevent hydration errors
    setThreadId(Math.floor(Math.random() * 99999));
    setDurations(Array.from({ length: 40 }, () => 2 + Math.random() * 3));

    if (currentIndex < FAKE_MESSAGES.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 500); 
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4">
      {/* Background decorative bars for analysis */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-primary h-[1px] w-full animate-bar-move"
            style={{ 
              top: `${i * 2.5}%`, 
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${durations[i] || 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-6 md:gap-12 z-10">
        <div className="flex items-end justify-between border-b-2 border-primary/30 pb-4 md:pb-6 relative">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative">
              <Loader2 className="w-8 h-8 md:w-12 md:h-12 text-primary animate-spin" />
              <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse"></div>
            </div>
            <div className="space-y-0 md:space-y-1">
              <h2 className="text-2xl md:text-4xl font-headline font-black text-primary tracking-tighter uppercase glow-text">Evaluating</h2>
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-primary/40" />
                <p className="text-[8px] md:text-[10px] font-mono text-primary/40 uppercase tracking-[0.2em] md:tracking-[0.5em]">Compliance_Check</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-primary font-mono text-base md:text-xl glow-text">
              {Math.round((currentIndex / FAKE_MESSAGES.length) * 100)}%
            </div>
            <div className="flex gap-[1px] mt-1">
               {Array.from({ length: 10 }).map((_, i) => (
                 <div key={i} className={`w-1 h-2 md:h-3 ${i < (currentIndex / FAKE_MESSAGES.length) * 10 ? 'bg-primary shadow-[0_0_5px_rgba(0,242,255,0.8)]' : 'bg-primary/10'}`}></div>
               ))}
            </div>
          </div>
        </div>

        <div className="h-64 md:h-80 glow-panel hud-bracket p-4 md:p-8 font-mono text-[9px] md:text-xs flex flex-col gap-2 md:gap-3 overflow-hidden shadow-[0_0_80px_rgba(0,242,255,0.15)] bg-black/40">
          <div className="flex justify-between items-center mb-2 border-b border-primary/10 pb-2">
             <span className="text-[7px] md:text-[8px] text-primary/30 uppercase flex items-center gap-2">
               <Activity className="w-3 h-3" /> System_Logs
             </span>
             <span className="text-[7px] md:text-[8px] text-primary/30">Thread: {threadId || '---'}</span>
          </div>
          
          <div className="flex-1 space-y-2 overflow-hidden">
            {FAKE_MESSAGES.slice(0, currentIndex + 1).map((msg, idx) => (
              <div key={idx} className={`flex gap-3 md:gap-6 items-start transition-all duration-300 ${idx === currentIndex ? 'text-primary scale-105 origin-left' : 'text-primary/30'}`}>
                <span className="opacity-40 font-bold hidden sm:inline">[{new Date().toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 })}]</span>
                <span className={`${idx === currentIndex ? 'glow-text animate-pulse' : ''} flex items-center gap-2`}>
                  {idx === currentIndex ? '>> ' : '   '}{msg}
                  {idx === currentIndex && <span className="w-2 h-4 bg-primary animate-flicker shadow-[0_0_10px_rgba(0,242,255,1)]"></span>}
                </span>
              </div>
            ))}
          </div>
          
          {/* Dynamic "loading" indicators inside the console */}
          <div className="mt-auto flex justify-between items-end">
            <div className="hidden sm:flex gap-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-4 md:h-6 transition-all duration-500 ${i < (currentIndex * 1.5) ? 'bg-primary shadow-[0_0_8px_rgba(0,242,255,0.5)]' : 'bg-primary/5'}`}
                  style={{ opacity: 0.2 + (i * 0.02) }}
                ></div>
              ))}
            </div>
            <div className="text-[7px] md:text-[9px] uppercase tracking-widest text-primary/20 flex flex-col items-end">
              <span className="glow-text opacity-50">Kernel::Audit_v4.2</span>
              <span>Buffer Status: {currentIndex > 5 ? 'COMPLETING' : 'LOADING'}</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-primary/5 h-1.5 md:h-2 relative overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(0,242,255,0.8)]" 
            style={{ width: `${(currentIndex / FAKE_MESSAGES.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};