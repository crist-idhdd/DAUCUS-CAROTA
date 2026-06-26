
"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, RotateCcw, Download, Crosshair, BarChart3, Fingerprint, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultScreenProps {
  isApproved: boolean;
  onReset: () => void;
}

export const ResultScreen = ({ isApproved, onReset }: ResultScreenProps) => {
  const [resultId, setResultId] = useState('');
  const [protocol, setProtocol] = useState('');

  useEffect(() => {
    setResultId(Math.floor(Math.random() * 1000000).toString().padStart(7, '0'));
    setProtocol(Math.random().toString(36).substring(2, 10).toUpperCase());
  }, []);

  const flavorText = isApproved 
    ? "Aesthetic conformity indices within acceptable parameters. Artistic license granted for public display."
    : "Emotional resonance markers exceed permissible deviation. Artifact scheduled for immediate destruction.";

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-1000 overflow-y-auto ${isApproved ? 'bg-primary/5' : 'bg-red-950/20 backdrop-blur-sm'}`}>
      
      {/* Extreme background glow bars for results */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         {Array.from({ length: 15 }).map((_, i) => (
           <div 
            key={i} 
            className={`absolute h-[2px] w-full animate-bar-move ${isApproved ? 'bg-primary' : 'bg-red-500'}`}
            style={{ top: `${i * 7}%`, animationDelay: `${i * 0.3}s` }}
           ></div>
         ))}
      </div>

      <div className={`w-full max-w-5xl glow-panel hud-bracket p-6 md:p-16 flex flex-col items-center gap-8 md:gap-12 text-center bg-black/95 backdrop-blur-3xl relative mx-4 my-8 ${!isApproved ? 'border-red-500 shadow-[0_0_100px_rgba(255,0,0,0.2)]' : 'border-primary/40 shadow-[0_0_80px_rgba(0,242,255,0.15)]'}`}>
        
        {/* Technical Data Overlay */}
        <div className={`absolute top-4 md:top-6 inset-x-6 md:inset-x-12 flex justify-between text-[7px] md:text-[9px] font-mono uppercase tracking-[0.2em] md:tracking-[0.5em] ${isApproved ? 'text-primary/40' : 'text-red-500/40'}`}>
            <div className="flex items-center gap-2 md:gap-3">
              <Fingerprint className="w-3 h-3" />
              <span>RESULT_NODE: {resultId || '-------'}</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <BarChart3 className="w-3 h-3" />
              <span>CLEARANCE: ALPHA_LEVEL_4</span>
            </div>
        </div>

        {/* Decorative loading bars on the result panel sides */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-32 md:h-64 w-1 flex flex-col gap-1 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className={`flex-1 w-full ${isApproved ? 'bg-primary/20 shadow-[0_0_5px_rgba(0,242,255,0.3)]' : 'bg-red-500/20 shadow-[0_0_5px_rgba(255,0,0,0.3)]'}`}></div>
          ))}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-32 md:h-64 w-1 flex flex-col gap-1 opacity-40">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className={`flex-1 w-full ${isApproved ? 'bg-primary/20' : 'bg-red-500/20'}`}></div>
          ))}
        </div>

        {/* Outcome Header */}
        <div className="space-y-4 md:space-y-8 relative mt-4 md:mt-0">
          <div className="flex justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Crosshair className={`w-24 h-24 md:w-40 md:h-40 ${isApproved ? 'text-primary' : 'text-red-500'}`} />
            </div>
            <div className="relative">
              {isApproved ? (
                <ShieldCheck className="w-16 h-16 md:w-24 md:h-24 text-primary animate-pulse-glow" />
              ) : (
                <ShieldAlert className="w-16 h-16 md:w-24 md:h-24 text-red-500 animate-flicker" />
              )}
              <div className={`absolute -inset-8 md:-inset-12 blur-[40px] md:blur-[60px] opacity-20 ${isApproved ? 'bg-primary' : 'bg-red-500'}`}></div>
            </div>
          </div>
          
          <div className="space-y-2 md:space-y-3">
            <h1 className={`text-4xl md:text-8xl font-headline font-black tracking-tighter uppercase ${isApproved ? 'text-primary glow-text' : 'text-red-500 glow-text-destructive'}`}>
              {isApproved ? 'Approved' : 'Rejected'}
            </h1>
            <div className={`h-[2px] w-48 md:w-80 mx-auto relative overflow-hidden ${isApproved ? 'bg-primary/20' : 'bg-red-500/20'}`}>
               <div className={`absolute inset-0 animate-bar-move ${isApproved ? 'bg-primary/60 shadow-[0_0_10px_rgba(0,242,255,1)]' : 'bg-red-500/60 shadow-[0_0_10px_rgba(255,0,0,1)]'}`}></div>
            </div>
          </div>
        </div>

        {/* Evaluation Readouts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 w-full max-w-2xl font-mono text-[8px] md:text-[9px] uppercase tracking-widest opacity-80">
          <div className={`flex flex-col gap-1 md:gap-2 border-l-2 pl-4 py-1 text-left sm:text-center ${isApproved ? 'border-primary/20' : 'border-red-500/20'}`}>
            <span className={isApproved ? 'text-primary/40' : 'text-red-500/40'}>Visual Integrity</span>
            <span className={`text-sm md:text-lg font-bold ${isApproved ? 'text-primary' : 'text-red-500'}`}>{isApproved ? '0.992' : '0.412'}</span>
          </div>
          <div className={`flex flex-col gap-1 md:gap-2 border-l-2 pl-4 py-1 text-left sm:text-center ${isApproved ? 'border-primary/20' : 'border-red-500/20'}`}>
            <span className={isApproved ? 'text-primary/40' : 'text-red-500/40'}>State Conformity</span>
            <span className={`text-sm md:text-lg font-bold ${isApproved ? 'text-primary' : 'text-red-500'}`}>{isApproved ? 'PASSED' : 'DEVIANT'}</span>
          </div>
          <div className={`flex flex-col gap-1 md:gap-2 border-l-2 pl-4 py-1 text-left sm:text-center ${isApproved ? 'border-primary/20' : 'border-red-500/20'}`}>
            <span className={isApproved ? 'text-primary/40' : 'text-red-500/40'}>Risk Index</span>
            <span className={`text-sm md:text-lg font-bold ${isApproved ? 'text-primary' : 'text-red-500'}`}>{isApproved ? 'LOW' : 'CRITICAL'}</span>
          </div>
        </div>

        {/* Flavor Text */}
        <div className="max-w-2xl w-full bg-black/40 p-4 md:p-6 border border-white/5 rounded-none relative text-left">
          <AlertCircle className={`absolute -top-3 -left-3 w-5 h-5 md:w-6 md:h-6 ${isApproved ? 'text-primary/40' : 'text-red-500/40'}`} />
          <p className={`font-mono text-xs md:text-base leading-relaxed uppercase tracking-tight ${isApproved ? 'text-primary/90 glow-text' : 'text-red-500/90 glow-text-destructive'}`}>
            {flavorText}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4 w-full sm:w-auto">
          <Button 
            onClick={onReset}
            variant="outline"
            className={`h-12 md:h-16 px-8 md:px-12 border-2 font-headline font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all glow-panel bg-transparent ${isApproved ? 'border-primary/40 text-primary hover:bg-primary/10 shadow-[0_0_20px_rgba(0,242,255,0.1)]' : 'border-red-500/40 text-red-500 hover:bg-red-500/10 shadow-[0_0_20px_rgba(255,0,0,0.1)]'}`}
          >
            <RotateCcw className="mr-3 md:mr-4 h-4 w-4 md:h-5 md:w-5" /> New Analysis
          </Button>
          
          {isApproved && (
             <Button 
                className="h-12 md:h-16 px-8 md:px-12 bg-primary text-black font-headline font-black uppercase tracking-[0.2em] md:tracking-[0.3em] glow-panel border-none shadow-[0_0_40px_rgba(0,242,255,0.6)] hover:shadow-[0_0_60px_rgba(0,242,255,0.8)]"
              >
                <Download className="mr-3 md:mr-4 h-4 w-4 md:h-5 md:w-5" /> Export License
              </Button>
          )}
        </div>

        {/* HUD Footers */}
        <div className={`absolute bottom-4 md:bottom-6 inset-x-6 md:inset-x-12 flex justify-between text-[6px] md:text-[8px] font-mono opacity-30 uppercase tracking-[0.2em] md:tracking-[0.3em] ${isApproved ? 'text-primary' : 'text-red-500'}`}>
           <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
             <span className={`${isApproved ? 'glow-text' : 'glow-text-destructive'}`}>PROTO_ID: {protocol || '--------'}</span>
             <span className="hidden sm:inline">SYS_ARCHIVE: ACTIVE</span>
           </div>
           <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:flex gap-[1px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`w-1 h-3 ${isApproved ? 'bg-primary' : 'bg-red-500'}`}></div>
                ))}
              </div>
              <span>NODE_88_GAMMA // ADJUDICATION_SECURE</span>
           </div>
        </div>
      </div>
    </div>
  );
};
