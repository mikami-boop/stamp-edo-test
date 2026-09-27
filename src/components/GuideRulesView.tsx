import React from 'react';
import { triggerHaptic } from '../utils/audio';

interface GuideRulesViewProps {
  onResetData: () => void;
  onGoToStartScreen: () => void;
}

export const GuideRulesView: React.FC<GuideRulesViewProps> = ({
  onResetData,
  onGoToStartScreen,
}) => {
  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto pb-28 px-4 pt-2 gap-4 selection:bg-[#ffdad4] selection:text-[#400200]">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-[#1e2a4a] text-white text-[10px] font-bold tracking-wider uppercase">
            公式ガイドブック
          </span>
          <span className="text-[11px] text-[#45464e] font-semibold">
            安全・円滑な巡拝のために
          </span>
        </div>
        <h2 className="text-2xl font-black text-[#081534] tracking-tight font-epilogue">
          参加の手引き・利用規約
        </h2>
        <p className="text-xs text-[#45464e] leading-relaxed">
          下町めぐりデジタル御朱印ラリーを安心・安全にお楽しみいただくためのルールと案内です。
        </p>
      </div>

      {/* 1. 参加の流れ */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e2dc] flex flex-col gap-3">
        <h3 className="font-bold text-sm text-[#081534] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#b02e1d]">
            route
          </span>
          スタンプラリー参加の流れ
        </h3>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#1e2a4a] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#081534]">
                名所スポットへ移動
              </span>
              <p className="text-[11px] text-[#45464e] leading-relaxed">
                両国・浅草・押上（スカイツリー）の全6スポットへ足を運びます。巡る順序は自由です。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#1e2a4a] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#081534]">
                50m圏内でチェックイン認証
              </span>
              <p className="text-[11px] text-[#45464e] leading-relaxed">
                スポットに接近するとGPSが自動照合。雷門ではAIカメラ、スカイツリーではクイズ認証を行います。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#1e2a4a] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#081534]">
                御朱印スタンプ獲得
              </span>
              <p className="text-[11px] text-[#45464e] leading-relaxed">
                和太鼓の音とともにデジタル御朱印が帳面に刻印されます。各所の来訪特典もチェック！
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#b02e1d] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              4
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#b02e1d]">
                全6印達成で特製記念品受取
              </span>
              <p className="text-[11px] text-[#45464e] leading-relaxed">
                景品交換カウンターのスタッフに認証コードを提示し、特製下町藍染手ぬぐいを受領します。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 位置情報と安全上の注意 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e2dc] flex flex-col gap-3">
        <h3 className="font-bold text-sm text-[#081534] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">
            warning
          </span>
          安全上の注意とマナー
        </h3>

        <div className="p-3 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] text-xs text-[#93000a] leading-relaxed">
          <strong className="block mb-1 font-bold">歩きスマホは絶対におやめください</strong>
          画面を見ながらの歩行は周囲の歩行者や自転車との接触事故につながり大変危険です。画面の確認やスタンプ押印は、必ず周囲の安全を確認した上で立ち止まって行ってください。
        </div>

        <ul className="text-xs text-[#45464e] space-y-1.5 list-disc list-inside">
          <li>寺社仏閣の境内では、参拝者の通行や祈祷の妨げにならないようご配慮ください。</li>
          <li>商店街では周囲の店舗の営業や列の妨げにならない位置で操作してください。</li>
          <li>熱中症対策のため、こまめな水分補給と休憩を心がけてください。</li>
        </ul>
      </div>

      {/* 3. プライバシーと不正防止 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e2dc] flex flex-col gap-2.5">
        <h3 className="font-bold text-sm text-[#081534] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#081534]">
            security
          </span>
          プライバシー保護方針
        </h3>
        <p className="text-xs text-[#45464e] leading-relaxed">
          本アプリはユーザー登録不要・完全匿名でご利用いただけます。位置情報およびカメラ画像は端末内のリアルタイム判定にのみ使用され、外部サーバーに送信または保存されることはありません。
        </p>
      </div>

      {/* 4. 運営情報 & デモ初期化 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5e2dc] flex flex-col gap-3">
        <h3 className="font-bold text-sm text-[#081534]">
          企画・運営・協力
        </h3>
        <div className="text-xs text-[#45464e] leading-relaxed space-y-1">
          <p><strong>企画協力:</strong> 墨田区・台東区 観光振興協力</p>
          <p><strong>特別協賛:</strong> ユニファスト株式会社 (unifast co.,ltd)</p>
          <p><strong>御朱印意匠監修:</strong> 江戸伝統工芸木版職人・寺社意匠伝承会</p>
        </div>

        <div className="pt-2 border-t border-[#e5e2dc] flex flex-col gap-2">
          <button
            type="button"
            onClick={onGoToStartScreen}
            className="w-full py-2.5 rounded-xl bg-[#f6f3ed] text-[#081534] text-xs font-bold border border-[#e5e2dc] hover:bg-[#ebe8e2] active:scale-95 transition-all"
          >
            出立画面（スタート画面）を確認する
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic(50);
              if (window.confirm('スタンプ進行状況をリセットして最初から体験しますか？')) {
                onResetData();
              }
            }}
            className="w-full py-2 rounded-xl text-xs text-[#76777f] hover:text-[#ba1a1a] transition-colors"
          >
            進行状況を初期化（テスト・リセット）
          </button>
        </div>
      </div>
    </div>
  );
};
