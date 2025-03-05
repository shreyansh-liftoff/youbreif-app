import {create} from 'zustand';

export interface VideoRecord {
  id?: string;
  title?: string;
  url?: string;
  thumbnail?: string;
  summaries?: Record<string, string>;
  plays?: number;
  audioUrls?: Record<string, string>;
  audioDurations?: Record<string, number>;
}

export interface Language {
  code: string;
  name: string;
}

interface VideoStore {
  currentAudioUrl?: string;
  setCurrentAudioUrl: (url: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  videoRecords: VideoRecord[];
  addVideoRecord: (video: VideoRecord) => void;
  updateVideoSummary: (id: string, summary: string, language: string) => void;
}

const addVideoRecord = (video: VideoRecord) => (set: any) => {
  set((state: VideoStore) => ({
    videoRecords: [...state.videoRecords, video],
  }));
};

const updateVideoSummary =
  (id: string, summary: string, language: string) => (set: any) => {
    set((state: VideoStore) => ({
      videoRecords: state.videoRecords.map(video => {
        if (video.id === id) {
          video.summaries = {
            ...video.summaries,
            [language]: summary,
          };
        }
        return video;
      }),
    }));
  };

const setLanguage = (language: Language) => (set: any) => {
  set((state: VideoStore) => ({
    ...state,
    language,
  }));
};

const setCurrentAudioUrl = (url: string) => (set: any) => {
  set((state: VideoStore) => ({
    ...state,
    currentAudioUrl: url,
  }));
};

export const useVideoStore = create<VideoStore>(set => ({
  language: {code: 'en', name: 'English'},
  setLanguage: (language: Language) => setLanguage(language)(set),
  videoRecords: [],
  addVideoRecord: (video: VideoRecord) => addVideoRecord(video)(set),
  updateVideoSummary: (id: string, summary: string, language: string) =>
    updateVideoSummary(id, summary, language)(set),
  setCurrentAudioUrl: (url: string) => setCurrentAudioUrl(url)(set),
}));
