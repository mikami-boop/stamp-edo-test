import React from 'react';
import { isAudioEnabled, setAudioEnabled } from '../utils/audio';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  badgeText?: string;
  onToggleSound?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  badgeText = '下町めぐり',
}) => {
  const [soundOn, setSoundOn] = React.useState<boolean>(isAudioEnabled());

  const handleToggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setAudioEnabled(nextState);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fcf9f3]/90 backdrop-blur-xl border-b border-[#e5e2dc]/60 shadow-[0_1px_8px_rgba(30,42,74,0.04)]">
      <div className="h-14 px-4 flex items-center justify-between gap-2 max-w-[480px] mx-auto">
        {/* Left: Back button or Logo Icon */}
        <div className="flex items-center gap-2 min-w-0">
          {showBack ? (
            <button
              type="button"
              aria-label="戻る"
              onClick={onBack}
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#081534] hover:bg-[#ebe8e2] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#1e2a4a] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">temple_buddhist</span>
            </div>
          )}
          <h1 className="font-semibold text-base text-[#081534] truncate tracking-tight">
            {title}
          </h1>
        </div>

        {/* Right: Sound toggle, Badge, Avatar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={soundOn ? '和音響をミュート' : '和音響を再生'}
            className="h-8 px-2.5 rounded-full bg-[#f0eee8] border border-[#c6c6cf]/60 flex items-center gap-1 text-[#081534] text-xs font-semibold active:scale-95 transition-all hover:bg-[#ebe8e2]"
            title="和音響効果のON/OFF"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                soundOn ? 'text-[#b02e1d]' : 'text-[#76777f]'
              }`}
            >
              {soundOn ? 'volume_up' : 'volume_off'}
            </span>
            <span className="text-[11px] font-bold">
              {soundOn ? '音響:ON' : 'OFF'}
            </span>
          </button>

          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#ebe8e2] text-[#45464e] font-semibold hidden sm:inline-block">
            {badgeText}
          </span>

          <div
            className="w-8 h-8 rounded-full bg-[#1e2a4a] text-white flex items-center justify-center flex-shrink-0 shadow-sm"
            title="巡拝者"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
