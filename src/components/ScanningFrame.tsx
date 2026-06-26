
"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, AlertTriangle, XCircle, CheckCircle2, Crosshair, BarChart, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ScanningFrameProps {
  onCapture: (image: string | null) => void;
  onQuickSubmit?: (image: string) => void;
  isProcessing: boolean;
}

export const ScanningFrame = ({ onCapture, onQuickSubmit, isProcessing }: ScanningFrameProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(s);
      setIsCameraActive(true);
      setPreviewImage(null);
      setHasCameraPermission(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        videoRef.current.play().catch(e => console.error("Video play error:", e));
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setHasCameraPermission(false);
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setPreviewImage(dataUrl);
        onCapture(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewImage(result);
        onCapture(result);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickSelect = () => {
    const placeholder = PlaceHolderImages.find(img => img.id === 'compliance-artifact') || PlaceHolderImages[0];
    if (placeholder) {
      setPreviewImage(placeholder.imageUrl);
      if (onQuickSubmit) {
        onQuickSubmit(placeholder.imageUrl);
      } else {
        onCapture(placeholder.imageUrl);
      }
      stopCamera();
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl h-[40vh] md:h-[50vh]">
      {/* Outer Glow Container */}
      <div className="absolute -inset-4 md:-inset-8 border border-primary/10 blur-[4px] pointer-events-none"></div>
      
      <div className={`relative w-full h-full glow-panel hud-bracket flex items-center justify-center bg-black/60 overflow-hidden ${isProcessing ? 'animate-pulse' : ''}`}>
        
        {/* Dynamic Scanline Overlay */}
        <div className="absolute inset-0 scanline opacity-30 z-10"></div>

        {/* Technical Metadata Bars */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 z-30 opacity-60">
          <div className="flex gap-[1px]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-1 h-3 bg-primary/40"></div>
            ))}
          </div>
          <span className="text-[7px] font-mono text-primary uppercase tracking-tighter glow-text">SENS_GAIN: +12DB</span>
        </div>

        <div className="absolute top-4 right-4 flex flex-col items-end gap-1 z-30 opacity-60">
          <span className="text-[7px] font-mono text-primary uppercase tracking-tighter glow-text">FEED_STATUS: NOMINAL</span>
          <div className="w-12 h-1 bg-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/60 animate-bar-move"></div>
          </div>
        </div>

        {/* Small decorative corner boxes with bars */}
        <div className="absolute bottom-4 left-4 z-30 opacity-40 hidden sm:block">
          <div className="flex gap-1 mb-1">
             <BarChart className="w-2 h-2 text-primary" />
             <span className="text-[6px] text-primary font-mono uppercase">Telemetry</span>
          </div>
          <div className="flex gap-[2px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`w-[2px] h-3 ${i < 8 ? 'bg-primary' : 'bg-primary/20'}`}></div>
            ))}
          </div>
        </div>

        {/* Camera Feed Layer */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isCameraActive ? 'opacity-100 z-20' : 'opacity-0 -z-10 pointer-events-none'}`}>
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className="w-full h-full object-cover grayscale opacity-40 brightness-150 contrast-125" 
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Crosshair className="w-16 h-16 md:w-32 md:h-32 text-primary opacity-20 animate-flicker" />
          </div>
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-3 md:gap-4 z-40 w-[90%] md:w-auto">
            <Button onClick={handleCapture} className="bg-primary hover:bg-primary/80 text-black font-headline font-bold uppercase tracking-[0.2em] px-8 md:px-12 h-12 md:h-14 glow-panel border-none shadow-[0_0_30px_rgba(0,242,255,0.4)] whitespace-nowrap">
              Capture Artifact
            </Button>
            <Button onClick={stopCamera} variant="outline" className="h-12 md:h-14 w-full md:w-14 border-primary/40 text-primary hover:bg-primary/10">
              <span className="md:hidden mr-2">Cancel</span>
              <XCircle className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
          </div>
        </div>

        {/* Initial UI */}
        {!isCameraActive && !previewImage && (
          <div className="flex flex-col items-center gap-8 md:gap-12 z-20 w-full px-4">
            <div className="relative w-32 h-32 md:w-56 md:h-56 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-[spin_30s_linear_infinite] shadow-[0_0_30px_rgba(0,242,255,0.1)]"></div>
              <div className="absolute inset-4 border border-dashed border-primary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="text-center space-y-2">
                <Layers className="w-4 h-4 md:w-6 md:h-6 text-primary/40 mx-auto animate-pulse" />
                <div className="text-primary font-headline font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-[10px] md:text-xs glow-text">Optics Offline</div>
                <div className="text-primary/30 font-mono text-[6px] md:text-[7px] uppercase tracking-widest hidden sm:block">Initialize hardware bridge</div>
                <div className="w-16 md:w-24 h-[1px] bg-primary/20 mx-auto mt-2 relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary animate-bar-move opacity-50"></div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-6 w-full max-w-sm sm:max-w-none">
              <Button 
                onClick={startCamera}
                variant="outline" 
                className="flex-1 border-primary/40 text-primary hover:bg-primary/10 font-mono text-[8px] md:text-[9px] uppercase tracking-widest h-10 md:h-12 px-4 md:px-8 glow-panel"
              >
                <Camera className="mr-2 md:mr-3 h-4 w-4" /> Mount Lens
              </Button>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline" 
                className="flex-1 border-primary/40 text-primary hover:bg-primary/10 font-mono text-[8px] md:text-[9px] uppercase tracking-widest h-10 md:h-12 px-4 md:px-8 glow-panel"
              >
                <Upload className="mr-2 md:mr-3 h-4 w-4" /> Load Matrix
              </Button>
              <Button 
                onClick={handleQuickSelect}
                variant="secondary" 
                className="flex-1 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/40 font-mono text-[8px] md:text-[9px] uppercase tracking-widest h-10 md:h-12 px-4 md:px-8 glow-panel shadow-[0_0_20px_rgba(255,77,0,0.2)]"
              >
                <CheckCircle2 className="mr-2 md:mr-3 h-4 w-4" /> Placeholder
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
            </div>

            {hasCameraPermission === false && (
              <Alert variant="destructive" className="max-w-xs bg-red-950/20 border-red-500/50 rounded-none shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertTitle className="text-[10px] font-bold uppercase tracking-widest text-red-500">Optics Error</AlertTitle>
                <AlertDescription className="text-[8px] uppercase tracking-tight text-red-500/80 leading-tight">
                  Security protocols blocked camera access.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Preview UI */}
        {previewImage && !isCameraActive && (
          <div className="relative w-full h-full p-4 md:p-8 z-20 bg-black/90 flex items-center justify-center">
            <div className="relative max-w-full max-h-full">
              <img src={previewImage} alt="Preview" className="max-w-full max-h-full object-contain opacity-50 grayscale contrast-150 brightness-110" />
              <div className="absolute inset-0 border border-primary/20 pointer-events-none"></div>
              {/* Floating tech tags around image */}
              <div className="absolute -top-4 -left-4 text-[7px] text-primary/60 font-mono bg-black px-1 glow-text">REF_0x822</div>
              <div className="absolute -bottom-4 -right-4 text-[7px] text-primary/60 font-mono bg-black px-1">CACHED_TRUE</div>
            </div>
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
               <Button onClick={() => { setPreviewImage(null); onCapture(null); }} variant="outline" size="sm" className="font-mono uppercase text-[8px] border-primary/20 text-primary/60 hover:text-primary hover:bg-primary/5">
                Clear Buffer
              </Button>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};
