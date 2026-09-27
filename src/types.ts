export type AreaType = 'all' | 'ryogoku' | 'asakusa' | 'oshiage';

export type VerificationType = 'gps' | 'ai_camera' | 'quiz' | 'ar_scan';

export interface Spot {
  id: string;
  code: string;
  order: string;
  name: string;
  title: string;
  subTitle: string;
  area: 'ryogoku' | 'asakusa' | 'oshiage';
  areaName: string;
  address: string;
  verificationType: VerificationType;
  verificationBadge: string;
  image: string;
  distance: string;
  distanceNum: number;
  inRange: boolean;
  sealType: string;
  sealName: string;
  sealInscription: string;
  sealDescription: string;
  sealKanji: string;
  sealSubText: string;
  sealDateText: string;
  useImageStamp?: boolean;
  stampImageUrl?: string;
  historyDescription: string;
  missionDescription: string;
  nextSpotId?: string;
  nextSpotName?: string;
  nextSpotDistance?: string;
  perk?: {
    badge: string;
    title: string;
    description: string;
  };
}

export interface QuizQuestion {
  question: string;
  options: {
    id: string;
    label: string;
    text: string;
    subText?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface UserProgress {
  termsAccepted: boolean;
  collectedStamps: string[]; // Spot IDs: ['S002', ...]
  completedAt?: string;
  isRedeemed: boolean;
  redeemedAt?: string;
  serialNumber: string;
}
