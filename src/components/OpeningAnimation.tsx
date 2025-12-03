import { useState, useEffect } from 'react';
import { Sparkles, Utensils, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [phase, setPhase] = useState<'gradient' | 'content' | 'fadeout'>('gradient');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('content'), 500);
    const timer2 = setTimeout(() => setPhase('fadeout'), 2500);
    const timer3 = setTimeout(() => onComplete(), 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700',
        phase === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-accent/20 animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className={cn(
          'relative z-10 text-center px-6 transition-all duration-700',
          phase === 'content' || phase === 'fadeout'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        )}
      >
        {/* Icons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Utensils className="h-8 w-8 text-primary animate-bounce" style={{ animationDelay: '0s' }} />
          <Sparkles className="h-10 w-10 text-accent animate-pulse" />
          <Coffee className="h-8 w-8 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
          Hunger's Harmony
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
          Temukan makanan sesuai mood, cuaca, dan apa yang kamu mau.
        </p>

        {/* Loading indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
}
