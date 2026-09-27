/**
 * Web Audio API & Web Speech API Japanese sound synthesis engine
 * Zero external audio asset dependencies - works instantly offline/online.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function isAudioEnabled(): boolean {
  return soundEnabled;
}

export function setAudioEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (enabled) {
    initAudio();
    playTaikoDrum(0, 160, 0.25);
  }
}

export function initAudio(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. 和太鼓 (Taiko bass drum hit)
export function playTaikoDrum(delay = 0, pitch = 135, duration = 0.5): void {
  if (!soundEnabled) return;
  const ctx = initAudio();
  if (!ctx) return;

  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(pitch, t);
  osc.frequency.exponentialRampToValueAtTime(36, t + duration);

  gain.gain.setValueAtTime(0.9, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(t);
  osc.stop(t + duration);

  // Sub harmonic thud
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'triangle';
  subOsc.frequency.setValueAtTime(pitch * 0.6, t);
  subOsc.frequency.exponentialRampToValueAtTime(28, t + duration * 0.8);
  subGain.gain.setValueAtTime(0.6, t);
  subGain.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.8);
  subOsc.connect(subGain);
  subGain.connect(ctx.destination);
  subOsc.start(t);
  subOsc.stop(t + duration * 0.8);

  // Leather drumhead impact noise burst
  try {
    const bufferSize = Math.floor(ctx.sampleRate * 0.04);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.04);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(t);
  } catch {
    // ignore
  }
}

// 2. 拍子木 (Hyoshigi / Clappers)
export function playHyoshigi(delay = 0): void {
  if (!soundEnabled) return;
  const ctx = initAudio();
  if (!ctx) return;

  const t0 = ctx.currentTime + delay;
  [0, 0.14].forEach((offset, idx) => {
    const t = t0 + offset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(idx === 0 ? 1850 : 2150, t);
    osc.frequency.exponentialRampToValueAtTime(350, t + 0.08);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  });
}

// 3. 神楽鈴・水滴チャイム (Kagura Chimes / Suikinkutsu)
export function playChimeNote(freq: number, delay = 0, duration = 0.8): void {
  if (!soundEnabled) return;
  const ctx = initAudio();
  if (!ctx) return;

  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, t);

  gain.gain.setValueAtTime(0.3, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(t);
  osc.stop(t + duration);
}

// 4. Orchestrated Celebration Fanfare (和風祝賀ファンファーレ)
export function playCelebrationFanfare(): void {
  if (!soundEnabled) return;
  initAudio();

  // 1st Strike: 鼓 (Pon!)
  playTaikoDrum(0.0, 240, 0.35);

  // 2nd & 3rd Strikes: 和太鼓重低音 (Don! Don!)
  playTaikoDrum(0.22, 110, 0.5);
  playTaikoDrum(0.48, 95, 0.7);

  // Kagura Chimes (Japanese Pentatonic Scale)
  const notes = [659.25, 880.00, 987.77, 1318.51, 1567.98, 1760.00, 2093.00];
  notes.forEach((freq, idx) => {
    playChimeNote(freq, 0.62 + idx * 0.07, 0.85);
    playChimeNote(freq * 1.5, 0.7 + idx * 0.07, 0.5);
  });

  // Final resonant boom
  playTaikoDrum(1.2, 75, 0.9);
}

// 5. Web Speech API Voice shout: "どすこい！"
export function shoutDosukoi(): void {
  if (typeof window === 'undefined') return;
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('どすこい！');
      utterance.lang = 'ja-JP';
      utterance.pitch = 0.55; // deep commanding sumo call
      utterance.rate = 0.88;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find((v) => v.lang.includes('ja') || v.lang.includes('JP'));
      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // speech synthesis not supported or blocked
    }
  }
}

// 6. Mobile tactile vibration
export function triggerHaptic(pattern: number | number[] = [40, 30, 80]): void {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // ignore
    }
  }
}
