import React, { useState } from 'react';
import { Spot, UserProgress } from '../types';
import { SPOTS_DATA } from '../data/spotsData';

interface MapViewProps {
  progress: UserProgress;
  onSelectSpot: (spot: Spot) => void;
  onGoToRewards: () => void;
  onOpenSealModal: (spot: Spot) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  progress,
  onSelectSpot,
  onGoToRewards,
  onOpenSealModal,
}) => {
  const [selectedSpotId, setSelectedSpotId] = useState<string>('S002');
  const [isCentered, setIsCentered] = useState(true);

  const collectedCount = progress.collectedStamps.length;
  const remainingCount = Math.max(0, 6 - collectedCount);
  const progressPercent = Math.min(100, Math.round((collectedCount / 6) * 100));

  const activeSpot = SPOTS_DATA.find((s) => s.id === selectedSpotId) || SPOTS_DATA[0];
  const isSelectedCollected = progress.collectedStamps.includes(activeSpot.id);

  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto pb-24 px-4 pt-2 gap-3 selection:bg-[#ffdad4] selection:text-[#400200]">
      {/* Progress Header Summary Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e2dc]">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#1e2a4a] text-white text-[10px] font-mono tracking-wider">
              台紙 {progress.serialNumber}
            </span>
            <span className="inline-flex items-center gap-0.5 text-[#b02e1d] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              HMAC暗号保護
            </span>
          </div>
          <span className="text-[11px] text-[#45464e] font-semibold">全6箇所巡礼</span>
        </div>

        <div className="flex items-baseline justify-between mt-1 mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-[#081534] font-epilogue leading-none">
              {collectedCount}
            </span>
            <span className="text-xs text-[#45464e]">/ 6 箇所獲得</span>
          </div>
          <span className="text-xs text-[#b02e1d] font-bold">
            {remainingCount === 0 ? '全六印 満願達成！' : `達成まであと ${remainingCount} 箇所`}
          </span>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-[#f0eee8] h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-[#b02e1d] h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Reward Teaser Notice */}
        <div
          onClick={onGoToRewards}
          className="mt-3 pt-2.5 flex items-center justify-between gap-2 bg-[#f6f3ed] rounded-xl px-3 py-2 cursor-pointer hover:bg-[#ebe8e2] transition-colors"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#b02e1d] text-[20px] flex-shrink-0">
              redeem
            </span>
            <p className="text-xs text-[#1c1c18] font-medium truncate">
              6箇所完走で特製手ぬぐい進呈（先着1,000名）
            </p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffdad4] text-[#b02e1d] flex-shrink-0 font-bold whitespace-nowrap">
            残 342 枚
          </span>
        </div>
      </div>

      {/* Realtime GPS Interactive Map Viewport */}
      <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-sm bg-[#eaf4e0] border border-[#e5e2dc]">
        {/* Vector GIS Canvas: Sumida River & Downtown Grid */}
        <svg
          className="absolute inset-0 w-full h-full select-none"
          preserveAspectRatio="none"
          viewBox="0 0 360 288"
        >
          {/* Sumida River Flow */}
          <path
            d="M 230 -10 C 215 60, 160 110, 140 180 C 120 230, 95 270, 80 300 L 130 300 C 145 270, 168 220, 185 180 C 205 120, 260 70, 275 -10 Z"
            fill="#b9ddf2"
          />
          {/* Kitajukken River Canal */}
          <path
            d="M 180 135 Q 260 145, 360 130"
            fill="none"
            stroke="#b9ddf2"
            strokeLinecap="round"
            strokeWidth="12"
          />
          {/* Bridge Crossings */}
          <line x1="170" y1="120" x2="235" y2="105" stroke="#ffffff" strokeLinecap="round" strokeWidth="4" />
          <line x1="130" y1="185" x2="195" y2="175" stroke="#ffffff" strokeLinecap="round" strokeWidth="4" />
          <line x1="105" y1="240" x2="160" y2="235" stroke="#ffffff" strokeLinecap="round" strokeWidth="4" />
          {/* Edo Avenue Lines */}
          <path d="M 0 110 L 360 110" stroke="#f6faee" strokeWidth="3" />
          <path d="M 0 200 L 360 200" stroke="#f6faee" strokeWidth="3" />
          <path d="M 100 0 L 100 288" stroke="#f6faee" strokeWidth="3" />
          <path d="M 280 0 L 280 288" stroke="#f6faee" strokeWidth="3" />
        </svg>

        {/* 6 Clickable Checkpoints on the map */}
        {/* ① S002: 両国国技館 */}
        <div
          onClick={() => setSelectedSpotId('S002')}
          className="absolute top-[205px] left-[135px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
              progress.collectedStamps.includes('S002')
                ? 'bg-[#b02e1d] text-white animate-bounce'
                : 'bg-[#081534] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {progress.collectedStamps.includes('S002') ? 'check' : 'stadium'}
            </span>
          </div>
          <span className="mt-1 px-1.5 py-0.5 rounded bg-white text-[#081534] text-[10px] font-bold shadow-sm whitespace-nowrap">
            ① 国技館 {progress.collectedStamps.includes('S002') ? '(獲得)' : ''}
          </span>
        </div>

        {/* ② S003: unifast */}
        <div
          onClick={() => setSelectedSpotId('S003')}
          className="absolute top-[215px] left-[65px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
              progress.collectedStamps.includes('S003')
                ? 'bg-[#b02e1d] text-white'
                : 'bg-[#1e2a4a] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {progress.collectedStamps.includes('S003') ? 'check' : 'apartment'}
            </span>
          </div>
          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-white text-[#081534] text-[10px] font-bold shadow-sm whitespace-nowrap">
            ② unifast
          </span>
        </div>

        {/* ③ S004: 浅草寺 雷門 */}
        <div
          onClick={() => setSelectedSpotId('S004')}
          className="absolute top-[75px] left-[140px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
              progress.collectedStamps.includes('S004')
                ? 'bg-[#b02e1d] text-white'
                : 'bg-[#1e2a4a] text-white ring-2 ring-[#ffdad4]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {progress.collectedStamps.includes('S004') ? 'check' : 'photo_camera'}
            </span>
          </div>
          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-white text-[#081534] text-[10px] font-bold shadow-sm whitespace-nowrap">
            ③ 雷門
          </span>
        </div>

        {/* ④ S005: 仲見世商店街 */}
        <div
          onClick={() => setSelectedSpotId('S005')}
          className="absolute top-[90px] left-[195px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
              progress.collectedStamps.includes('S005')
                ? 'bg-[#b02e1d] text-white'
                : 'bg-white text-[#081534]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {progress.collectedStamps.includes('S005') ? 'check' : 'storefront'}
            </span>
          </div>
          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-white text-[#081534] text-[10px] font-bold shadow-sm whitespace-nowrap">
            ④ 仲見世
          </span>
        </div>

        {/* ⑤ S007: 東京スカイツリー */}
        <div
          onClick={() => setSelectedSpotId('S007')}
          className="absolute top-[95px] left-[295px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
              progress.collectedStamps.includes('S007')
                ? 'bg-[#b02e1d] text-white'
                : 'bg-[#1e2a4a] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {progress.collectedStamps.includes('S007') ? 'check' : 'quiz'}
            </span>
          </div>
          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-white text-[#081534] text-[10px] font-bold shadow-sm whitespace-nowrap">
            ⑤ スカイツリー
          </span>
        </div>

        {/* ⑥ S008: すみだ水族館 */}
        <div
          onClick={() => setSelectedSpotId('S008')}
          className="absolute top-[140px] left-[285px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
              progress.collectedStamps.includes('S008')
                ? 'bg-[#b02e1d] text-white'
                : 'bg-white text-[#081534]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              {progress.collectedStamps.includes('S008') ? 'check' : 'water_drop'}
            </span>
          </div>
          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-white text-[#081534] text-[10px] font-bold shadow-sm whitespace-nowrap">
            ⑥ すみだ水族館
          </span>
        </div>

        {/* Live Walking User Position Dot with Radar Wave */}
        <div className="absolute top-[195px] left-[118px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="w-10 h-10 rounded-full bg-[#b02e1d]/20 flex items-center justify-center animate-ping absolute inset-0" />
          <div className="relative w-4 h-4 rounded-full bg-[#b02e1d] shadow-lg flex items-center justify-center border-2 border-white">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>

        {/* Top Radar Status Pill */}
        <div className="absolute top-2.5 left-2.5 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#081534]/90 backdrop-blur-md text-white shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#ff6750] animate-pulse" />
          <span className="text-[10px] font-bold tracking-wide">
            50m自動押印レーダー稼働中
          </span>
        </div>

        {/* Map Floating Controls */}
        <div className="absolute right-2.5 bottom-5 z-30 flex flex-col gap-1.5">
          <button
            type="button"
            aria-label="現在地にセンタリング"
            onClick={() => setIsCentered(true)}
            className={`w-9 h-9 rounded-full bg-white text-[#081534] shadow-md flex items-center justify-center hover:bg-[#f6f3ed] transition-colors ${
              isCentered ? 'ring-2 ring-[#081534]' : ''
            }`}
            title="現在地にセンタリング"
          >
            <span className="material-symbols-outlined text-[18px]">my_location</span>
          </button>
          <button
            type="button"
            aria-label="全域表示"
            onClick={() => setIsCentered(false)}
            className="w-9 h-9 rounded-full bg-white text-[#081534] shadow-md flex items-center justify-center hover:bg-[#f6f3ed] transition-colors"
            title="全スポット表示"
          >
            <span className="material-symbols-outlined text-[18px]">layers</span>
          </button>
        </div>

        {/* Scrim attribution */}
        <div className="absolute bottom-1 left-2.5 z-30 text-[#45464e]/80 text-[8px] font-mono">
          © OpenStreetMap 協力者 / 国土地理院調
        </div>
      </div>

      {/* Active Geofence Proximity HUD Card */}
      <div className="bg-[#1e2a4a] text-white rounded-2xl p-4 shadow-md flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[#b02e1d] text-white text-[10px] font-bold">
              {activeSpot.code} 選択中
            </span>
            <span className="text-xs text-[#bac5ee] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">near_me</span>
              {activeSpot.distance}
            </span>
          </div>
          <span className="text-[10px] text-[#ffdad4] bg-[#3a2243] px-2 py-0.5 rounded font-mono font-bold">
            GPS自動検知済
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 mt-0.5">
          <div className="min-w-0">
            <h2 className="font-bold text-base text-white truncate font-epilogue">
              {activeSpot.code} {activeSpot.name}
            </h2>
            <p className="text-xs text-[#bac5ee] line-clamp-1 mt-0.5">
              {activeSpot.subTitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectSpot(activeSpot)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5 ${
              isSelectedCollected
                ? 'bg-[#f0eee8] text-[#081534] hover:bg-white'
                : 'bg-[#b02e1d] text-white hover:bg-[#8e1407]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSelectedCollected ? 'verified' : 'approval'}
            </span>
            <span>{isSelectedCollected ? '御朱印を見る' : '御朱印を押す'}</span>
          </button>
        </div>
      </div>

      {/* Stamp Card Grid Section: 6 Spots (2 Columns x 3 Rows) */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#081534]">
              六景御朱印帳（全6マス）
            </h3>
            <p className="text-xs text-[#45464e]">
              指定のスポットへ赴き、デジタル印影を集めてください。
            </p>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-[#f0eee8] text-[#1c1c18] font-semibold">
            6マス台紙仕様
          </span>
        </div>

        {/* 2-Column x 3-Row Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {SPOTS_DATA.map((spot) => {
            const isCollected = progress.collectedStamps.includes(spot.id);

            return (
              <div
                key={spot.id}
                onClick={() => onSelectSpot(spot)}
                className={`rounded-2xl p-3.5 flex flex-col items-center text-center relative shadow-sm border cursor-pointer hover:shadow-md transition-all active:scale-[0.99] ${
                  isCollected
                    ? 'bg-white border-[#b02e1d]/30 ring-1 ring-[#b02e1d]/10'
                    : 'bg-white border-[#e5e2dc]'
                }`}
              >
                {/* Kanji Order numeral */}
                <div className="absolute top-2.5 left-2.5 text-base font-bold text-[#081534]/25 font-epilogue">
                  {spot.order}
                </div>

                {/* Status Badge */}
                <span
                  className={`absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    isCollected
                      ? 'bg-[#ffdad4] text-[#b02e1d]'
                      : spot.verificationType === 'ai_camera'
                      ? 'bg-[#f8d8ff] text-[#240d2d]'
                      : spot.verificationType === 'quiz'
                      ? 'bg-[#dae2ff] text-[#081534]'
                      : 'bg-[#ffdad4] text-[#b02e1d] animate-pulse'
                  }`}
                >
                  {isCollected ? '押印完了' : spot.inRange ? '50m以内' : '未訪問'}
                </span>

                {/* Stamp Circle View */}
                <div
                  onClick={(e) => {
                    if (isCollected) {
                      e.stopPropagation();
                      onOpenSealModal(spot);
                    }
                  }}
                  className={`w-20 h-20 my-2 rounded-full flex flex-col items-center justify-center p-1.5 relative shadow-inner overflow-hidden transition-transform hover:scale-105 ${
                    isCollected ? 'bg-[#ffdad4]/40' : 'bg-[#f6f3ed]'
                  }`}
                >
                  {isCollected ? (
                    spot.useImageStamp && spot.stampImageUrl ? (
                      <img
                        src={spot.stampImageUrl}
                        alt={spot.name}
                        className="w-full h-full object-contain filter contrast-125"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-[#b02e1d] flex flex-col items-center justify-center text-white transform rotate-[-4deg] p-1 shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">
                          {spot.id === 'S002' ? 'sports_kabaddi' : 'approval'}
                        </span>
                        <span className="text-xs font-black font-epilogue leading-tight mt-0.5">
                          {spot.sealKanji}
                        </span>
                        <span className="text-[8px] tracking-widest uppercase">済</span>
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#76777f]">
                      <span className="material-symbols-outlined text-[24px]">
                        {spot.verificationType === 'ai_camera'
                          ? 'photo_camera'
                          : spot.verificationType === 'quiz'
                          ? 'quiz'
                          : 'storefront'}
                      </span>
                      <span className="text-[10px] font-bold text-[#b02e1d] mt-0.5">
                        押印可
                      </span>
                    </div>
                  )}

                  {isCollected && (
                    <div className="absolute bottom-0 right-0 px-1 py-0.2 bg-[#081534] text-white text-[8px] rounded-full shadow font-mono font-bold">
                      済
                    </div>
                  )}
                </div>

                <h4 className="font-bold text-xs text-[#081534] mt-1 truncate w-full">
                  {spot.name}
                </h4>
                <p className="text-[11px] text-[#45464e] truncate w-full mt-0.5">
                  {spot.subTitle}
                </p>

                <div className="mt-2 text-[10px] flex items-center gap-1 font-bold">
                  {isCollected ? (
                    <span className="text-[#b02e1d] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[13px]">done_all</span>
                      朱印受領済
                    </span>
                  ) : (
                    <span className="text-[#081534] flex items-center gap-0.5 bg-[#f0eee8] px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[12px]">touch_app</span>
                      チェックイン
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grand Completion Prize Showcase Banner */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e5e2dc] flex flex-col mt-1">
        <div className="relative w-full h-40">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1XNg7ac_MKHInoHA4CozCxZ2-8sbjzUt1e7xfSnKvDt4Yz1MIcGGOIlDDcRpIXvJTxYMsWbYVDgSqBvSZA_FZxT5XcUR3C1Zlo5cz2d9aKsa081brIH4vlPUA9V8-66Zd2h5lxPbX18kidB4NqpCH6rJconQCgB5wXdkNWzvLFMlA-szoOqEkLFNJ5gMY7bvojaSDefKaRh4E2vGDdrbFGojznKdrt2Qfk5_2vOFGdowqhISGcWlXdeiw"
            alt="特製手ぬぐい景品"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081534]/90 via-[#081534]/20 to-transparent" />
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#b02e1d] text-white text-[10px] font-bold shadow">
            6マス完走特典
          </div>
          <div className="absolute bottom-2.5 left-3 right-3 text-white">
            <span className="font-bold text-sm block">
              墨田・浅草特製「本藍染風江戸手ぬぐい」
            </span>
            <span className="text-xs text-[#bac5ee] block">
              非売品・オリジナル落款印シリアルナンバー付き
            </span>
          </div>
        </div>

        <div className="p-3.5 flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#b02e1d] text-[18px] flex-shrink-0 mt-0.5">
              store
            </span>
            <div>
              <span className="text-xs text-[#081534] font-bold block">
                特典引換カウンター
              </span>
              <p className="text-xs text-[#45464e] leading-snug">
                両国観光案内所（-江戸NOREN内）または 浅草文化観光センター1F（毎日 9:00〜18:00）
              </p>
            </div>
          </div>

          <div className="pt-1.5 flex items-center justify-between border-t border-[#e5e2dc]">
            <span className="text-[10px] text-[#76777f] font-mono">
              ハッシュ署名: 4b92-ae71-9f20
            </span>
            <button
              type="button"
              onClick={onGoToRewards}
              className="px-3 py-1 rounded-lg bg-[#f0eee8] text-[#081534] text-xs font-bold hover:bg-[#ebe8e2] transition-colors"
            >
              引換詳細・受取
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
