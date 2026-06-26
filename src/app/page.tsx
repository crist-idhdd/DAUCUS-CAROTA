"use client";

import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ConsoleHUD } from '@/components/ConsoleHUD';
import { Launcher, AppId } from '@/components/Launcher';
import { ComplianceApp } from '@/components/apps/ComplianceApp';
import { OscilloscopeApp } from '@/components/apps/OscilloscopeApp';
import { MaintenanceApp } from '@/components/apps/MaintenanceApp';
import { DailyCheckInApp } from '@/components/apps/DailyCheckInApp';
import { DirectorPanel, OverrideType } from '@/components/DirectorPanel';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [currentApp, setCurrentApp] = useState<AppId | null>(null);
  const [isDirectorOpen, setIsDirectorOpen] = useState(false);
  const [override, setOverride] = useState<OverrideType>('none');

  const handleLaunch = (id: AppId) => {
    setCurrentApp(id);
  };

  const handleExit = () => {
    setCurrentApp(null);
  };

  const handleMaintenanceComplete = () => {
    // Returning to mainframe (Launcher) as requested
    setCurrentApp(null);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start bg-background overflow-x-hidden p-4 md:px-16 md:pt-16 md:pb-20">
      {/* HUD System Overlay */}
      <ConsoleHUD />

      {/* Persistent Ambient Background Glow bars */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-primary animate-bar-move"></div>
        <div className="absolute top-[50%] left-0 w-full h-[1px] bg-primary animate-bar-move [animation-delay:4s]"></div>
        <div className="absolute top-[80%] left-0 w-full h-[1px] bg-primary animate-bar-move [animation-delay:2s]"></div>
      </div>

      {/* Director Access */}
      <div className="fixed top-4 right-4 md:top-8 md:right-8 z-[100]">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsDirectorOpen(true)}
          className="text-primary/10 hover:text-primary transition-all h-8 w-8 hover:bg-primary/10"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* App Routing Content */}
      {!currentApp ? (
        <Launcher onLaunch={handleLaunch} />
      ) : currentApp === 'compliance' ? (
        <ComplianceApp 
          onExit={handleExit} 
          override={override} 
          setOverride={setOverride}
          isDirectorOpen={isDirectorOpen}
          setIsDirectorOpen={setIsDirectorOpen}
        />
      ) : currentApp === 'oscilloscope' ? (
        <OscilloscopeApp onExit={handleExit} />
      ) : currentApp === 'maintenance' ? (
        <MaintenanceApp onExit={handleExit} onComplete={handleMaintenanceComplete} />
      ) : currentApp === 'daily_checkin' ? (
        <DailyCheckInApp onExit={handleExit} />
      ) : null}

      {/* Global Frame Overlay */}
      <div className="fixed inset-4 md:inset-8 pointer-events-none z-[60] border border-primary/5 rounded-none shadow-[inset_0_0_100px_rgba(0,242,255,0.02)]"></div>
      
      {/* Director Overlay */}
      <DirectorPanel 
        isOpen={isDirectorOpen} 
        onClose={() => setIsDirectorOpen(false)}
        override={override}
        setOverride={setOverride}
      />
    </main>
  );
}
