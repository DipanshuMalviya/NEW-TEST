export interface ReplyPunchline {
  id: string;
  category: 'Flirty & Bold' | 'Chill & Witty (Hinglish)' | 'Deep & Genuine' | 'Playful Challenge';
  rating: number;
  text: string;
  tacticalIntent: string;
  intensity: 'Subtle' | 'Assertive' | 'Spicy';
  platform: 'WhatsApp' | 'Instagram DMs' | 'Hinge / Bumble';
}

export interface ChatBubble {
  id: string;
  sender: 'user' | 'partner';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  isTarget?: boolean;
}

export interface DecodedScenario {
  id: string;
  frameNumber: string;
  platform: 'WhatsApp' | 'Instagram DMs' | 'Hinge / Bumble';
  partnerName: string;
  partnerAvatarLetter: string;
  partnerLocation: string;
  onlineStatus: string;
  chatTime: string;
  bubbles: ChatBubble[];
  targetMessage: string;
  receptivityScore: number;
  receptivityLabel: string;
  confidenceScore: number;
  detectedTone: string;
  toneDescription: string;
  vibeSignature: string;
  realSubtext: string;
  subtextDescription: string;
  actionWindow: string;
  culturalCalibrationTitle: string;
  culturalCalibrationTag: string;
  culturalCalibrationText: string;
  momentumPeak: string;
  momentumDataPoints: number[];
  replies: {
    Subtle: ReplyPunchline[];
    Assertive: ReplyPunchline[];
    Spicy: ReplyPunchline[];
  };
}

export interface DatingGuru {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  consultsCount: string;
  rating: number;
  ratePerMin: number;
  isLive: boolean;
  specialty: string;
  avatarUrl: string;
  bio: string;
  tags: string[];
}

export interface DateSpot {
  id: string;
  city: string;
  neighborhood: string;
  name: string;
  category: 'Specialty Coffee' | 'Rooftop Lounge' | 'Intimate Speakeasy' | 'Daytime Walk & Gelato' | 'Bistro';
  vibe: string;
  idealFor: string;
  priceLevel: '₹₹' | '₹₹₹' | '₹₹₹₹';
  address: string;
  insiderTip: string;
  conversationStarter: string;
}

export interface ConsentPillar {
  title: string;
  tagline: string;
  status: string;
  description: string;
  rules: string[];
}
