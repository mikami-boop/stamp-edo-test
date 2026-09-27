import React from 'react';

export type TabType = 'map' | 'stamp_book' | 'prize' | 'guide';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  stampsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  stampsCount,
}) => {
  const tabs = [
    {
      id: 'map' as TabType,
      label: 'ラリーマップ',
      sub: 'Map',
      icon: 'map',
    },
    {
      id: 'stamp_book' as TabType,
      label: 'スタンプ帳',
      sub: 'Stamp Book',
      icon: 'grid_view',
      badge: `${stampsCount}/6`,
    },
    {
      id: 'prize' as TabType,
      label: '特典・ゴール',
      sub: 'Prize',
      icon: 'military_tech',
      isComplete: stampsCount >= 6,
    },
    {
      id: 'guide' as TabType,
      label: 'ガイド・規約',
      sub: 'Guide',
      icon: 'menu_book',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#fcf9f3]/95 backdrop-blur-xl border-t border-[#e5e2dc] shadow-[0_-2px_12px_rgba(30,42,74,0.06)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex justify-around items-center h-16 px-1 max-w-[480px] mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] h-14 relative transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-[#b02e1d] font-bold scale-105'
                  : 'text-[#45464e] hover:text-[#081534]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {tab.icon}
                </span>

                {/* Micro badge indicator */}
                {tab.badge && (
                  <span className="absolute -top-1 -right-3 text-[9px] px-1 py-0.2 rounded-full bg-[#1e2a4a] text-white font-mono font-bold leading-tight">
                    {tab.badge}
                  </span>
                )}
                {tab.isComplete && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#b02e1d] animate-ping" />
                )}
              </div>

              <span className="text-[10px] tracking-tight mt-0.5 leading-none">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
