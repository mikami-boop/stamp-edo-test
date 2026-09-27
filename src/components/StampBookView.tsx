import React, { useState } from 'react';
import { Spot, UserProgress, AreaType } from '../types';
import { SPOTS_DATA } from '../data/spotsData';

interface StampBookViewProps {
  progress: UserProgress;
  onOpenSealModal: (spot: Spot) => void;
  onGoToMap: () => void;
  onSelectSpot: (spot: Spot) => void;
}

export const StampBookView: React.FC<StampBookViewProps> = ({
  progress,
  onOpenSealModal,
  onGoToMap,
  onSelectSpot,
}) => {
  const [selectedArea, setSelectedArea] = useState<AreaType>('all');

  const filteredSpots = SPOTS_DATA.filter((spot) => {
    if (selectedArea === 'all') return true;
    return spot.area === selectedArea;
  });

  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto pb-24 px-4 pt-2 gap-4 selection:bg-[#ffdad4] selection:text-[#400200]">
      {/* Top Header Card */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-[#b02e1d] text-white text-[10px] font-bold tracking-wider uppercase">
            特注揮毫
          </span>
          <span className="text-[11px] text-[#45464e] tracking-wider font-semibold">
            下町職人・寺社監修
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-black text-[#081534] tracking-tight font-epilogue">
            六景新調御朱印帖
          </h2>
          <p className="text-xs text-[#45464e] leading-relaxed mt-1">
            本スタンプラリーのために江戸木版画と寺社意匠の伝統を汲んで新調された全6種の特別印影。各スポットの現地GPS探知、またはAIランドマーク解析により、あなたの手元へ深紅の朱肉と共に鮮やかに押印されます。
          </p>
        </div>

        {/* Complete Reward Preview Teaser */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-3.5 shadow-sm border border-[#e5e2dc]">
          <div className="flex items-center gap-3">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-inner bg-[#f0eee8]">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1XNg7ac_MKHInoHA4CozCxZ2-8sbjzUt1e7xfSnKvDt4Yz1MIcGGOIlDDcRpIXvJTxYMsWbYVDgSqBvSZA_FZxT5XcUR3C1Zlo5cz2d9aKsa081brIH4vlPUA9V8-66Zd2h5lxPbX18kidB4NqpCH6rJconQCgB5wXdkNWzvLFMlA-szoOqEkLFNJ5gMY7bvojaSDefKaRh4E2vGDdrbFGojznKdrt2Qfk5_2vOFGdowqhISGcWlXdeiw"
                alt="江戸東京浅草両国スタンプラリー記念品特製手ぬぐい"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-[#081534]/85 text-[9px] text-white font-bold">
                満願記念
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#b02e1d] text-[16px]">
                  stars
                </span>
                <span className="text-[11px] text-[#b02e1d] font-bold">
                  全六印 満願達成特典
                </span>
              </div>
              <p className="font-bold text-sm text-[#081534] truncate mt-0.5">
                江戸注染特製手ぬぐい
              </p>
              <p className="text-[11px] text-[#45464e] line-clamp-2 mt-0.5 leading-snug">
                両国相撲・浅草寺・スカイツリーの六景が藍色と茜色で織りなす本染め記念手ぬぐいを贈呈。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Area Filter Segmented Control */}
      <div className="sticky top-14 z-30 bg-[#fcf9f3]/95 backdrop-blur-md py-1">
        <div className="flex p-1 bg-[#f0eee8] rounded-full gap-1 border border-[#e5e2dc]">
          <button
            type="button"
            onClick={() => setSelectedArea('all')}
            className={`flex-1 py-1.5 text-center rounded-full text-xs transition font-bold ${
              selectedArea === 'all'
                ? 'bg-[#081534] text-white shadow-sm'
                : 'text-[#45464e] hover:text-[#081534]'
            }`}
          >
            すべて (6)
          </button>
          <button
            type="button"
            onClick={() => setSelectedArea('ryogoku')}
            className={`flex-1 py-1.5 text-center rounded-full text-xs transition font-bold ${
              selectedArea === 'ryogoku'
                ? 'bg-[#081534] text-white shadow-sm'
                : 'text-[#45464e] hover:text-[#081534]'
            }`}
          >
            両国 (2)
          </button>
          <button
            type="button"
            onClick={() => setSelectedArea('asakusa')}
            className={`flex-1 py-1.5 text-center rounded-full text-xs transition font-bold ${
              selectedArea === 'asakusa'
                ? 'bg-[#081534] text-white shadow-sm'
                : 'text-[#45464e] hover:text-[#081534]'
            }`}
          >
            浅草 (2)
          </button>
          <button
            type="button"
            onClick={() => setSelectedArea('oshiage')}
            className={`flex-1 py-1.5 text-center rounded-full text-xs transition font-bold ${
              selectedArea === 'oshiage'
                ? 'bg-[#081534] text-white shadow-sm'
                : 'text-[#45464e] hover:text-[#081534]'
            }`}
          >
            押上・業平 (2)
          </button>
        </div>
      </div>

      {/* Stamps Showcase Grid */}
      <div className="flex flex-col gap-3.5">
        {filteredSpots.map((spot) => {
          const isCollected = progress.collectedStamps.includes(spot.id);

          return (
            <article
              key={spot.id}
              className={`flex flex-col rounded-2xl bg-white p-4 shadow-sm border transition-all hover:shadow-md ${
                spot.id === 'S004'
                  ? 'border-[#b02e1d]/30 ring-1 ring-[#b02e1d]/15'
                  : 'border-[#e5e2dc]'
              }`}
            >
              {/* Header row */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[#f0eee8]">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#1e2a4a] text-white text-[10px] flex items-center justify-center font-bold">
                    {spot.order}
                  </span>
                  <span className="text-xs text-[#45464e] font-bold">
                    {spot.code} ・ {spot.areaName}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {isCollected && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdad4] text-[#b02e1d] text-[10px] font-bold">
                      押印済
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[#081534] text-[10px] font-bold">
                    {spot.sealType}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex gap-3.5 items-center mt-3">
                {/* Stamp visual / thumbnail */}
                <button
                  type="button"
                  onClick={() => onOpenSealModal(spot)}
                  aria-label={`${spot.sealName}を拡大表示`}
                  className="relative w-28 h-28 flex-shrink-0 bg-[#f6f3ed] rounded-xl flex items-center justify-center p-2 group active:scale-95 transition border border-[#e5e2dc]"
                >
                  {spot.useImageStamp && spot.stampImageUrl ? (
                    <img
                      src={spot.stampImageUrl}
                      alt={spot.sealName}
                      className="w-full h-full object-contain filter contrast-125"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full border-2 border-[#b02e1d] bg-white flex flex-col items-center justify-center p-1 text-[#b02e1d]">
                      <span className="text-[9px] font-bold tracking-widest text-[#b02e1d]/75">
                        {spot.sealSubText}
                      </span>
                      <span className="text-2xl font-black font-epilogue my-0.5 leading-none">
                        {spot.sealKanji}
                      </span>
                      <span className="text-[8px] font-bold text-[#b02e1d] bg-[#ffdad4] px-1 rounded">
                        {spot.sealDateText}
                      </span>
                    </div>
                  )}

                  <span className="absolute bottom-1 right-1 bg-white/90 text-[#081534] border border-[#e5e2dc] rounded px-1 text-[9px] font-bold shadow-sm">
                    拡大
                  </span>
                </button>

                {/* Information */}
                <div className="flex flex-col min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-[#081534] leading-snug">
                    {spot.sealName}
                  </h3>
                  <p className="text-[11px] text-[#b02e1d] font-semibold mt-0.5 truncate">
                    {spot.sealInscription}
                  </p>
                  <p className="text-xs text-[#45464e] line-clamp-3 mt-1.5 leading-relaxed">
                    {spot.sealDescription}
                  </p>
                </div>
              </div>

              {/* Footer location & action */}
              <div className="mt-3 pt-2 flex items-center justify-between bg-[#f6f3ed] rounded-xl px-3 py-2 border border-[#e5e2dc]/70">
                <span className="text-xs text-[#45464e] flex items-center gap-1 font-medium truncate">
                  <span className="material-symbols-outlined text-[15px] text-[#b02e1d]">
                    location_on
                  </span>
                  {spot.name}
                </span>

                <button
                  type="button"
                  onClick={() => onSelectSpot(spot)}
                  className="px-2.5 py-1 rounded-full bg-white text-[#081534] text-[11px] font-bold shadow-sm hover:bg-[#f0eee8] active:scale-95 transition-all flex items-center gap-0.5 whitespace-nowrap"
                >
                  <span>{isCollected ? '詳細確認' : '巡拝・押印'}</span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Walking Action */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="p-4 rounded-2xl bg-[#1e2a4a] text-white flex flex-col gap-1 shadow-md">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffdad4] text-[20px]">
              auto_stories
            </span>
            <h4 className="font-bold text-sm text-white">
              電子朱印帖へリアルタイム押印
            </h4>
          </div>
          <p className="text-xs text-[#bac5ee] leading-relaxed">
            各スポットに到達すると、GPS位置情報やAIカメラ判定でスタンプが解放されます。6印全て集めると、記念手ぬぐいの交換コードが発行されます。
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToMap}
          className="w-full py-3.5 px-4 rounded-full bg-[#b02e1d] text-white text-sm font-bold flex items-center justify-center gap-1.5 shadow-md hover:bg-[#8e1407] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">explore</span>
          <span>ラリーマップで巡拝を続ける</span>
        </button>
      </div>
    </div>
  );
};
