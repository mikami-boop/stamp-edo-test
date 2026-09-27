import React, { useState } from 'react';
import { playTaikoDrum, shoutDosukoi, triggerHaptic } from '../utils/audio';

interface StartScreenProps {
  onStartRally: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartRally }) => {
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDosukoiSplash, setShowDosukoiSplash] = useState(false);

  const handleStart = () => {
    if (!agreed || isProcessing) return;

    setIsProcessing(true);
    triggerHaptic([60, 40, 100]);

    // 1. Web Audio & Speech synthesis
    playTaikoDrum(0, 140, 1.2);
    shoutDosukoi();

    // 2. Animated splash modal
    setShowDosukoiSplash(true);

    setTimeout(() => {
      setShowDosukoiSplash(false);
      setIsProcessing(false);
      onStartRally();
    }, 1800);
  };

  return (
    <div className="flex flex-col relative w-full max-w-[480px] mx-auto bg-[#fcf9f3] min-h-screen pb-12 selection:bg-[#ffdad4] selection:text-[#400200]">
      {/* Hero Visual Section */}
      <div className="relative w-full rounded-b-2xl overflow-hidden shadow-md bg-[#f6f3ed] mb-5">
        <div
          className="w-full bg-cover bg-center relative flex flex-col justify-end p-5 pb-8 min-h-[440px]"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida/AEtjO1WtCEFxFLz4W17kR1L-4gyJnAUlm2SDvHC54VzoS7w2khNARpZjlTkmoGjExpchT5Nbi-xZauhbCv3tq7zeqXZzTebh8yb-Gl2crU_j6IpJHxgTky9_igo0Q8IUepUp6NL7V98jGRh6QFcDQaBt8YZy70CwyWIDx1QY6iTIuIHS9hTw_Ks_UE5O2H674gsevY5lQZdt9SmqYzwIh1zAmyWgPbKVzXfe1UZXTsXWsyQecIeZRZucbofytQ")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#081534] via-[#081534]/55 to-transparent" />

          <div className="relative z-10 flex flex-col gap-2.5">
            <div className="flex flex-col items-center justify-center text-center my-4 select-none">
              <h1
                className="text-white font-bold tracking-widest text-4xl drop-shadow-md font-epilogue"
                style={{ letterSpacing: '0.22em' }}
              >
                両国 浅草
              </h1>
              <span
                className="text-[#ffdad4] text-[11px] font-bold tracking-widest uppercase mt-1 opacity-90 font-mono"
                style={{ letterSpacing: '0.28em' }}
              >
                RYOGOKU &amp; ASAKUSA
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-1 justify-center">
              <span className="bg-[#b02e1d] text-white text-[11px] px-3 py-1 rounded-full uppercase tracking-widest shadow-md font-bold">
                EDO-TOKYO RALLY
              </span>
              <span className="bg-[#081534]/85 backdrop-blur-sm text-[#ffdad4] text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-[#ffdad4]/30 font-semibold">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                参加登録不要・即時スタート
              </span>
            </div>

            <p className="text-white text-xs font-medium leading-relaxed drop-shadow-sm text-center px-2 opacity-95">
              粋な下町の歴史と現代が交差する名所6箇所をめぐるデジタル御朱印巡礼
            </p>
          </div>
        </div>

        {/* 4 Feature Highlights */}
        <div className="p-3.5 grid grid-cols-2 gap-2 bg-[#f6f3ed]">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white shadow-sm border border-[#e5e2dc]/60">
            <div className="w-8 h-8 rounded-full bg-[#ffdad4] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#b02e1d] text-[18px]">no_accounts</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#1c1c18] truncate">完全匿名・登録不要</span>
              <span className="text-[10px] text-[#45464e] truncate">個人情報ゼロ</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white shadow-sm border border-[#e5e2dc]/60">
            <div className="w-8 h-8 rounded-full bg-[#dae2ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#081534] text-[18px]">location_on</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#1c1c18] truncate">GPS自動判定</span>
              <span className="text-[10px] text-[#45464e] truncate">接近でスタンプ獲得</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white shadow-sm border border-[#e5e2dc]/60">
            <div className="w-8 h-8 rounded-full bg-[#f8d8ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#240d2d] text-[18px]">smart_toy</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#1c1c18] truncate">AI判定＆クイズ</span>
              <span className="text-[10px] text-[#45464e] truncate">体験型チェックイン</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white shadow-sm border border-[#e5e2dc]/60">
            <div className="w-8 h-8 rounded-full bg-[#ffb4a7] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#680400] text-[18px]">card_giftcard</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#1c1c18] truncate">全6箇所で限定景品</span>
              <span className="text-[10px] text-[#45464e] truncate">特製手ぬぐい引換券</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {/* 6 Spots Summary Overview */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#b02e1d] text-[20px]">tour</span>
              <h2 className="font-bold text-sm text-[#1c1c18]">巡回エリア・6スポット一覧</h2>
            </div>
            <span className="text-[11px] text-[#b02e1d] bg-[#ffdad4] px-2 py-0.5 rounded-full font-bold">
              全6印
            </span>
          </div>

          <div className="bg-[#f6f3ed] rounded-2xl p-3 flex flex-col gap-2.5 shadow-sm border border-[#e5e2dc]">
            {/* Area 1: Ryogoku */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#1c1c18] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#081534]" />
                  両国エリア (墨田・相撲と歴史)
                </span>
                <span className="text-[11px] text-[#45464e] font-semibold">2印</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded-xl flex flex-col items-center text-center shadow-sm">
                  <span className="material-symbols-outlined text-[#081534] text-[22px] mb-0.5">stadium</span>
                  <span className="text-xs text-[#1c1c18] font-bold truncate w-full">両国国技館</span>
                  <span className="text-[10px] text-[#76777f] font-mono">GPS</span>
                </div>
                <div className="bg-white p-2 rounded-xl flex flex-col items-center text-center shadow-sm">
                  <span className="material-symbols-outlined text-[#081534] text-[22px] mb-0.5">apartment</span>
                  <span className="text-xs text-[#1c1c18] font-bold truncate w-full">unifast</span>
                  <span className="text-[10px] text-[#76777f] font-mono">GPS</span>
                </div>
              </div>
            </div>

            {/* Area 2: Asakusa */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#1c1c18] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#b02e1d]" />
                  浅草エリア (台東・門前町)
                </span>
                <span className="text-[11px] text-[#45464e] font-semibold">2印</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded-xl flex flex-col items-center text-center shadow-sm border border-[#ffdad4]">
                  <span className="material-symbols-outlined text-[#b02e1d] text-[22px] mb-0.5">photo_camera</span>
                  <span className="text-xs text-[#1c1c18] font-bold truncate w-full">雷門</span>
                  <span className="text-[10px] text-[#b02e1d] font-bold font-mono">AI判定</span>
                </div>
                <div className="bg-white p-2 rounded-xl flex flex-col items-center text-center shadow-sm">
                  <span className="material-symbols-outlined text-[#b02e1d] text-[22px] mb-0.5">storefront</span>
                  <span className="text-xs text-[#1c1c18] font-bold truncate w-full">仲見世通り</span>
                  <span className="text-[10px] text-[#76777f] font-mono">GPS / AR</span>
                </div>
              </div>
            </div>

            {/* Area 3: Oshiage / Skytree */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#1c1c18] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3a2243]" />
                  スカイツリー・押上エリア
                </span>
                <span className="text-[11px] text-[#45464e] font-semibold">2印</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded-xl flex flex-col items-center text-center shadow-sm">
                  <span className="material-symbols-outlined text-[#081534] text-[22px] mb-0.5">tower</span>
                  <span className="text-xs text-[#1c1c18] font-bold truncate w-full">スカイツリー</span>
                  <span className="text-[10px] text-[#76777f] font-mono">クイズ</span>
                </div>
                <div className="bg-white p-2 rounded-xl flex flex-col items-center text-center shadow-sm">
                  <span className="material-symbols-outlined text-[#081534] text-[22px] mb-0.5">water_drop</span>
                  <span className="text-xs text-[#1c1c18] font-bold truncate w-full">すみだ水族館</span>
                  <span className="text-[10px] text-[#76777f] font-mono">GPS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Policy Scrollbox */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#081534] text-[20px]">policy</span>
              <h2 className="font-bold text-sm text-[#1c1c18]">利用規約・方針・不正防止ポリシー</h2>
            </div>
            <span className="text-[10px] text-[#76777f]">スクロールして確認</span>
          </div>

          <div className="bg-[#f6f3ed] rounded-2xl p-3.5 shadow-inner border border-[#e5e2dc]">
            <div className="h-40 overflow-y-auto pr-1 flex flex-col gap-3 text-[#45464e] text-xs">
              <div className="bg-white p-3 rounded-xl border border-[#e5e2dc]">
                <h3 className="font-bold text-[#081534] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#b02e1d]">gpp_maybe</span>
                  完全匿名性と個人情報保護について
                </h3>
                <p className="leading-relaxed">
                  本スタンプラリーでは、氏名・電話番号・メールアドレス等の個人情報は一切取得いたしません。ユーザー登録やアカウント作成の手間なく、どなたでも安心してお楽しみいただけます。
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#e5e2dc]">
                <h3 className="font-bold text-[#081534] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#081534]">my_location</span>
                  位置情報（GPS）の利用目的
                </h3>
                <p className="leading-relaxed">
                  スマートフォンの位置情報は「各ラリースポットへの接近・到達確認」のためだけにブラウザ内でリアルタイム照合されます。移動ログや滞在履歴がサーバーに送信・永続保存されることはありません。
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#e5e2dc]">
                <h3 className="font-bold text-[#081534] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#240d2d]">center_focus_strong</span>
                  カメラ機能とAI判定について
                </h3>
                <p className="leading-relaxed">
                  浅草寺雷門等の指定スポットにおけるAI画像判定は、お客様の端末（ブラウザ）上で即座に解析処理されます。撮影された写真が外部サーバーにアップロード・保存されることは一切ありません。
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#e5e2dc]">
                <h3 className="font-bold text-[#081534] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">warning</span>
                  安全上の注意（歩きスマホの禁止）
                </h3>
                <p className="leading-relaxed">
                  歩行中の画面注視は大変危険です。画面の確認やチェックイン操作は、必ず周囲の交通状況に配慮し、通行の妨げにならない安全な場所に立ち止まって行ってください。
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#e5e2dc]">
                <h3 className="font-bold text-[#081534] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#76777f]">shield</span>
                  不正防止システム
                </h3>
                <p className="leading-relaxed">
                  位置情報の偽装、連打、同一スポットでの短時間連続アクセスを検知した場合、クールダウンタイマーが自動作動しスタンプ押印を一時制限します。
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#ffdad4]">
                <h3 className="font-bold text-[#081534] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#b02e1d]">security</span>
                  不正行為・データ改ざん検知時の無効化ポリシー
                </h3>
                <p className="leading-relaxed">
                  本スタンプラリーでは、公平な運営を期すため、ローカルストレージデータの直接編集、位置情報の不正偽装（モックGPS）、スクリプト実行等による不正取得を常時検知しています。不正または改ざんが検知された場合、獲得済みスタンプおよび景品引換権利は事前の通告なく即座に全件無効（リセット）となりますのでご注意ください。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Consent Checkbox & Large Circular Sumo Button */}
        <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#e5e2dc]">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              id="termsConsent"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 rounded text-[#081534] focus:ring-[#081534] accent-[#081534] cursor-pointer shrink-0"
            />
            <span className="text-xs text-[#1c1c18] leading-relaxed">
              上記の<strong className="text-[#081534] font-semibold">利用規約</strong>、
              <strong className="text-[#081534] font-semibold">位置情報・カメラ方針</strong>、および
              <strong className="text-[#b02e1d] font-semibold">不正防止ポリシー</strong>に同意する
            </span>
          </label>

          {/* Large Circular Japanese Edo Sumo Styled Button */}
          <div className="flex flex-col items-center justify-center pt-2 pb-1 relative">
            <div className="relative flex items-center justify-center">
              {/* Outer Dohyo Dashed Ring Glow */}
              <div
                className={`absolute -inset-2 rounded-full border-2 border-dashed border-amber-400/50 pointer-events-none transition-opacity duration-300 ${
                  agreed ? 'opacity-100 animate-spin-slow' : 'opacity-0'
                }`}
              />

              <button
                type="button"
                aria-label="スタンプラリーを開始する"
                disabled={!agreed || isProcessing}
                onClick={handleStart}
                className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center p-3 transition-all duration-300 select-none ${
                  agreed
                    ? 'bg-gradient-to-b from-red-600 via-red-700 to-red-900 text-white border-4 border-amber-300 shadow-2xl pulse-active cursor-pointer active:scale-95'
                    : 'bg-[#e5e2dc] text-[#76777f] border-4 border-[#c6c6cf]/60 cursor-not-allowed shadow-none'
                }`}
              >
                {/* Inner decorative rim */}
                <div
                  className={`absolute inset-1.5 rounded-full pointer-events-none ${
                    agreed
                      ? 'border-2 border-dashed border-amber-200/80'
                      : 'border border-dashed border-[#76777f]/30'
                  }`}
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <span
                    className={`material-symbols-outlined text-3xl mb-0.5 transition-transform duration-200 ${
                      isProcessing ? 'animate-spin' : ''
                    }`}
                  >
                    {isProcessing ? 'progress_activity' : 'sports_kabaddi'}
                  </span>
                  <span
                    className={`text-xs tracking-widest font-bold mb-0.5 ${
                      agreed ? 'text-amber-200' : 'opacity-80'
                    }`}
                  >
                    いざ出立
                  </span>
                  <span
                    className="text-2xl font-black tracking-wider leading-tight font-epilogue"
                  >
                    どすこい！
                  </span>
                  <span
                    className={`text-[10px] tracking-wider mt-1 font-semibold ${
                      agreed ? 'text-amber-100' : 'opacity-75'
                    }`}
                  >
                    ラリー開始
                  </span>
                </div>
              </button>
            </div>

            <p className="text-xs text-[#76777f] font-medium mt-3 text-center transition-opacity duration-200">
              {agreed ? (
                <span className="text-[#b02e1d] font-bold flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">touch_app</span>
                  大ボタンをタップしていざ出立！
                </span>
              ) : (
                '※ 規約に同意するとボタンが押せるようになります'
              )}
            </p>
          </div>
        </div>

        {/* Footer Scrim */}
        <div className="flex items-center justify-center gap-3 text-[#76777f] text-[11px] py-1 text-center">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            プライバシー最優先設計
          </span>
          <span>•</span>
          <span>墨田区・台東区 観光振興協力</span>
        </div>
      </div>

      {/* Sumo Splash & Shout Banner Overlay */}
      {showDosukoiSplash && (
        <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/60 backdrop-blur-[3px] transition-opacity duration-300">
          <div className="flex flex-col items-center justify-center p-6 text-center animate-dosukoi">
            <div className="relative flex items-center justify-center mb-3">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-amber-600 border-4 border-amber-300 shadow-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-amber-200 animate-bounce">
                  sports_kabaddi
                </span>
              </div>
              <div className="absolute -inset-4 rounded-full border-4 border-amber-400/60 animate-ping opacity-60" />
            </div>

            <div className="bg-gradient-to-r from-red-700 via-amber-600 to-red-700 text-white font-black text-4xl px-8 py-3 rounded-2xl shadow-2xl border-2 border-amber-300 tracking-widest drop-shadow-lg font-epilogue">
              どすこい！
            </div>

            <p className="text-amber-200 font-bold text-lg mt-3 drop-shadow bg-black/70 px-5 py-1.5 rounded-full border border-amber-300/40">
              両国・浅草ラリーへ出立！
            </p>

            <div className="flex items-center gap-2 mt-3 text-white/90 text-sm">
              <span className="material-symbols-outlined animate-spin text-base">
                progress_activity
              </span>
              <span>GPS連動スタンバイ中...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
