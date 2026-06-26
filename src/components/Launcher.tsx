"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Activity, Wrench, UserCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type AppId = 'compliance' | 'oscilloscope' | 'maintenance' | 'daily_checkin' | 'reserved_4' | 'reserved_5';

const APPS = [
  { id: 'compliance', name: 'Compliance Interface', icon: Shield, desc: 'Aesthetic Adjudication V3.4', color: 'text-primary', functional: true },
  { id: 'oscilloscope', name: 'Talkback Interface', icon: Activity, desc: 'Audio Reception V1.0', color: 'text-green-400', functional: true },
  { id: 'maintenance', name: 'Calibration', icon: Wrench, desc: 'System Calibration V8.2', color: 'text-amber-500', functional: true },
  { id: 'daily_checkin', name: 'Daily Check-in', icon: UserCheck, desc: 'Biometric Verification V2.1', color: 'text-blue-400', functional: true },
  { id: 'reserved_4', name: '[ RESERVED ]', icon: Lock, desc: 'Node Allocation Pending', color: 'text-primary/20', functional: false },
  { id: 'reserved_5', name: '[ RESERVED ]', icon: Lock, desc: 'Node Allocation Pending', color: 'text-primary/20', functional: false },
];

export const Launcher = ({ onLaunch }: LauncherProps) => {
  const [appIds, setAppIds] = useState<Record<string, string>>({});

  useEffect(() => {
    const ids: Record<string, string> = {};
    APPS.forEach(app => {
      ids[app.id] = Math.random().toString(16).slice(2, 5).toUpperCase();
    });
    setAppIds(ids);
  }, []);

  return (
    <div className="w-full max-w-6xl flex flex-col items-center gap-12 animate-in fade-in zoom-in duration-700 z-10 pt-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-headline font-black tracking-tighter text-amber-500 uppercase glow-text-amber">
          Daucus Carota Mainframe
        </h1>
        <p className="font-mono text-[10px] md:text-xs text-amber-500/40 uppercase tracking-[0.4em]">
          Authorization: ROOT_DIRECTOR // Terminal_88
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {APPS.map((app) => (
          <Button
            key={app.id}
            variant="ghost"
            onClick={() => app.functional && onLaunch(app.id as AppId)}
            className={`h-auto p-0 rounded-none group relative overflow-hidden transition-all duration-500 border border-primary/10 ${app.functional ? 'hover:border-primary/40 bg-black/40' : 'opacity-40 grayscale cursor-not-allowed bg-black/20'}`}
          >
            {/* Background decorative grid for each card */}
            <div className="absolute inset-0 tech-grid opacity-5 group-hover:opacity-10 transition-opacity"></div>
            
            <div className="relative p-6 w-full flex flex-col items-start gap-4 text-left">
              <div className="flex justify-between items-start w-full">
                <app.icon className={`w-10 h-10 ${app.color} transition-transform ${app.functional ? 'group-hover:scale-110 group-hover:rotate-3' : ''} duration-500`} />
                <span className="text-[8px] font-mono text-primary/20 group-hover:text-primary/40">ID_0X{appIds[app.id] || '---'}</span>
              </div>
              
              <div className="space-y-1">
                <h3 className={`text-lg font-headline font-bold uppercase tracking-widest ${app.color} ${app.functional ? 'group-hover:glow-text' : ''}`}>
                  {app.name}
                </h3>
                <p className="text-[10px] font-mono text-primary/40 uppercase tracking-tight">
                  {app.desc}
                </p>
              </div>

              {/* Functional Indicator */}
              <div className="w-full mt-4 flex items-center justify-between">
                <div className="flex gap-[1px]">
                   {Array.from({ length: 4 }).map((_, i) => (
                     <div key={i} className={`w-4 h-1 ${app.functional ? 'bg-primary/20 group-hover:bg-primary/60' : 'bg-primary/5'}`}></div>
                   ))}
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                  {app.functional ? 'Ready' : 'Locked'}
                </span>
              </div>
            </div>

            {/* Corner Bracket Decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40 group-hover:border-primary"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40 group-hover:border-primary"></div>
          </Button>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 w-full">
         <div className="w-full h-[1px] bg-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/40 animate-bar-move"></div>
         </div>
         <div className="flex gap-8 font-mono text-[8px] text-primary/30 uppercase tracking-[0.2em]">
            <span>Active Nodes: 4</span>
            <span>Uptime: 244.2h</span>
            <span>Connection: Secure</span>
         </div>
      </div>
    </div>
  );
};

interface LauncherProps {
  onLaunch: (id: AppId) => void;
}
