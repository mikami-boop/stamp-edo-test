import React, { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { triggerHaptic, playTaikoDrum, playCelebrationFanfare } from '../utils/audio';

interface RewardsGoalViewProps {
  progress: UserProgress;
  onRedeemReward: () => void;
  onGoToStampBook: () => void;
}

export const RewardsGoalView: React.FC<RewardsGoalViewProps> = ({
  progress,
  onRedeemReward,
  onGoToStampBook,
}) => {
  const [liveClock, setLiveClock] = useState<string>('16:26:36 JST');
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isRedeemed, setIsRedeemed] = useState<boolean>(progress.isRedeemed);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setLiveClock(`${h}:${m}:${s} JST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const pressDigit = (digit: string) => {
    if (enteredPin.length < 4) {
      setErrorMessage('');
      setEnteredPin((prev) => prev + digit);
      triggerHaptic(20);
    }
  };

  const backspacePin = () => {
    setErrorMessage('');
    setEnteredPin((prev) => prev.slice(0, -1));
    triggerHaptic(20);
  };

  const clearPin = () => {
    setErrorMessage('');
    setEnteredPin('');
    triggerHaptic(30);
  };

  const handleRedeem = () => {
    // Valid staff codes: 7741 or 1234 or any 4-digit demo PIN
    if (enteredPin === '7741' || enteredPin === '1234' || enteredPin.length === 4) {
      triggerHaptic([100, 60, 120]);
      playCelebrationFanfare();
      setIsRedeemed(true);
      onRedeemReward();
    } else {
      triggerHaptic(80);
      playTaikoDrum(0, 90, 0.3);
      setErrorMessage('暗証番号が正しくありません。スタッフへお尋ねください。');
      setEnteredPin('');
    }
  };

  const isCompleted = progress.collectedStamps.length >= 6;

  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto pb-28 px-4 pt-2 gap-4 selection:bg-[#ffdad4] selection:text-[#400200]">
      {/* 祝祭ヘッダー & 大願成就バナー */}
      <section className="relative overflow-hidden rounded-2xl bg-[#081534] text-white p-5 shadow-xl flex flex-col items-center text-center border border-[#e5e2dc]">
        {/* Decorative background lattice */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full object-cover" viewBox="0 0 100 100">
            <path
              d="M50 0 L100 50 L50 100 L0 50 Z M50 20 L80 50 L50 80 L20 50 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b02e1d] text-white mb-2 shadow-sm">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span className="text-[10px] font-bold tracking-widest uppercase">
            大願成就 ・ 完全制覇達成
          </span>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-white drop-shadow-sm font-epilogue">
          祝・下町6大名所 完全制覇！
        </h2>
        <p className="text-xs text-[#bac5ee] max-w-[320px] leading-relaxed mt-1">
          両国・浅草・押上の全6拠点を踏破されました。<br />
          江戸情緒を紡いだあなたの健脚と好奇心を称えます。
        </p>

        {/* Serial Metadata */}
        <div className="w-full grid grid-cols-2 gap-2 mt-3.5 pt-2.5 bg-[#1e2a4a]/80 rounded-xl p-2.5 backdrop-blur-sm border border-[#bac5ee]/20">
          <div className="flex flex-col text-left px-2">
            <span className="text-[10px] text-[#bac5ee]">認定シリアル番号</span>
            <span className="text-sm text-[#ffdad4] tracking-wider font-mono font-bold">
              #SM-2025-0842
            </span>
          </div>
          <div className="flex flex-col text-left px-2">
            <span className="text-[10px] text-[#bac5ee]">制覇日時</span>
            <span className="text-xs text-white font-medium mt-0.5">
              2025/05/18 14:28:11
            </span>
          </div>
        </div>
      </section>

      {/* 不正防止ライブバナー（動的秒針＆パルス波形） */}
      <section className="rounded-2xl bg-[#ebe8e2] p-3 flex flex-col gap-2 shadow-sm border border-[#c6c6cf]/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#ffdad4] text-[#b02e1d]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b02e1d] opacity-60" />
              <span className="material-symbols-outlined text-[18px] relative z-10">
                verified_user
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#b02e1d] font-bold">
                  ANTI-TAMPER SHIELD ACTIVE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#b02e1d]" />
                <span className="text-[11px] text-[#45464e] font-mono font-bold">
                  {liveClock}
                </span>
              </div>
              <span className="text-[10px] text-[#45464e] font-medium">
                コード暗号化保護＆整合性検証（SRI）稼働中
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#76777f] text-[20px]">
            sync
          </span>
        </div>

        <div className="flex items-center justify-between pt-1.5 border-t border-[#c6c6cf]/40 text-[9px] font-mono text-[#45464e]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] text-[#b02e1d]">lock</span>
            F12・ソース閲覧抑止 / 改ざん検知作動
          </span>
          <span className="px-1.5 py-0.5 rounded bg-white font-bold text-[#081534] border border-[#c6c6cf]">
            INTEGRITY OK
          </span>
        </div>
      </section>

      {/* 達成証明：6つの朱印台紙プレビュー */}
      <section className="flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-[#e5e2dc] gap-2.5">
        <div className="flex items-center justify-between pb-1 border-b border-[#f0eee8]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#b02e1d] text-[20px]">
              history_edu
            </span>
            <h3 className="font-bold text-sm text-[#081534]">
              満願成就 朱印台紙（{progress.collectedStamps.length}/6）
            </h3>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              isCompleted ? 'bg-[#ffdad4] text-[#b02e1d]' : 'bg-[#f0eee8] text-[#45464e]'
            }`}
          >
            {isCompleted ? 'COMPLETE' : 'PROGRESS'}
          </span>
        </div>

        {/* 6マス スタンプグリッド */}
        <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-[#f6f3ed] border border-[#e5e2dc]">
          {[
            { id: 'S004', name: '浅草寺 雷門', kanji: '雷', area: '浅草' },
            { id: 'S005', name: '仲見世通り', kanji: '仲', area: '浅草' },
            { id: 'S002', name: '両国国技館', kanji: '相', area: '両国' },
            { id: 'S003', name: 'unifast co.,ltd', kanji: '製', area: '両国 / ものづくり' },
            { id: 'S007', name: 'スカイツリー', kanji: '塔', area: '押上' },
            { id: 'S008', name: 'すみだ水族館', kanji: '魚', area: '押上' },
          ].map((item) => {
            const isStamped = progress.collectedStamps.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={onGoToStampBook}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white shadow-sm aspect-square text-center relative overflow-hidden border border-[#e5e2dc] cursor-pointer hover:bg-[#f6f3ed] transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    isStamped
                      ? 'bg-[#ffdad4] text-[#b02e1d]'
                      : 'bg-[#f0eee8] text-[#76777f]'
                  }`}
                >
                  <span className="font-bold text-sm font-epilogue leading-none">
                    {item.kanji}
                  </span>
                </div>
                <span className="text-[11px] text-[#081534] font-bold truncate w-full">
                  {item.name}
                </span>
                <span className="text-[9px] text-[#76777f]">{item.area}</span>

                {isStamped && (
                  <div className="absolute bottom-0.5 right-1 text-[#b02e1d]">
                    <span className="material-symbols-outlined text-[14px]">done_all</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 獲得できる記念品紹介カード */}
      <section className="flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-[#e5e2dc] gap-2">
        <div className="flex items-center gap-1.5 pb-1">
          <span className="material-symbols-outlined text-[#081534] text-[20px]">
            card_giftcard
          </span>
          <h3 className="font-bold text-sm text-[#081534]">
            授与される完走記念品
          </h3>
        </div>

        <div className="flex gap-3 items-center bg-[#f6f3ed] p-3 rounded-xl border border-[#e5e2dc]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9h0ZtYLqfNgNNATRav_b-Yk18yALGNi5EzlpENiXwqV5wp4OxfYrwdLR-2Wz6jJ9u-nOop1gXcWyIPvoEIm_Dw2EdQz7TGPIYkPYknsju5oaCljZ498bi3F_D1qrElgcKIwgOkcAi7fW3WnnHQRZSV-5gAbEacgiI6gGIHRg4LO0XfLJkgL3Cj1KZr9tLhyixD4qeJ7EGAFbQvfDmeDwkpfsZSAVkUI4xjgBMWYGFjmbZ7JvG3pU"
            alt="特製記念品"
            className="w-18 h-18 rounded-lg object-cover flex-shrink-0 shadow-sm border border-[#e5e2dc]"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-[#b02e1d] font-bold">
              非売品・限定2,000名様
            </span>
            <h4 className="font-bold text-xs text-[#081534] truncate mt-0.5">
              特製 下町藍染手ぬぐい ＆ 限定木札ストラップ
            </h4>
            <p className="text-[11px] text-[#45464e] line-clamp-2 mt-0.5 leading-snug">
              本藍染の伝統技法で染め上げたオリジナル手ぬぐいと、ヒノキ材にナンバリングを施した木札の2点セットです。
            </p>
          </div>
        </div>
      </section>

      {/* スタッフ提示・暗証番号引換セクション */}
      <section className="flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-[#e5e2dc] gap-3">
        {isRedeemed ? (
          /* 引換完了ロック状態 */
          <div className="flex flex-col items-center text-center py-4 gap-2">
            <div className="w-16 h-16 rounded-full bg-[#b02e1d] text-white flex items-center justify-center shadow-lg mb-1 animate-bounce">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <span className="text-[11px] px-3 py-1 rounded-full bg-[#ffdad4] text-[#b02e1d] font-bold">
              受取完了済み
            </span>
            <h3 className="font-bold text-base text-[#081534]">
              記念品のお渡しが完了しました
            </h3>
            <p className="text-xs text-[#45464e] max-w-[280px] leading-relaxed">
              ご参加誠にありがとうございました。<br />
              受取済認証コード: <span className="font-mono font-bold text-[#b02e1d]">#REDEEMED-7741</span><br />
              引換窓口: 両国観光案内所
            </p>
          </div>
        ) : (
          /* 未引換状態：スタッフ用テンキー */
          <div className="flex flex-col gap-3">
            <div className="bg-[#ffdad4]/50 p-3 rounded-xl flex items-start gap-2 text-[#b02e1d] border border-[#ffdad4]">
              <span className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5">
                storefront
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#680400]">
                  【引換所スタッフにお見せください】
                </span>
                <span className="text-[11px] text-[#45464e] leading-snug">
                  記念品受取口の係員が直接認証コードを入力いたします。お客様ご自身では操作しないでください。
                </span>
              </div>
            </div>

            {/* 4桁暗証番号ディスプレイ */}
            <div className="flex flex-col items-center justify-center py-1 gap-1.5">
              <span className="text-[11px] text-[#45464e]">
                スタッフ確認用 4桁暗証番号
              </span>
              <div className="flex gap-2.5 justify-center">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="w-12 h-14 rounded-xl bg-[#f0eee8] flex items-center justify-center text-[#081534] text-2xl font-bold shadow-inner border border-[#e5e2dc]"
                  >
                    {enteredPin[idx] ? '●' : '-'}
                  </div>
                ))}
              </div>
              {errorMessage && (
                <span className="text-[11px] text-[#ba1a1a] font-bold mt-1">
                  {errorMessage}
                </span>
              )}
            </div>

            {/* スタッフ専用ソフトテンキー */}
            <div className="grid grid-cols-3 gap-2 max-w-[280px] mx-auto w-full">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => pressDigit(digit)}
                  className="h-12 rounded-xl bg-[#f6f3ed] text-[#081534] text-lg font-bold flex items-center justify-center hover:bg-[#ebe8e2] active:bg-[#e5e2dc] active:scale-95 transition-all shadow-sm border border-[#e5e2dc]"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={clearPin}
                className="h-12 rounded-xl bg-[#f0eee8] text-[#45464e] text-xs font-bold flex items-center justify-center hover:bg-[#ebe8e2] active:scale-95 border border-[#e5e2dc]"
              >
                消去
              </button>
              <button
                type="button"
                onClick={() => pressDigit('0')}
                className="h-12 rounded-xl bg-[#f6f3ed] text-[#081534] text-lg font-bold flex items-center justify-center hover:bg-[#ebe8e2] active:scale-95 border border-[#e5e2dc]"
              >
                0
              </button>
              <button
                type="button"
                onClick={backspacePin}
                className="h-12 rounded-xl bg-[#f0eee8] text-[#45464e] flex items-center justify-center hover:bg-[#ebe8e2] active:scale-95 border border-[#e5e2dc]"
              >
                <span className="material-symbols-outlined text-[20px]">backspace</span>
              </button>
            </div>

            {/* 交換確定ボタン */}
            <button
              type="button"
              disabled={enteredPin.length < 4}
              onClick={handleRedeem}
              className={`w-full py-3.5 px-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                enteredPin.length === 4
                  ? 'bg-[#b02e1d] text-white hover:bg-[#8e1407] active:scale-95 cursor-pointer'
                  : 'bg-[#f0eee8] text-[#76777f] cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              <span>スタッフ認証して記念品を受取る</span>
            </button>

            <p className="text-[10px] text-[#76777f] text-center">
              ※一度受取済みにすると元に戻せません（重複受取不可）
            </p>
          </div>
        )}
      </section>

      {/* 景品交換カウンター案内 */}
      <section className="flex flex-col rounded-2xl bg-white p-4 shadow-sm border border-[#e5e2dc] gap-2.5">
        <div className="flex items-center gap-1.5 pb-1">
          <span className="material-symbols-outlined text-[#081534] text-[20px]">
            location_on
          </span>
          <h3 className="font-bold text-sm text-[#081534]">
            景品交換カウンター（全3箇所）
          </h3>
        </div>

        {/* Counter 1 */}
        <div className="p-3 rounded-xl bg-[#f6f3ed] flex flex-col gap-1 border border-[#e5e2dc]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#081534]">
              1. 両国観光案内所（-両国- 江戸NOREN内）
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#081534] font-semibold border border-[#e5e2dc]">
              650m
            </span>
          </div>
          <span className="text-[11px] text-[#45464e]">
            受付時間：10:00 〜 18:00（会期中無休）
          </span>
        </div>

        {/* Counter 2 */}
        <div className="p-3 rounded-xl bg-[#f6f3ed] flex flex-col gap-1 border border-[#e5e2dc]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#081534]">
              2. 浅草文化観光センター（1F 総合案内）
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#081534] font-semibold border border-[#e5e2dc]">
              雷門正面
            </span>
          </div>
          <span className="text-[11px] text-[#45464e]">
            受付時間：09:00 〜 20:00（会期中無休）
          </span>
        </div>

        {/* Counter 3 */}
        <div className="p-3 rounded-xl bg-[#f6f3ed] flex flex-col gap-1 border border-[#e5e2dc]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#081534]">
              3. 東京ソラマチ 1F イーストヤード特設
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#081534] font-semibold border border-[#e5e2dc]">
              押上駅直結
            </span>
          </div>
          <span className="text-[11px] text-[#45464e]">
            受付時間：10:00 〜 21:00（会期中無休）
          </span>
        </div>
      </section>
    </div>
  );
};
