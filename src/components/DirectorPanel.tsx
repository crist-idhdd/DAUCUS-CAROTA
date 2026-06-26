
"use client";

import React from 'react';
import { Settings, ShieldAlert, CheckCircle, XCircle, Shuffle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type OverrideType = 'none' | 'force-approve' | 'force-reject' | 'random';

interface DirectorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  override: OverrideType;
  setOverride: (val: OverrideType) => void;
}

export const DirectorPanel = ({ isOpen, onClose, override, setOverride }: DirectorPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md border-destructive/50 bg-[#1a1f21] shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <CardHeader className="border-b border-destructive/20">
          <div className="flex items-center gap-3">
            <ShieldAlert className="text-destructive h-6 w-6" />
            <CardTitle className="text-xl font-headline font-bold text-destructive uppercase tracking-widest">
              Director Override
            </CardTitle>
          </div>
          <CardDescription className="font-mono text-xs text-destructive/70">
            System override protocols engaged. Aesthetic evaluation outcomes can be manipulated for narrative purposes.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <RadioGroup 
            value={override} 
            onValueChange={(val) => setOverride(val as OverrideType)}
            className="space-y-4"
          >
            <div className={`flex items-center justify-between p-4 border rounded-none transition-all ${override === 'none' ? 'border-primary bg-primary/5' : 'border-primary/20 bg-black/20'}`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="font-mono text-sm cursor-pointer">AI STANDARD PROTOCOL</Label>
              </div>
              <Shuffle className="h-4 w-4 text-primary/40" />
            </div>

            <div className={`flex items-center justify-between p-4 border rounded-none transition-all ${override === 'force-approve' ? 'border-accent bg-accent/5' : 'border-accent/20 bg-black/20'}`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="force-approve" id="force-approve" />
                <Label htmlFor="force-approve" className="font-mono text-sm cursor-pointer text-accent">FORCE APPROVAL</Label>
              </div>
              <CheckCircle className="h-4 w-4 text-accent/40" />
            </div>

            <div className={`flex items-center justify-between p-4 border rounded-none transition-all ${override === 'force-reject' ? 'border-destructive bg-destructive/5' : 'border-destructive/20 bg-black/20'}`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="force-reject" id="force-reject" />
                <Label htmlFor="force-reject" className="font-mono text-sm cursor-pointer text-destructive">FORCE REJECTION</Label>
              </div>
              <XCircle className="h-4 w-4 text-destructive/40" />
            </div>

            <div className={`flex items-center justify-between p-4 border rounded-none transition-all ${override === 'random' ? 'border-yellow-500 bg-yellow-500/5' : 'border-yellow-500/20 bg-black/20'}`}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="random" id="random" />
                <Label htmlFor="random" className="font-mono text-sm cursor-pointer text-yellow-500">CHAOS MODE (RANDOM)</Label>
              </div>
              <Shuffle className="h-4 w-4 text-yellow-500/40" />
            </div>
          </RadioGroup>

          <Button 
            className="w-full mt-8 bg-destructive hover:bg-destructive/80 text-white font-headline uppercase tracking-widest font-bold"
            onClick={onClose}
          >
            CONFIRM OVERRIDE
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
