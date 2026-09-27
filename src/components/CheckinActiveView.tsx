import React, { useState } from 'react';
import { Spot, UserProgress } from '../types';
import { SKYTREE_QUIZ, SPOTS_DATA } from '../data/spotsData';
import { playTaikoDrum, playHyoshigi, triggerHaptic } from '../utils/audio';

interface CheckinActiveViewProps {
  spot: Spot;
  progress: UserProgress;
  onStampCollected: (spotId: string) => void;
  onGoBack: () => void;
  onGoToStampBook: () => void;
  onTriggerCelebration: (data: {
    title: string;
    subDesc: string;
    kanjiMain?: string;
    stampText?: string;
    stampImageUrl?: string;
  }) => void;
}

export const CheckinActiveView: React.FC<CheckinActiveViewProps> = ({
  spot,
  progress,
  onStampCollected,
  onGoBack,
  onGoToStampBook,
  onTriggerCelebration,
}) => {
  const isAlreadyStamped = progress.collectedStamps.includes(spot.id);

  // S007 Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<string>('B');
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizError, setQuizError] = useState<boolean>(false);

  // S004 Camera / AI state
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);

  // S005 AR state
  const [isArVerified, setIsArVerified] = useState<boolean>(false);

  // General checkin loading
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Handler for standard stamp check-in
  const handleExecuteStamp = () => {
    if (isAlreadyStamped || isSubmitting) return;

    setIsSubmitting(true);
    triggerHaptic([50, 30, 90]);
    playTaikoDrum(0, 140, 0.4);
    setTimeout(() => playHyoshigi(0), 120);

    setTimeout(() => {
      onStampCollected(spot.id);
      setIsSubmitting(false);

      onTriggerCelebration({
        title: `${spot.name} 登頂印`,
        subDesc: `${spot.sealName}があなたの御朱印台紙に刻印されました！`,
        kanjiMain: spot.sealKanji,
        stampText: spot.sealSubText,
        stampImageUrl: spot.useImageStamp ? spot.stampImageUrl : undefined,
      });
    }, 450);
  };

  // Handler for S004 AI Camera Checkin
  const handleAiCameraCapture = () => {
    if (isAlreadyStamped || isAiProcessing) return;

    setIsAiProcessing(true);
    triggerHaptic([40, 20, 80]);

    setTimeout(() => {
      setIsAiProcessing(false);
      onStampCollected(spot.id);

      onTriggerCelebration({
        title: '浅草寺 金龍山雷門朱印',
        subDesc: '大提灯＆ピースサイン✌️のAI認証に成功しました！名宝木版朱印を獲得しました。',
        kanjiMain: '風雷',
        stampText: '金龍山 浅草寺',
        stampImageUrl: spot.stampImageUrl,
      });
    }, 1400);
  };

  // Handler for S007 Quiz Checkin
  const handleQuizSubmit = () => {
    if (isAlreadyStamped || isSubmitting) return;

    setIsSubmitting(true);
    triggerHaptic([40, 30, 70]);

    setTimeout(() => {
      setIsSubmitting(false);
      if (selectedQuizOption === 'B') {
        setQuizAnswered(true);
        setQuizError(false);
        onStampCollected(spot.id);

        onTriggerCelebration({
          title: '東京スカイツリー 展望印',
          subDesc: '634m (武蔵の国) クイズに見事大正解！展望タワー朱印が刻印されました。',
          kanjiMain: '武蔵',
          stampText: '押上電波塔',
        });
      } else {
        setQuizError(true);
        playTaikoDrum(0, 90, 0.3);
      }
    }, 600);
  };

  const nextSpot = spot.nextSpotId ? SPOTS_DATA.find((s) => s.id === spot.nextSpotId) : null;

  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto pb-28 px-4 pt-2 gap-4 selection:bg-[#ffdad4] selection:text-[#400200]">
      {/* Spot Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-[#e5e2dc]">
        <div className="relative h-44 w-full overflow-hidden bg-[#e5e2dc]">
          <img
            src={spot.image}
            alt={spot.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081534]/95 via-[#081534]/30 to-transparent" />

          {/* Top chips */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1e2a4a]/90 backdrop-blur-md text-white text-[10px] font-bold">
              {spot.code} {spot.areaName}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#b02e1d] text-white text-[10px] font-bold shadow">
              {spot.verificationBadge}
            </span>
          </div>

          {/* Bottom Title */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-[10px] text-[#ffdad4] font-mono tracking-wider">
              SPOT IDENTIFICATION ・ {spot.order}
            </p>
            <h2 className="text-xl font-bold tracking-tight drop-shadow font-epilogue">
              {spot.name}
            </h2>
            <p className="text-xs text-[#bac5ee] line-clamp-1 mt-0.5">
              {spot.title}
            </p>
          </div>
        </div>

        {/* GPS Live Range Lock Strip */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#f6f3ed] border-t border-[#e5e2dc]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b02e1d] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#b02e1d]" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#081534]">
                50m圏内滞在中（現在地から約{spot.distanceNum}m）
              </span>
              <span className="text-[10px] text-[#45464e]">
                高精度GPS測位・位置偽装検知クリア
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-white text-[#b02e1d] text-[10px] font-bold shadow-sm border border-[#ffdad4]">
            {isAlreadyStamped ? '押印済み' : '即時押印可能'}
          </span>
        </div>
      </div>

      {/* Special Interactivity per Spot Type */}
      {/* 1. S004: AI Camera Viewfinder (提灯 + ピースサイン) */}
      {spot.id === 'S004' && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e2dc] flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1e2a4a] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#b02e1d] tracking-wider uppercase block">
                特殊認証ミッション
              </span>
              <h3 className="font-bold text-sm text-[#081534]">
                大提灯背景でピースサイン✌️
              </h3>
            </div>
          </div>

          {/* Viewfinder Frame */}
          <div className="relative rounded-xl overflow-hidden bg-[#081534] h-64 flex items-center justify-center border border-[#e5e2dc]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG44jAPPND_y-TFwt09GTmYlBYQr3hNAuVE12bQ4DkiGRP0HgTzMwfo91ycNkzTFS8KfP8J6TCpUWmlseFBxomOIkmQbuGTtwUHoeh9AMAcH-TbsEM7Y9DUGty6U_CioPYyiR-1BTfaS7i6WXnGgJCA10eooyby8CMNnMQVg8WnUA7ydFAXxKw5dXFxOgL4EaZEKGTbdGqpSbesjoSgN3th5znMnS0rlwPRRicd9wyHERjea_Daxs"
              alt="雷門AIカメラプレビュー"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081534]/70 via-transparent to-[#081534]/30 pointer-events-none" />

            {/* Live Sensor Chip */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1e2a4a]/85 backdrop-blur-md text-white text-[10px] font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ff6750] animate-pulse" />
              <span>LIVE AI SENSOR 30FPS</span>
            </div>

            {/* Corner Alignment Reticles */}
            <div className="absolute inset-4 pointer-events-none flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-5 h-5 border-t-2 border-l-2 border-amber-300" />
                <div className="w-5 h-5 border-t-2 border-r-2 border-amber-300" />
              </div>

              {/* Hand Pose Bounding Box */}
              <div className="self-end mr-2 mb-2 p-2 rounded-lg bg-[#1e2a4a]/80 backdrop-blur-sm text-white flex flex-col items-center gap-0.5 border border-[#ffdad4]/30 shadow-md">
                <div className="flex items-center gap-1 text-[#ffdad4] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[13px]">gesture</span>
                  <span>Pose: PEACE_SIGN</span>
                </div>
                <span className="text-[10px] text-[#bac5ee] font-mono">
                  一致率: 98.4%
                </span>
              </div>

              <div className="flex justify-between">
                <div className="w-5 h-5 border-b-2 border-l-2 border-amber-300" />
                <div className="w-5 h-5 border-b-2 border-r-2 border-amber-300" />
              </div>
            </div>

            {/* Bottom Guidance */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-[#081534]/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] whitespace-nowrap shadow border border-white/20">
              大提灯の「雷」の文字と手を枠内に収めてください
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            disabled={isAlreadyStamped || isAiProcessing}
            onClick={handleAiCameraCapture}
            className={`w-full py-3.5 px-4 rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isAlreadyStamped
                ? 'bg-[#f0eee8] text-[#45464e] cursor-default'
                : 'bg-[#b02e1d] text-white hover:bg-[#8e1407]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                isAiProcessing ? 'animate-spin' : ''
              }`}
            >
              {isAiProcessing
                ? 'progress_activity'
                : isAlreadyStamped
                ? 'task_alt'
                : 'photo_camera'}
            </span>
            <span>
              {isAiProcessing
                ? 'AI骨格・提灯解析中...'
                : isAlreadyStamped
                ? 'AI認証完了済み（名宝朱印獲得済）'
                : '撮影してAI判定する'}
            </span>
          </button>
        </div>
      )}

      {/* 2. S007: History Quiz (スカイツリー) */}
      {spot.id === 'S007' && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e2dc] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#081534] text-white text-xs font-bold flex items-center justify-center">
                問
              </span>
              <span className="text-xs font-bold text-[#081534]">
                歴史・構造クイズ判定
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dae2ff] text-[#081534] font-bold">
              GPS + 知識二重認証
            </span>
          </div>

          <h3 className="font-bold text-sm text-[#081534] leading-snug">
            {SKYTREE_QUIZ.question}
          </h3>

          {/* Quiz options */}
          <div className="flex flex-col gap-2">
            {SKYTREE_QUIZ.options.map((opt) => {
              const isSelected = selectedQuizOption === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedQuizOption(opt.id)}
                  className={`w-full p-3 rounded-xl text-left flex items-center justify-between transition-all active:scale-[0.99] border ${
                    isSelected
                      ? 'bg-[#1e2a4a] text-white border-[#1e2a4a] shadow-sm'
                      : 'bg-[#f6f3ed] text-[#1c1c18] border-[#e5e2dc] hover:bg-[#ebe8e2]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                        isSelected
                          ? 'bg-white text-[#081534]'
                          : 'bg-[#e5e2dc] text-[#45464e]'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-xs font-semibold">{opt.text}</span>
                  </div>
                  {opt.subText && (
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'text-[#bac5ee]' : 'text-[#76777f]'
                      }`}
                    >
                      {opt.subText}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Trivia explanation */}
          <div className="p-3 rounded-xl bg-[#f6f3ed] border border-[#e5e2dc] text-xs text-[#45464e]">
            <p className="font-bold text-[#081534] flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[15px] text-[#b02e1d]">
                lightbulb
              </span>
              下町豆知識
            </p>
            <p className="leading-relaxed">
              {SKYTREE_QUIZ.explanation}
            </p>
          </div>

          {quizError && (
            <p className="text-xs text-[#ba1a1a] font-bold text-center">
              不正解です。正解は武蔵（むさし）の語呂合わせの選択肢です！
            </p>
          )}

          <button
            type="button"
            disabled={isAlreadyStamped || isSubmitting}
            onClick={handleQuizSubmit}
            className={`w-full py-3.5 px-4 rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isAlreadyStamped || quizAnswered
                ? 'bg-[#f0eee8] text-[#45464e] cursor-default'
                : 'bg-[#b02e1d] text-white hover:bg-[#8e1407]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAlreadyStamped ? 'task_alt' : 'fact_check'}
            </span>
            <span>
              {isAlreadyStamped
                ? 'クイズ正解・押印完了済み'
                : '回答を確定してスタンプ判定'}
            </span>
          </button>
        </div>
      )}

      {/* 3. S005: AR Signboard scan (仲見世商店街) */}
      {spot.id === 'S005' && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e2dc] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#081534] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#b02e1d]">
                view_in_ar
              </span>
              達成条件：AR看板タップ認証
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                isArVerified
                  ? 'bg-[#ffdad4] text-[#b02e1d]'
                  : 'bg-[#f0eee8] text-[#45464e]'
              }`}
            >
              {isArVerified ? '照合完了' : '未照合'}
            </span>
          </div>

          <p className="text-xs text-[#45464e] leading-relaxed">
            商店街エリア内でのチェックイン＋江戸文字AR看板タップ認証を行うことで御朱印が解放されます。
          </p>

          <button
            type="button"
            onClick={() => {
              triggerHaptic(40);
              playHyoshigi(0);
              setIsArVerified(true);
            }}
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              isArVerified
                ? 'bg-[#f0eee8] text-[#081534] border-[#c6c6cf]'
                : 'bg-[#f6f3ed] text-[#b02e1d] border-[#ffdad4] hover:bg-[#ffdad4]/40 active:scale-95'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isArVerified ? 'check' : 'center_focus_weak'}
            </span>
            <span>
              {isArVerified
                ? '認証済み（仲見世 江戸文字看板）'
                : '江戸文字看板をARスキャンして認証'}
            </span>
          </button>
        </div>
      )}

      {/* Facility Description & History */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e2dc] flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-[#081534]">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <h3 className="font-bold text-sm">施設由縁・みどころ</h3>
        </div>
        <p className="text-xs text-[#1c1c18] leading-relaxed">
          {spot.historyDescription}
        </p>
      </div>

      {/* Stamp Slot Visual (The Goshuin preview) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e2dc] flex flex-col items-center text-center gap-3">
        <span className="text-[10px] text-[#45464e] font-bold tracking-widest uppercase">
          SEAL ACQUISITION SLOT
        </span>
        <h4 className="font-bold text-sm text-[#081534]">
          {spot.order}：{spot.sealName}
        </h4>

        {/* Circular Slot Frame */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center p-2 transition-transform duration-500 shadow-inner ${
              isAlreadyStamped ? 'bg-[#ffdad4]/40 scale-100' : 'bg-[#f0eee8]'
            }`}
          >
            {isAlreadyStamped ? (
              spot.useImageStamp && spot.stampImageUrl ? (
                <img
                  src={spot.stampImageUrl}
                  alt={spot.sealName}
                  className="w-full h-full object-contain filter contrast-125 animate-stamp-slam"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#b02e1d] flex flex-col items-center justify-center text-white transform rotate-[-4deg] p-1 shadow animate-stamp-slam">
                  <span className="text-[9px] font-bold tracking-widest">
                    {spot.sealSubText}
                  </span>
                  <span className="text-2xl font-black font-epilogue leading-none my-0.5">
                    {spot.sealKanji}
                  </span>
                  <span className="text-[8px] font-bold bg-[#ffdad4] text-[#400200] px-1.5 rounded">
                    {spot.sealDateText}
                  </span>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center text-[#76777f]">
                <span className="material-symbols-outlined text-[32px] opacity-40">
                  approval
                </span>
                <span className="text-xs font-bold mt-1 text-[#45464e]">未押印</span>
                <span className="text-[10px] text-[#76777f]">チェックインで獲得</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-[#45464e]">
          {isAlreadyStamped
            ? 'デジタル御朱印帖に正式記録されました。'
            : '現地GPSゾーンに到達しました。下のボタンをタップして押印してください。'}
        </p>

        {/* Standard Stamp Button for GPS spots */}
        {spot.id !== 'S004' && spot.id !== 'S007' && (
          <button
            type="button"
            disabled={isAlreadyStamped || isSubmitting}
            onClick={handleExecuteStamp}
            className={`w-full py-3.5 px-4 rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isAlreadyStamped
                ? 'bg-[#f0eee8] text-[#45464e] cursor-default'
                : 'bg-[#b02e1d] text-white hover:bg-[#8e1407]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAlreadyStamped ? 'check_circle' : 'approval'}
            </span>
            <span>
              {isAlreadyStamped
                ? '押印完了済み（獲得記録完了）'
                : `${spot.name}の御朱印を押印する`}
            </span>
          </button>
        )}
      </div>

      {/* Special Perk info if available */}
      {spot.perk && (
        <div className="bg-[#f6f3ed] rounded-2xl p-3.5 border border-[#e5e2dc] flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#ffdad4] text-[#b02e1d] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <span className="material-symbols-outlined text-[20px]">redeem</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#b02e1d]">★来訪特典</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#081534] font-bold border border-[#e5e2dc]">
                {spot.perk.badge}
              </span>
            </div>
            <p className="text-xs font-bold text-[#081534] mt-0.5">
              {spot.perk.title}
            </p>
            <p className="text-[11px] text-[#45464e] mt-0.5 leading-snug">
              {spot.perk.description}
            </p>
          </div>
        </div>
      )}

      {/* Next Spot Card */}
      {nextSpot && (
        <div className="bg-white rounded-2xl p-3.5 border border-[#e5e2dc] flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#081534] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">directions_walk</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#45464e] font-bold">次の巡拝スポット</span>
              <p className="text-xs font-bold text-[#081534] truncate">
                {nextSpot.code} {nextSpot.name}
              </p>
              <span className="text-[10px] text-[#76777f]">
                {spot.nextSpotDistance || '近隣ルート'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onGoBack}
            className="w-8 h-8 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#081534] hover:bg-[#ebe8e2] shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      )}

      {/* Bottom Dual Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          type="button"
          onClick={onGoBack}
          className="h-12 px-3 rounded-full bg-white text-[#081534] shadow-sm border border-[#e5e2dc] hover:bg-[#f6f3ed] transition-colors flex items-center justify-center gap-1.5 text-xs font-bold"
        >
          <span className="material-symbols-outlined text-[18px]">map</span>
          <span>周辺地図を開く</span>
        </button>

        <button
          type="button"
          onClick={onGoToStampBook}
          className="h-12 px-3 rounded-full bg-white text-[#081534] shadow-sm border border-[#e5e2dc] hover:bg-[#f6f3ed] transition-colors flex items-center justify-center gap-1.5 text-xs font-bold"
        >
          <span className="material-symbols-outlined text-[18px]">auto_stories</span>
          <span>御朱印帖を見る</span>
        </button>
      </div>
    </div>
  );
};
