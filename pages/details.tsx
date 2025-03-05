import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SafeAreaView, View, Image, ScrollView} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import IconButton from '../components/iconButton';
import {RootStackParamList} from '../navigation';
import {Text, ActivityIndicator, Appbar} from 'react-native-paper';
import useProcessLink from '../hooks/useProcessLink';
import {useVideoStore, VideoRecord} from '../store/store';
import {usePlayerContext, usePlayerHook} from '@liftoffllc/rn-audio-player';
import {detailsStyles as styles} from './styles';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

const Title = ({text}: {text: string}) => {
  return (
    <View>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

const Thumbnail = ({url}: {url: string}) => {
  return (
    <View style={styles.thumbnailContainer}>
      <Image source={{uri: url}} style={styles.thumbnail} />
    </View>
  );
};

const Summary = ({
  text,
  loading,
  error,
  onRetry,
}: {
  text: string;
  loading: boolean;
  error: string;
  onRetry: () => void;
}) => {
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <IconButton
          iconName={'refresh'}
          iconSize={40}
          onPress={onRetry}
          backgroundColor={'#a532ff'}
        />
      </View>
    );
  }
  return (
    <View style={styles.summaryContainer}>
      {loading ? (
        <ActivityIndicator size={40} color="#a532ff" />
      ) : (
        <>
          <Text style={styles.title}>{'Summary'}</Text>
          <Text style={styles.summary}>{text}</Text>
        </>
      )}
    </View>
  );
};

const DetailsPage = () => {
  const {
    generateSummary,
    updateVideoSummary,
    generateAudio,
    updateAudioUrl,
    getVideoRecord,
    summaryState,
    audioState,
  } = useProcessLink();
  const navigation = useNavigation();
  const route = useRoute<DetailsRouteProp>();
  const {record} = route.params;
  const {language} = useVideoStore();
  const [updatedRecord, setUpdatedRecord] = useState<VideoRecord | null>(
    record,
  );
  const [loading, setIsLoading] = useState(false);
  const [retryAudio, setRetryAudio] = useState(0);
  const [retrySummary, setRetrySummary] = useState(0);
  const shouldGenerateSummary = useMemo(
    () => !loading && !updatedRecord?.summaries?.[language.name],
    [language.name, loading, updatedRecord?.summaries],
  );
  const shouldGenerateAudio = useMemo(
    () => !loading && !updatedRecord?.audioUrls?.[language.name],
    [language.name, loading, updatedRecord?.audioUrls],
  );

  const fetchRecordDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getVideoRecord(record.url as string);
      if (data) {
        setUpdatedRecord(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [getVideoRecord, record.url]);

  const {
    playerControls,
    playerState,
    setCurrentTrack,
    currentTrack,
    setPlayerState,
  } = usePlayerContext();
  usePlayerHook();
  const {play, pause, loadContent, stop} = playerControls || {};

  const cleanUp = () => {
    setIsLoading(false);
    setUpdatedRecord(null);
    setCurrentTrack(null);
    setPlayerState({
      totalDuration: 0,
      elapsedTime: 0,
      progress: 0,
      repeat: false,
      state: 0,
      currentTrack: null,
    });
    stop?.();
  };

  useEffect(() => {
    fetchRecordDetails();

    return () => cleanUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updatedRecord?.audioUrls?.[language.name]) {
      setCurrentTrack({
        title: record.title as string,
        artist: 'Unknown',
        artwork: record.thumbnail as string,
        url: updatedRecord?.audioUrls?.[language.name] as string,
      });
    }
  }, [language.name, record, setCurrentTrack, updatedRecord?.audioUrls]);

  useEffect(() => {
    if (currentTrack) {
      loadContent?.();
    }
  }, [currentTrack, loadContent]);

  const getAudio = useCallback(async () => {
    const url = await generateAudio(record.id!, language.name);
    if (!url) {
      return;
    }
    return await updateAudioUrl(record.id!, url.url, language.name);
  }, [generateAudio, language.name, record.id, updateAudioUrl]);

  const getSummary = useCallback(async () => {
    const summary = await generateSummary(record.url as string, language.name);
    if (!summary) {
      return;
    }
    return await updateVideoSummary(
      record.id as string,
      summary.summary,
      language.name,
    );
  }, [
    generateSummary,
    language.name,
    record.id,
    record.url,
    updateVideoSummary,
  ]);

  useEffect(() => {
    if (shouldGenerateSummary) {
      getSummary().then(updated => {
        if (updated) {
          setUpdatedRecord(prevRecord => {
            if (
              prevRecord?.summaries?.[language.name] !==
              updated.summaries?.[language.name]
            ) {
              return updated; // Only update if the summary changed
            }
            return prevRecord; // Prevent unnecessary updates
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldGenerateSummary, retrySummary]); // Keep dependencies minimal

  useEffect(() => {
    if (shouldGenerateAudio) {
      getAudio().then(updated => {
        if (updated) {
          setUpdatedRecord(prevRecord => {
            if (
              prevRecord?.audioUrls?.[language.name] !==
              updated.audioUrls?.[language.name]
            ) {
              return updated; // Only update if audio URL changed
            }
            return prevRecord; // Prevent unnecessary updates
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldGenerateAudio, retryAudio]); // Keep dependencies minimal

  const handlePlayPause = () => {
    if (audioState.loading) {
      return;
    }
    if (audioState.error) {
      setRetryAudio(prev => prev + 1);
      return;
    }
    if (playerControls) {
      if (playerState.state === 0) {
        cleanUp();
        setCurrentTrack({
          title: record.title as string,
          artist: 'Unknown',
          artwork: record.thumbnail as string,
          url: updatedRecord?.audioUrls?.[language.name] as string,
        });
        loadContent?.();
      }
      playerState.state === 2 ? pause?.() : play?.();
    }
  };

  const getPlayPauseButton = () => {
    return (
      <View style={styles.playPauseButton}>
        {audioState.loading ? (
          <ActivityIndicator size={40} color="#a532ff" />
        ) : (
          <IconButton
            iconName={
              audioState.error || summaryState.error
                ? 'refresh'
                : playerState.state === 2
                ? 'pause'
                : 'play'
            }
            iconSize={40}
            onPress={() => handlePlayPause()}
            backgroundColor={'#a532ff'}
          />
        )}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d1a3d', '#1a1a1a']}
      style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction
          color={'white'}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <SafeAreaView style={styles.safeArea}>
        <Title text={record.title as string} />
        <Thumbnail url={record.thumbnail as string} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}>
          <Summary
            text={
              updatedRecord?.summaries?.[language.name] as unknown as string
            }
            loading={summaryState.loading}
            error={summaryState.error as string}
            onRetry={() => setRetrySummary(prev => prev + 1)}
          />
        </ScrollView>
      </SafeAreaView>
      {getPlayPauseButton()}
    </LinearGradient>
  );
};

export default DetailsPage;
