"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LogOut, Timer, Play, Pause, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import CarrotLogo from './CARROT-LOGO/carrot bg removed_.png';

interface MaintenanceAppProps {
  onExit: () => void;
  onComplete: () => void;
}

export const MaintenanceApp = ({ onExit, onComplete }: MaintenanceAppProps) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [inputMinutes, setInputMinutes] = useState('0');
  const [inputSeconds, setInputSeconds] = useState('30');
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const total = parseInt(inputMinutes) * 60 + parseInt(inputSeconds);
    if (total <= 0) return;
    
    setSecondsLeft(total);
    setIsActive(true);
    setIsPaused(false);
  };

  const stopTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (isActive && !isPaused && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setIsPaused(false);
      onComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused, secondsLeft, onComplete]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isActive) {
    const isLastStretch = secondsLeft <= 10 && secondsLeft > 0;

    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-between transition-all duration-1000 overflow-hidden py-10 md:py-16 lg:py-24">
        {/* Top Section: Timer and "Don't go anywhere" */}
        <div className={`flex flex-col items-center gap-2 md:gap-4 z-20 transition-all duration-1000 ease-in-out ${isLastStretch ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'mt-4 md:mt-8'}`}>
           <div className={`font-headline font-black tracking-tighter transition-all duration-500 ${isLastStretch ? 'text-8xl md:text-[14rem]' : 'text-6xl md:text-8xl lg:text-9xl'} ${isPaused ? 'text-amber-500/20 animate-pulse' : 'text-amber-500 glow-text-amber scale-105'}`}>
             {formatTime(secondsLeft)}
           </div>
           <p className={`font-mono transition-all duration-1000 uppercase tracking-[0.3em] md:tracking-[0.6em] text-center px-4 ${isLastStretch ? 'opacity-0 scale-50 h-0 overflow-hidden' : 'text-amber-500 text-lg md:text-3xl lg:text-4xl glow-text-amber font-bold opacity-100'}`}>
             don&apos;t go anywhere
           </p>
        </div>

        {/* Middle Section: Centered Branding and "We will be back soon" */}
        <div className={`relative flex flex-col items-center gap-8 md:gap-12 max-w-4xl px-6 text-center transition-all duration-1000 ${isLastStretch ? 'opacity-0 scale-75 pointer-events-none h-0' : 'opacity-100'}`}>
          <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
            <Image
              src={CarrotLogo}
              alt="Maintenance Logo"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="space-y-4">
            <h2 className="font-headline font-black text-3xl md:text-5xl lg:text-7xl uppercase tracking-tighter leading-tight text-amber-500 glow-text-amber max-w-2xl">
              we will be back soon
            </h2>
          </div>
        </div>

        {/* Bottom Section: Telemetry Label */}
        <div className={`flex flex-col items-center gap-2 transition-opacity duration-1000 pb-8 ${isLastStretch ? 'opacity-0 h-0 overflow-hidden' : 'opacity-30'}`}>
           <div className="font-mono text-[7px] md:text-[10px] uppercase tracking-[0.4em] text-amber-500">
             maintenance timer - {formatTime(secondsLeft)}
           </div>
           <div className="w-24 md:w-48 h-[1px] relative overflow-hidden bg-amber-500/10">
             <div 
               className="absolute inset-0 bg-amber-500/60" 
               style={{ width: `${(secondsLeft / (parseInt(inputMinutes) * 60 + parseInt(inputSeconds))) * 100}%` }}
             ></div>
           </div>
        </div>

        {/* Discrete Controls: Hidden until hovered in corners */}
        <div className="absolute bottom-4 left-4 z-[110] opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button 
            onClick={togglePause}
            variant="ghost"
            size="sm"
            className="font-mono text-[9px] uppercase tracking-widest h-10 px-4 text-amber-500/40 border border-amber-500/10 hover:border-amber-500 hover:bg-amber-500/20 hover:text-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all"
          >
            {isPaused ? <Play className="mr-2 h-3 w-3" /> : <Pause className="mr-2 h-3 w-3" />}
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        </div>
        
        <div className="absolute bottom-4 right-4 z-[110] opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button 
            onClick={stopTimer}
            variant="ghost"
            size="sm"
            className="font-mono text-[9px] uppercase tracking-widest text-amber-500/40 h-10 px-4 border border-amber-500/10 hover:border-amber-500 hover:bg-amber-500/20 hover:text-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all"
          >
            <XCircle className="mr-2 h-3 w-3" />
            Abort
          </Button>
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 scanline opacity-10 pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl flex flex-col items-center gap-6 md:gap-10 animate-in fade-in zoom-in duration-700 z-10 pt-4 md:pt-10">
      
      {/* Configuration Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-amber-500/20 pb-6 relative gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <Timer className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
             <h1 className="text-2xl md:text-4xl font-headline font-black tracking-tighter uppercase text-amber-500 glow-text-amber">
              Maintenance Scheduler
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[8px] md:text-[10px] font-mono px-2 py-0.5 font-bold uppercase tracking-widest bg-amber-500 text-black">
              Standby Configuration
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExit}
            className="border-amber-500/20 text-amber-500/60 hover:text-amber-500 font-mono text-[10px] uppercase tracking-widest bg-transparent"
          >
            <LogOut className="w-3 h-3 mr-2" /> Cancel
          </Button>
        </div>
      </div>

      {/* Configuration UI */}
      <div className="w-full max-w-md glow-panel hud-bracket p-8 md:p-12 flex flex-col items-center gap-8 bg-black/40">
        <div className="text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <Timer className="w-12 h-12 text-amber-500 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-headline font-bold text-amber-500 uppercase tracking-widest">Set Calibration Time</h3>
            <p className="text-[10px] font-mono text-amber-500/40 uppercase">System will engage maintenance screen upon activation</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 space-y-1">
            <label className="text-[8px] font-mono text-amber-500/60 uppercase">Minutes</label>
            <Input 
              type="number" 
              value={inputMinutes} 
              onChange={(e) => setInputMinutes(e.target.value)}
              className="bg-black/40 border-amber-500/20 text-amber-500 font-headline text-2xl h-16 text-center focus:border-amber-500 rounded-none"
            />
          </div>
          <div className="text-2xl text-amber-500 font-bold mt-6">:</div>
          <div className="flex-1 space-y-1">
            <label className="text-[8px] font-mono text-amber-500/60 uppercase">Seconds</label>
            <Input 
              type="number" 
              value={inputSeconds} 
              onChange={(e) => setInputSeconds(e.target.value)}
              className="bg-black/40 border-amber-500/20 text-amber-500 font-headline text-2xl h-16 text-center focus:border-amber-500 rounded-none"
            />
          </div>
        </div>

        <Button 
          onClick={startTimer}
          className="w-full h-16 bg-amber-500 text-black font-headline font-black text-lg uppercase tracking-widest hover:bg-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)] rounded-none"
        >
          <Play className="mr-3 h-6 w-6" /> Engage Calibration
        </Button>
      </div>
    </div>
  );
};
