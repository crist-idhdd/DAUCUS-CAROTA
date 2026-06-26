"use client";

import React, { useState } from 'react';
import { Shield, Cpu, Activity, LogOut } from 'lucide-react';
import { ScanningFrame } from '@/components/ScanningFrame';
import { AnalysisOverlay } from '@/components/AnalysisOverlay';
import { ResultScreen } from '@/components/ResultScreen';
import { Button } from '@/components/ui/button';
import { DirectorPanel, OverrideType } from '@/components/DirectorPanel';

interface ComplianceAppProps {
  onExit: () => void;
  override: OverrideType;
  setOverride: (val: OverrideType) => void;
  isDirectorOpen: boolean;
  setIsDirectorOpen: (val: boolean) => void;
}

export const ComplianceApp = ({ onExit, override, setOverride, isDirectorOpen, setIsDirectorOpen }: ComplianceAppProps) => {
  const [currentStep, setCurrentStep] = useState<'scan' | 'analyzing' | 'result'>('scan');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const handleCapture = (image: string | null) => {
    setCapturedImage(image);
  };

  const startAnalysis = (image?: string) => {
    const finalImage = image || capturedImage;
    if (!finalImage) return;
    
    if (image) setCapturedImage(image);
    setCurrentStep('analyzing');
  };

  const handleAnalysisComplete = () => {
    let result = Math.random() > 0.5;

    if (override === 'force-approve') result = true;
    else if (override === 'force-reject') result = false;
    else if (override === 'random') result = Math.random() > 0.5;

    setIsApproved(result);
    setCurrentStep('result');
  };

  const reset = () => {
    setCapturedImage(null);
    setCurrentStep('scan');
  };

  return (
    <div className="w-full max-w-6xl flex flex-col items-center gap-6 md:gap-10 animate-in fade-in zoom-in duration-700 z-10 pt-4 md:pt-10">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-primary/20 pb-6 relative gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary shadow-[0_0_15px_rgba(0,242,255,0.6)]" />
             <h1 className="text-2xl md:text-4xl font-headline font-black tracking-tighter text-primary uppercase glow-text">
              Compliance Interface
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <span className="text-[8px] md:text-[10px] font-mono bg-primary text-black px-2 py-0.5 font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(0,242,255,0.8)]">Live Adjudication</span>
            <div className="flex items-center gap-2">
               <Cpu className="w-3 h-3 text-primary/40" />
               <p className="font-mono text-[8px] md:text-[9px] text-primary/40 uppercase tracking-[0.2em] md:tracking-[0.4em]">System_Online // 88-ALPHA</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-12 font-mono text-[8px] uppercase text-primary/30 mr-8">
              <div className="flex flex-col items-end gap-1">
                  <span>CPU_ALLOC</span>
                  <div className="w-20 h-1 bg-primary/10 overflow-hidden">
                    <div className="h-full w-2/3 bg-primary/60 animate-pulse shadow-[0_0_5px_rgba(0,242,255,0.5)]"></div>
                  </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                  <span className="flex items-center gap-2"><Activity className="w-2 h-2" /> NET_SYNC</span>
                  <span className="text-primary/60 glow-text">98.2%</span>
              </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExit}
            className="border-primary/20 text-primary/60 hover:text-primary font-mono text-[10px] uppercase tracking-widest bg-transparent"
          >
            <LogOut className="w-3 h-3 mr-2" /> Exit to OS
          </Button>
        </div>
      </div>

      {currentStep === 'scan' && (
        <>
          <ScanningFrame 
            onCapture={handleCapture}
            onQuickSubmit={(image) => startAnalysis(image)}
            isProcessing={false}
          />

          <div className="w-full max-w-md space-y-4 md:space-y-6 pt-4">
            <Button 
              disabled={!capturedImage}
              onClick={() => startAnalysis()}
              className={`w-full h-14 md:h-16 bg-primary text-black font-headline font-black text-base md:text-lg uppercase tracking-[0.2em] md:tracking-[0.4em] transition-all duration-700 shadow-[0_0_40px_rgba(0,242,255,0.4)] hover:shadow-[0_0_70px_rgba(0,242,255,0.7)] glow-panel border-none ${!capturedImage ? 'opacity-20 saturate-0 scale-95' : 'opacity-100 scale-100'}`}
            >
              Verify Artifact
            </Button>
            <div className="flex flex-col items-center gap-2">
                <div className="w-full flex justify-between px-2 text-primary">
                  <span className="text-[6px] text-primary/30 uppercase glow-text opacity-50">Secure_Link: ESTABLISHED</span>
                  <div className="hidden sm:flex gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className={`w-1 h-2 ${i < 4 ? 'bg-primary' : 'bg-primary/10'}`}></div>
                    ))}
                  </div>
                  <span className="text-[6px] text-primary/30 uppercase">Protocol: V3.4</span>
                </div>
                <p className="text-[7px] font-mono text-primary/40 uppercase tracking-widest text-center max-w-xs leading-relaxed">Submission signifies complete alignment with state artistic directives and adherence to aesthetic code 0x992.</p>
            </div>
          </div>
        </>
      )}

      {currentStep === 'analyzing' && (
        <AnalysisOverlay onComplete={handleAnalysisComplete} />
      )}

      {currentStep === 'result' && (
        <ResultScreen isApproved={isApproved} onReset={reset} />
      )}
    </div>
  );
};