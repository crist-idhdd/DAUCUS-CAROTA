"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Activity, LogOut, Mic, MicOff, AlertTriangle, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface OscilloscopeAppProps {
  onExit: () => void;
}

export const OscilloscopeApp = ({ onExit }: OscilloscopeAppProps) => {
  const [isActive, setIsActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const startAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 2048;
      source.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      setIsActive(true);
      setHasPermission(true);
      
      draw();
    } catch (err) {
      console.error("Microphone access error:", err);
      setHasPermission(false);
    }
  };

  const stopAnalysis = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsActive(false);
  };

  const draw = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const renderFrame = () => {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      analyser.getByteTimeDomainData(dataArray);
      
      // Retro CRT screen background
      ctx.fillStyle = '#050705'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw Amber Analog Grid (10x8)
      const gridCols = 10;
      const gridRows = 8;
      const colWidth = canvas.width / gridCols;
      const rowHeight = canvas.height / gridRows;

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 180, 0, 0.12)'; 

      // Horizontal and Vertical lines
      for (let i = 1; i < gridCols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * colWidth, 0);
        ctx.lineTo(i * colWidth, canvas.height);
        ctx.stroke();
      }
      for (let i = 1; i < gridRows; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * rowHeight);
        ctx.lineTo(canvas.width, i * rowHeight);
        ctx.stroke();
      }

      // Central Axis (More prominent amber)
      ctx.strokeStyle = 'rgba(255, 190, 0, 0.4)';
      ctx.lineWidth = 2;
      
      // Vertical Center
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      
      // Horizontal Center
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Tick marks on central axes
      ctx.lineWidth = 1;
      const tickSize = 6;
      for (let i = 0; i <= canvas.width; i += colWidth / 5) {
        ctx.beginPath();
        ctx.moveTo(i, canvas.height / 2 - tickSize);
        ctx.lineTo(i, canvas.height / 2 + tickSize);
        ctx.stroke();
      }
      for (let i = 0; i <= canvas.height; i += rowHeight / 5) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - tickSize, i);
        ctx.lineTo(canvas.width / 2 + tickSize, i);
        ctx.stroke();
      }

      // Draw Phosphor Waveform
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#bbfabb'; // Core bright green/white
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Bloom effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#33ff33';
      
      ctx.beginPath();
      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      
      // Reset shadow for next frame
      ctx.shadowBlur = 0; 
    };

    renderFrame();
  };

  useEffect(() => {
    return () => {
      stopAnalysis();
    };
  }, []);

  return (
    <div className="w-full max-w-6xl flex flex-col items-center gap-6 md:gap-10 animate-in fade-in zoom-in duration-700 z-10 pt-4 md:pt-10">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-green-500/20 pb-6 relative gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <Activity className="w-6 h-6 md:w-8 md:h-8 text-green-400 shadow-[0_0_15px_rgba(51,255,51,0.6)]" />
             <h1 className="text-2xl md:text-4xl font-headline font-black tracking-tighter text-green-400 uppercase glow-text">
              Talkback Interface
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <span className="text-[8px] md:text-[10px] font-mono bg-green-500 text-black px-2 py-0.5 font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(51,255,51,0.8)]">Audio Reception</span>
            <div className="flex items-center gap-2">
               <Mic className={`w-3 h-3 ${isActive ? 'text-green-400 animate-pulse' : 'text-green-900'}`} />
               <p className="font-mono text-[8px] md:text-[9px] text-green-400/40 uppercase tracking-[0.2em] md:tracking-[0.4em]">Reception_Link: {isActive ? 'BROADCASTING' : 'OFFLINE'}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExit}
            className="border-green-500/20 text-green-400/60 hover:text-green-400 font-mono text-[10px] uppercase tracking-widest bg-transparent"
          >
            <LogOut className="w-3 h-3 mr-2" /> Exit to OS
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className={`relative w-full ${isFullscreen ? 'h-screen' : 'aspect-video md:aspect-[21/9] max-h-[60vh]'} glow-panel hud-bracket bg-black overflow-hidden flex items-center justify-center border-green-500/10 transition-all duration-300`}
      >
        <div className="absolute inset-0 scanline opacity-20 pointer-events-none z-20"></div>
        
        <canvas 
          ref={canvasRef} 
          width={1920} 
          height={1080} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
        />

        {!isActive && (
          <div className="flex flex-col items-center justify-center gap-8 z-30 p-8">
            <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
               <div className="absolute inset-0 border border-green-500/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
               <div className="absolute inset-4 border border-dashed border-green-500/5 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
               <Activity className="w-12 h-12 text-green-500/20 animate-pulse" />
            </div>
            <Button 
              onClick={startAnalysis}
              className="bg-green-500 hover:bg-green-400 text-black font-headline font-bold uppercase tracking-[0.2em] px-12 h-14 glow-panel shadow-[0_0_30px_rgba(51,255,51,0.4)] transition-all hover:scale-105"
            >
              Initialize Probe
            </Button>
            {hasPermission === false && (
              <Alert variant="destructive" className="bg-red-950/20 border-red-500/50 rounded-none max-w-xs">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-xs uppercase font-bold">Hardware Error</AlertTitle>
                <AlertDescription className="text-[10px] uppercase">Microphone access denied by security protocols.</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Fullscreen Toggle */}
        <div className="absolute top-4 right-4 z-40">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-green-500/40 hover:text-green-400 hover:bg-green-500/10 transition-all h-8 w-8"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>

        <div className="absolute top-4 left-4 text-[7px] md:text-[9px] font-mono text-green-400/40 uppercase space-y-1 z-30 pointer-events-none">
          <div>SCALE: 20uV / DIV</div>
          <div>SWEEP: 100uS / DIV</div>
          <div className="flex gap-1 pt-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`w-0.5 h-2 ${isActive ? 'bg-green-500/40' : 'bg-green-500/5'}`}></div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-[7px] md:text-[9px] font-mono text-green-400/40 uppercase text-right space-y-1 z-30 pointer-events-none">
          <div>NODE: PROBE_88_GAMMA</div>
          <div>FREQ: 5.8 GHZ</div>
          <div className="flex gap-1 justify-end pt-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 shadow-[0_0_10px_rgba(51,255,51,1)] animate-pulse' : 'bg-green-900'}`}></div>
            <span>LINK_{isActive ? 'ACTIVE' : 'READY'}</span>
          </div>
        </div>
      </div>

      {isActive && (
        <div className="flex gap-6 w-full max-w-md justify-center">
          <Button 
            variant="outline"
            onClick={stopAnalysis}
            className="border-green-500/40 text-green-400 hover:bg-green-500/10 font-headline uppercase tracking-widest px-8 h-12"
          >
            <MicOff className="w-4 h-4 mr-2" /> Suspend
          </Button>
        </div>
      )}
    </div>
  );
};