import {StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../components/header';
import LinkComponent from '../components/linkComponent';
import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native';
import {Snackbar, Text} from 'react-native-paper';
import useProcessLink from '../hooks/useProcessLink';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation';
import {useEffect, useState} from 'react';
import AllSummaries from '../components/allSummaries';

const TrendingSummaries = () => {
  return (
    <View style={{marginTop: 16}}>
      <View style={styles.heading}>
        <Text style={styles.label}>{'Trending Summaries'}</Text>
        <TouchableOpacity>
          <Text style={styles.link}>{'View All >'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Dashboard = () => {
  const {createVideoRecord, videoState, getVideoRecord} = useProcessLink();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleLinkSubmit = async (url: string) => {
    const _data = await getVideoRecord(url);
    if (_data) {
        setData(_data);
        return;
    }
    const videoRecord = await createVideoRecord(url);
    setData(videoRecord);
  };

  useEffect(() => {
    if (data && !videoState.loading && !videoState.error) {
      navigation.navigate('Details', {
        record: data,
      });
    }
  }, [data, navigation, videoState.error, videoState.loading]);

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d1a3d', '#1a1a1a']}
      style={styles.container}>
      <Header />
      <LinkComponent onSubmit={handleLinkSubmit} />
      <TrendingSummaries />
      <AllSummaries showAllOption={true} />
      {videoState.error ? (
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={3000}
          action={{
            label: 'Dismiss',
            onPress: () => setVisible(false),
          }}>
          {videoState.error}
        </Snackbar>
      ) : null}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: 700,
  },
  link: {
    color: 'lightgrey',
    fontSize: 14,
  },
});

export default Dashboard;
