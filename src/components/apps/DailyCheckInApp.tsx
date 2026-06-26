"use client";

import React, { useState, useRef, useEffect } from 'react';
import { UserCheck, LogOut, Camera, AlertTriangle, Scan, CheckCircle2, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface DailyCheckInAppProps {
  onExit: () => void;
}

export const DailyCheckInApp = ({ onExit }: DailyCheckInAppProps) => {
  const [isActive, setIsActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCheckInComplete, setIsCheckInComplete] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsActive(true);
      setHasPermission(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsActive(false);
  };

  const handleCompleteCheckIn = () => {
    setIsVerifying(true);
    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false);
      setIsCheckInComplete(true);
      stopCamera();
      // Auto exit after success message
      setTimeout(() => {
        onExit();
      }, 3000);
    }, 2000);
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="w-full max-w-6xl flex flex-col items-center gap-6 md:gap-10 animate-in fade-in zoom-in duration-700 z-10 pt-4 md:pt-10">
      {/* App Header */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-blue-500/20 pb-6 relative gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <UserCheck className="w-6 h-6 md:w-8 md:h-8 text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.6)]" />
             <h1 className="text-2xl md:text-4xl font-headline font-black tracking-tighter text-blue-400 uppercase glow-text">
              Daily Check-in
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <span className="text-[8px] md:text-[10px] font-mono bg-blue-500 text-black px-2 py-0.5 font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(96,165,250,0.8)]">Biometric Node</span>
            <div className="flex items-center gap-2">
               <Fingerprint className="w-3 h-3 text-blue-400/40" />
               <p className="font-mono text-[8px] md:text-[9px] text-blue-400/40 uppercase tracking-[0.2em] md:tracking-[0.4em]">Auth_Protocol: V2.1 // ACTIVE</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExit}
            className="border-blue-500/20 text-blue-400/60 hover:text-blue-400 font-mono text-[10px] uppercase tracking-widest bg-transparent"
          >
            <LogOut className="w-3 h-3 mr-2" /> Abort
          </Button>
        </div>
      </div>

      {/* Main Scanner Area */}
      <div className="relative w-full aspect-video md:aspect-[21/9] max-h-[60vh] glow-panel hud-bracket bg-black overflow-hidden flex items-center justify-center border-blue-500/10">
        <div className="absolute inset-0 scanline opacity-30 z-20"></div>
        
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 grayscale brightness-125 contrast-125 ${isActive ? 'opacity-40' : 'opacity-0'}`}
        />

        {isActive && !isCheckInComplete && (
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
             {/* Face Tracking Frame */}
             <div className="relative w-48 h-64 md:w-64 md:h-80 border-2 border-blue-400/30 rounded-[60px] md:rounded-[80px]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] text-blue-400 font-mono uppercase tracking-[0.3em] whitespace-nowrap glow-text">Target Acquisition</div>
                <div className="absolute inset-0 border border-dashed border-blue-400/10 rounded-[60px] md:rounded-[80px] animate-[spin_10s_linear_infinite]"></div>
                
                {/* Scanning Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/60 shadow-[0_0_15px_rgba(96,165,250,1)] animate-[scan_3s_ease-in-out_infinite]"></div>

                {/* Corner Markers */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-blue-400"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-blue-400"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-blue-400"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-blue-400"></div>
             </div>
             
             {/* Dynamic Metadata Around Face */}
             <div className="absolute top-1/4 right-1/4 font-mono text-[7px] text-blue-400/40 space-y-1">
               <div>PULSE: 72 BPM</div>
               <div>TEMP: 36.6 C</div>
               <div>EYE_TRACK: LOCKED</div>
             </div>
             
             <div className="absolute bottom-1/4 left-1/4 font-mono text-[7px] text-blue-400/40 space-y-1">
               <div>ID_REF: USER_88_ALPHA</div>
               <div>LOC: SECTOR_G</div>
               <div>MATCH_CONF: 98.4%</div>
             </div>
          </div>
        )}

        {isVerifying && (
          <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
            <Scan className="w-16 h-16 text-blue-400 animate-pulse" />
            <div className="text-xl font-headline font-bold text-blue-400 uppercase tracking-widest glow-text">Verifying Biometrics...</div>
            <div className="w-48 h-1 bg-blue-400/20 overflow-hidden">
               <div className="h-full w-full bg-blue-400 animate-bar-move"></div>
            </div>
          </div>
        )}

        {isCheckInComplete && (
          <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="w-20 h-20 text-blue-400 animate-bounce" />
            <div className="space-y-2 text-center">
              <h2 className="text-3xl md:text-5xl font-headline font-black text-blue-400 uppercase tracking-tighter glow-text">Check-in Complete</h2>
              <p className="font-mono text-xs text-blue-400/60 uppercase tracking-widest">Identity confirmed. Participation logged for cycle 88.</p>
            </div>
            <div className="mt-8 text-[8px] font-mono text-blue-400/20 uppercase animate-pulse">Returning to Mainframe...</div>
          </div>
        )}

        {!isActive && !isCheckInComplete && (
          <div className="flex flex-col items-center justify-center gap-8 z-30 p-8">
            <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
               <div className="absolute inset-0 border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
               <div className="absolute inset-4 border border-dashed border-blue-500/5 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
               <Camera className="w-12 h-12 text-blue-500/20 animate-pulse" />
            </div>
            {hasPermission === false && (
              <Alert variant="destructive" className="bg-red-950/20 border-red-500/50 rounded-none max-w-xs">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-xs uppercase font-bold">Hardware Error</AlertTitle>
                <AlertDescription className="text-[10px] uppercase">Optical bridge failed to initialize. Check device permissions.</AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>

      {isActive && !isCheckInComplete && !isVerifying && (
        <div className="w-full max-w-md space-y-6">
          <Button 
            onClick={handleCompleteCheckIn}
            className="w-full h-16 bg-blue-500 text-black font-headline font-black text-lg uppercase tracking-widest hover:bg-blue-400 shadow-[0_0_30px_rgba(96,165,250,0.4)] transition-all hover:scale-105"
          >
            Complete Check-in
          </Button>
          <div className="flex flex-col items-center gap-2">
              <div className="w-full flex justify-between px-2 text-blue-400/40 font-mono text-[7px] uppercase tracking-widest">
                <span>Stream_Link: Stable</span>
                <span>Latency: 12ms</span>
              </div>
              <p className="text-[7px] font-mono text-blue-400/30 uppercase tracking-widest text-center leading-relaxed">Ensure face is centered in primary acquisition frame. Facial recognition technology is monitored for compliance.</p>
          </div>
        </div>
      )}
    </div>
  );
};
