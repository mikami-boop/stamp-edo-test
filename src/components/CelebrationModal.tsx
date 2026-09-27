import React, { useEffect, useRef } from 'react';
import { playCelebrationFanfare, triggerHaptic } from '../utils/audio';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subDesc: string;
  kanjiMain?: string;
  stampText?: string;
  stampImageUrl?: string;
  progressText?: string;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  title,
  subDesc,
  kanjiMain = '風雷',
  stampText = '東都浅草寺',
  stampImageUrl,
  progressText = '1 / 6 箇所達成',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    triggerHaptic([80, 50, 150]);
    playCelebrationFanfare();

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotSpeed: number;
      gravity: number;
      drag: number;
      shape: 'petal' | 'rect';
      opacity: number;
    }

    const colors = ['#b02e1d', '#ff6750', '#ffdad4', '#dae2ff', '#f8d8ff', '#ffd700', '#ffffff'];
    const particles: Particle[] = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width * 0.5 + (Math.random() - 0.5) * 120,
        y: canvas.height * 0.45 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 3,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.28,
        drag: 0.96,
        shape: Math.random() > 0.4 ? 'petal' : 'rect',
        opacity: 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height * 0.6) {
          p.opacity -= 0.012;
        }

        if (p.opacity > 0) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;

          if (p.shape === 'petal') {
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
          }
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#081534]/85 backdrop-blur-md transition-opacity duration-300">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full"
      />

      <div className="relative w-full max-w-[380px] bg-gradient-to-b from-[#fcf9f3] via-[#f6f3ed] to-[#f0eee8] rounded-2xl p-6 shadow-2xl border-2 border-[#b02e1d]/30 flex flex-col items-center text-center overflow-hidden animate-screen-shake">
        <div className="absolute top-2 left-3 text-[10px] font-bold text-[#b02e1d] tracking-widest uppercase">
          ★ 巡拝記結願記念 ★
        </div>

        {/* Central Stamp Visual Stage */}
        <div className="relative my-4 flex items-center justify-center w-48 h-48">
          <div className="absolute inset-0 rounded-full border-4 border-[#b02e1d]/20 animate-burst-ring" />
          <div className="absolute inset-2 rounded-full border border-[#b02e1d]/30" />

          {/* Stamp graphic with physical slam animation */}
          <div className="relative w-40 h-40 rounded-full border-4 border-[#b02e1d] bg-white/95 shadow-[0_0_30px_rgba(176,46,29,0.35)] flex flex-col items-center justify-center p-2 animate-stamp-slam">
            {stampImageUrl ? (
              <img
                src={stampImageUrl}
                alt="御朱印印影"
                className="w-full h-full object-contain filter contrast-125"
              />
            ) : (
              <div className="w-full h-full rounded-full border-2 border-dashed border-[#b02e1d]/80 flex flex-col items-center justify-center p-1 relative text-[#b02e1d]">
                <span className="text-[10px] font-bold tracking-widest">
                  {stampText}
                </span>
                <div className="text-3xl font-black font-epilogue tracking-wider my-1 drop-shadow-sm leading-none">
                  {kanjiMain}
                </div>
                <span className="text-[10px] font-bold tracking-tighter bg-[#ffdad4] text-[#400200] px-2 py-0.5 rounded">
                  令和六年 参拝済
                </span>
                <div className="absolute bottom-1 right-2 w-6 h-6 rounded-sm border border-[#b02e1d] text-[#b02e1d] text-[8px] font-bold flex items-center justify-center leading-none">
                  極
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Header badges */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b02e1d] text-white text-xs font-bold shadow-sm mb-1.5">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span>大願成就・スタンプGET！</span>
        </div>

        <h3 className="font-bold text-lg text-[#081534] tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-[#45464e] mt-1 leading-relaxed">
          {subDesc}
        </p>

        {/* Progress bar */}
        <div className="w-full mt-4 p-3 rounded-xl bg-[#ebe8e2]/80 border border-[#c6c6cf]/60 flex items-center justify-around">
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-[#45464e] font-semibold">巡礼進捗</span>
            <span className="text-base font-bold text-[#081534]">
              {progressText}
            </span>
          </div>
          <div className="w-px h-8 bg-[#c6c6cf]/60" />
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-[#45464e] font-semibold">下町称号</span>
            <span className="text-xs font-bold text-[#b02e1d] mt-1">江戸の達人</span>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex gap-2.5 mt-5">
          <button
            type="button"
            onClick={() => {
              playCelebrationFanfare();
              triggerHaptic(60);
            }}
            className="flex-1 py-3 px-3 rounded-full bg-[#e5e2dc] text-[#1c1c18] text-xs font-bold hover:bg-[#dcdad4] active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px] text-[#b02e1d]">music_note</span>
            <span>音声を再開</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-3 rounded-full bg-[#b02e1d] text-white text-xs font-bold shadow-md hover:bg-[#8e1407] active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <span>台帳に収める</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
