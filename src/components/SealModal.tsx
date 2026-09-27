import React from 'react';
import { Spot } from '../types';
import { playTaikoDrum, playHyoshigi, triggerHaptic } from '../utils/audio';

interface SealModalProps {
  spot: Spot | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SealModal: React.FC<SealModalProps> = ({ spot, isOpen, onClose }) => {
  if (!isOpen || !spot) return null;

  const handlePlaySound = () => {
    triggerHaptic([40, 20, 60]);
    playTaikoDrum(0, 140, 0.4);
    setTimeout(() => playHyoshigi(0), 120);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#081534]/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[360px] bg-white rounded-2xl p-6 flex flex-col items-center shadow-2xl relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#1c1c18] hover:bg-[#ebe8e2] transition"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad4] text-[#b02e1d] text-[11px] font-bold tracking-wider mb-2">
          {spot.code} ・ {spot.areaName}
        </span>

        <h3 className="font-bold text-lg text-[#081534]">
          {spot.sealName}
        </h3>
        <p className="text-xs text-[#b02e1d] font-semibold mt-0.5">
          {spot.sealInscription}
        </p>

        {/* Large Stamp Viewport */}
        <div className="w-48 h-48 my-4 rounded-2xl bg-[#f6f3ed] p-3 flex items-center justify-center shadow-inner relative overflow-hidden">
          {spot.useImageStamp && spot.stampImageUrl ? (
            <img
              src={spot.stampImageUrl}
              alt={spot.sealName}
              className="w-full h-full object-contain filter contrast-125 animate-stamp-slam"
            />
          ) : (
            <div className="w-full h-full rounded-full border-4 border-[#b02e1d] bg-white flex flex-col items-center justify-center p-2 text-[#b02e1d] animate-stamp-slam shadow-md">
              <div className="w-full h-full rounded-full border-2 border-dashed border-[#b02e1d]/70 flex flex-col items-center justify-center p-1 text-center">
                <span className="text-[10px] font-bold tracking-widest text-[#b02e1d]/80">
                  {spot.sealSubText}
                </span>
                <span className="text-3xl font-black font-epilogue my-1 leading-none">
                  {spot.sealKanji}
                </span>
                <span className="text-[10px] font-bold text-[#b02e1d] bg-[#ffdad4] px-1.5 rounded">
                  {spot.sealDateText}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="px-2.5 py-1 rounded bg-[#f0eee8] text-[#45464e] text-xs font-semibold mb-2">
          意匠様式：{spot.sealType}
        </div>

        <p className="text-xs text-[#1c1c18] leading-relaxed text-left bg-[#f6f3ed] p-3 rounded-xl border border-[#e5e2dc]">
          {spot.sealDescription}
        </p>

        <button
          type="button"
          onClick={handlePlaySound}
          className="mt-4 w-full py-2.5 rounded-full bg-[#081534] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow active:scale-95 transition hover:bg-[#1e2a4a]"
        >
          <span className="material-symbols-outlined text-[18px]">ink_pen</span>
          <span>押印音を再生・鑑賞</span>
        </button>
      </div>
    </div>
  );
};
