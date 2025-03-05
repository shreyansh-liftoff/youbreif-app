import {useState} from 'react';
import {ENV} from '../config/config';

interface IState {
  loading: boolean;
  error?: string;
}

const useProcessLink = () => {
  const [videoState, setVideoState] = useState<IState>({
    loading: false,
    error: undefined,
  });
  const [summaryState, setSummaryState] = useState<IState>({
    loading: false,
    error: undefined,
  });
  const [audioState, setAudioState] = useState<IState>({
    loading: false,
    error: undefined,
  });

  const getVideoRecord = async (videoUrl: string) => {
    try {
      setVideoState({loading: true, error: undefined});
      const response = await fetch(
        `${ENV.LOCAL_SERVER_URL}/video?url=${videoUrl}`,
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: any) {
      setVideoState({loading: false, error: err.message ?? 'An error occurred'});
    } finally {
      setVideoState({loading: false, error: undefined});
    }
  };

  const createVideoRecord = async (videoUrl: string) => {
    try {
      setVideoState({loading: true, error: undefined});
      const response = await fetch(
        `${ENV.LOCAL_SERVER_URL}/video?url=${videoUrl}`,
        {
          method: 'POST',
        },
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: any) {
      setVideoState({loading: false, error: err.message ?? 'An error occurred'});
    } finally {
      setVideoState({loading: false, error: undefined});
    }
  };

  const updateVideoSummary = async (
    id: string,
    summary: string,
    language: string,
  ) => {
    try {
      setSummaryState({loading: true, error: undefined});
      const response = await fetch(
        `${ENV.LOCAL_SERVER_URL}/video/update-summary?id=${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({summary: summary, language: language}),
        },
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: any) {
      setSummaryState({loading: false, error: err.message ?? 'An error occurred'});
    } finally {
      setSummaryState({loading: false, error: undefined});
    }
  };

  const generateSummary = async (videoUrl: string, language: string) => {
    try {
      setSummaryState({loading: true, error: undefined});
      const response = await fetch(
        `${ENV.LOCAL_SERVER_URL}/summary?url=${videoUrl}&language=${language}`,
        {
          method: 'POST',
        },
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: any) {
      setSummaryState({loading: false, error: err.message ?? 'An error occurred'});
    } finally {
      setSummaryState({loading: false, error: undefined});
    }
  };

  const generateAudio = async (id: string, language: string) => {
    try {
      setAudioState({loading: true, error: undefined});
      const response = await fetch(
        `${ENV.LOCAL_SERVER_URL}/audio?id=${id}&language=${language}`,
        {
          method: 'POST',
        },
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: any) {
      setAudioState({loading: false, error: err.message ?? 'An error occurred'});
    } finally {
      setAudioState({loading: false, error: undefined});
    }
  };

  const updateAudioUrl = async (
    id: string,
    audioUrl: string,
    language: string,
  ) => {
    try {
      setAudioState({loading: true, error: undefined});
      const response = await fetch(
        `${ENV.LOCAL_SERVER_URL}/video/update-audio-url/?id=${id}&language=${language}&url=${audioUrl}`,
        {
          method: 'PUT',
        },
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (err: any) {
      setAudioState({loading: false, error: err.message ?? 'An error occurred'});
    } finally {
      setAudioState({loading: false, error: undefined});
    }
  };

  const resetState = () => {
    setVideoState({loading: false, error: undefined});
    setSummaryState({loading: false, error: undefined});
    setAudioState({loading: false, error: undefined});
  };

  return {
    videoState,
    summaryState,
    audioState,
    createVideoRecord,
    getVideoRecord,
    generateSummary,
    updateVideoSummary,
    generateAudio,
    updateAudioUrl,
    resetState,
  };
};

export default useProcessLink;
