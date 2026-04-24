import { useState, useEffect, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import * as Speech from 'expo-speech';
import { setAudioModeAsync } from 'expo-audio';
import type { Step } from '../data/activities';

interface HighlightRange {
  start: number;
  end: number;
}

interface SpeechPlayerResult {
  currentStepIndex: number;
  isPlaying: boolean;
  isPaused: boolean;
  isDone: boolean;
  isSpeaking: boolean;
  rate: number;
  highlightRange: HighlightRange | null;
  hasPlayedOnce: boolean;
  play: () => void;
  pause: () => void;
  stop: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  setRate: (value: number) => void;
  speakStep: (index: number) => void;
}

export function useSpeechPlayer(steps: Step[]): SpeechPlayerResult {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [rate, setRateState] = useState(1.0);
  const [highlightRange, setHighlightRange] = useState<HighlightRange | null>(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const rateRef = useRef(1.0);
  const currentIndexRef = useRef(0);

  const speakAtIndex = useCallback(async (index: number) => {
    if (!steps || index < 0 || index >= steps.length) return;
    await Speech.stop();
    setHighlightRange(null);
    setIsDone(false);

    const text = steps[index].text;
    const speechOptions: Speech.SpeechOptions = {
      language: 'en-AU',
      pitch: 1.0,
      rate: rateRef.current,
      onStart: () => {
        setIsPlaying(true);
        setIsPaused(false);
        setIsDone(false);
        setHasPlayedOnce(true);
        if (Platform.OS !== 'ios') {
          setHighlightRange({ start: 0, end: text.length });
        }
      },
      onDone: () => {
        setIsPlaying(false);
        setIsDone(true);
        setHighlightRange(null);
      },
      onStopped: () => {
        setIsPlaying(false);
        setHighlightRange(null);
      },
      onError: (err: string) => {
        console.error('[Speech] error:', err);
        setIsPlaying(false);
        setHighlightRange(null);
      },
    };

    if (Platform.OS === 'ios') {
      speechOptions.onBoundary = (event: Speech.SpeechBoundaryEventIOS) => {
        setHighlightRange({
          start: event.charIndex,
          end: event.charIndex + (event.charLength ?? 0),
        });
      };
    }

    Speech.speak(text, speechOptions);
  }, [steps]);

  const play = useCallback(() => {
    speakAtIndex(currentIndexRef.current);
  }, [speakAtIndex]);

  const pause = useCallback(() => {
    if (Platform.OS === 'ios') {
      Speech.pause();
      setIsPlaying(false);
      setIsPaused(true);
    } else {
      Speech.stop();
      setIsPaused(true);
    }
  }, []);

  const stop = useCallback(() => {
    Speech.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setIsDone(false);
    setHighlightRange(null);
  }, []);

  const nextStep = useCallback(() => {
    if (!steps || currentIndexRef.current >= steps.length - 1) return;
    const next = currentIndexRef.current + 1;
    currentIndexRef.current = next;
    setCurrentStepIndex(next);
    setIsDone(false);
    speakAtIndex(next);
  }, [steps, speakAtIndex]);

  const prevStep = useCallback(() => {
    if (currentIndexRef.current <= 0) return;
    const prev = currentIndexRef.current - 1;
    currentIndexRef.current = prev;
    setCurrentStepIndex(prev);
    setIsDone(false);
    speakAtIndex(prev);
  }, [speakAtIndex]);

  const goToStep = useCallback((index: number) => {
    if (!steps || index < 0 || index >= steps.length) return;
    Speech.stop();
    currentIndexRef.current = index;
    setCurrentStepIndex(index);
    setIsPlaying(false);
    setIsDone(false);
    setHighlightRange(null);
  }, [steps]);

  const setRate = useCallback((value: number) => {
    Speech.stop();
    rateRef.current = value;
    setRateState(value);
    setIsPlaying(false);
    setHighlightRange(null);
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setAudioModeAsync({ playsInSilentModeIOS: true, allowsRecordingIOS: false });
    }
    return () => { Speech.stop(); };
  }, []);

  return {
    currentStepIndex,
    isPlaying,
    isPaused,
    isDone,
    isSpeaking: isPlaying,
    rate,
    highlightRange,
    hasPlayedOnce,
    play,
    pause,
    stop,
    nextStep,
    prevStep,
    goToStep,
    setRate,
    speakStep: speakAtIndex,
  };
}
