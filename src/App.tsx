import { useState, useEffect } from 'react';
import { Spot, UserProgress } from './types';
import { SPOTS_DATA } from './data/spotsData';
import { getStoredProgress, saveStoredProgress, resetStoredProgress } from './utils/storage';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { StartScreen } from './components/StartScreen';
import { MapView } from './components/MapView';
import { StampBookView } from './components/StampBookView';
import { CheckinActiveView } from './components/CheckinActiveView';
import { RewardsGoalView } from './components/RewardsGoalView';
import { GuideRulesView } from './components/GuideRulesView';
import { SealModal } from './components/SealModal';
import { CelebrationModal } from './components/CelebrationModal';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress);
  const [hasStarted, setHasStarted] = useState<boolean>(progress.termsAccepted);
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [activeSpot, setActiveSpot] = useState<Spot | null>(null);
  const [inspectingSpot, setInspectingSpot] = useState<Spot | null>(null);

  const [celebrationData, setCelebrationData] = useState<{
    isOpen: boolean;
    title: string;
    subDesc: string;
    kanjiMain?: string;
    stampText?: string;
    stampImageUrl?: string;
  }>({
    isOpen: false,
    title: '',
    subDesc: '',
  });

  // Keep storage synced
  useEffect(() => {
    saveStoredProgress(progress);
  }, [progress]);

  const handleStartRally = () => {
    const updated: UserProgress = {
      ...progress,
      termsAccepted: true,
    };
    setProgress(updated);
    setHasStarted(true);
    setActiveTab('map');
  };

  const handleStampCollected = (spotId: string) => {
    setProgress((prev) => {
      if (prev.collectedStamps.includes(spotId)) return prev;
      const nextStamps = [...prev.collectedStamps, spotId];
      const isComplete = nextStamps.length >= 6;
      return {
        ...prev,
        collectedStamps: nextStamps,
        completedAt: isComplete && !prev.completedAt ? new Date().toISOString() : prev.completedAt,
      };
    });
  };

  const handleRedeemReward = () => {
    setProgress((prev) => ({
      ...prev,
      isRedeemed: true,
      redeemedAt: new Date().toISOString(),
    }));
  };

  const handleResetData = () => {
    const fresh = resetStoredProgress();
    setProgress(fresh);
    setHasStarted(false);
    setActiveSpot(null);
    setActiveTab('map');
  };

  // If user hasn't accepted terms / started yet, show the full entrance StartScreen
  if (!hasStarted) {
    return <StartScreen onStartRally={handleStartRally} />;
  }

  // Header Title calculation
  let headerTitle = '下町めぐりスタンプラリー';
  let badgeText = '下町めぐり';

  if (activeSpot) {
    headerTitle = 'Checkin Active';
    badgeText = activeSpot.name;
  } else if (activeTab === 'map') {
    headerTitle = 'Map';
    badgeText = '下町めぐり';
  } else if (activeTab === 'stamp_book') {
    headerTitle = 'Stamp Card';
    badgeText = '六景御朱印帖';
  } else if (activeTab === 'prize') {
    headerTitle = 'Rewards Goal';
    badgeText = '満願達成';
  } else if (activeTab === 'guide') {
    headerTitle = 'Guide & Rules';
    badgeText = '利用規約';
  }

  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#1c1c18] flex flex-col justify-start">
      {/* Top Header */}
      <Header
        title={headerTitle}
        badgeText={badgeText}
        showBack={Boolean(activeSpot)}
        onBack={() => setActiveSpot(null)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16">
        {activeSpot ? (
          <CheckinActiveView
            spot={activeSpot}
            progress={progress}
            onStampCollected={handleStampCollected}
            onGoBack={() => setActiveSpot(null)}
            onGoToStampBook={() => {
              setActiveSpot(null);
              setActiveTab('stamp_book');
            }}
            onTriggerCelebration={(data) => {
              setCelebrationData({
                isOpen: true,
                ...data,
              });
            }}
          />
        ) : activeTab === 'map' ? (
          <MapView
            progress={progress}
            onSelectSpot={(spot) => setActiveSpot(spot)}
            onGoToRewards={() => setActiveTab('prize')}
            onOpenSealModal={(spot) => setInspectingSpot(spot)}
          />
        ) : activeTab === 'stamp_book' ? (
          <StampBookView
            progress={progress}
            onOpenSealModal={(spot) => setInspectingSpot(spot)}
            onGoToMap={() => setActiveTab('map')}
            onSelectSpot={(spot) => setActiveSpot(spot)}
          />
        ) : activeTab === 'prize' ? (
          <RewardsGoalView
            progress={progress}
            onRedeemReward={handleRedeemReward}
            onGoToStampBook={() => setActiveTab('stamp_book')}
          />
        ) : (
          <GuideRulesView
            onResetData={handleResetData}
            onGoToStartScreen={() => setHasStarted(false)}
          />
        )}
      </main>

      {/* Bottom Tab Navigation (Only shown when not in deep spot checkin view) */}
      {!activeSpot && (
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveSpot(null);
            setActiveTab(tab);
          }}
          stampsCount={progress.collectedStamps.length}
        />
      )}

      {/* Zoomed Seal Inspection Modal */}
      <SealModal
        spot={inspectingSpot}
        isOpen={Boolean(inspectingSpot)}
        onClose={() => setInspectingSpot(null)}
      />

      {/* Grand Celebration Stamping Modal */}
      <CelebrationModal
        isOpen={celebrationData.isOpen}
        onClose={() =>
          setCelebrationData((prev) => ({ ...prev, isOpen: false }))
        }
        title={celebrationData.title}
        subDesc={celebrationData.subDesc}
        kanjiMain={celebrationData.kanjiMain}
        stampText={celebrationData.stampText}
        stampImageUrl={celebrationData.stampImageUrl}
        progressText={`${progress.collectedStamps.length} / 6 箇所達成`}
      />
    </div>
  );
}
