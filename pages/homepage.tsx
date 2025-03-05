import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../components/button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

const Homepage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRoute = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d1a3d', '#1a1a1a']}
      style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{'You'}</Text>
        <Text style={styles.subheading}>{'brief AI'}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          {'AI powered video summary in your language'}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={handleRoute}
          iconName={'headset'}
          text={'Listen Now'}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  heading: {
    fontSize: 50,
    fontWeight: 600,
    color: '#a532ff',
  },
  subheading: {
    fontSize: 50,
    fontWeight: 600,
    color: 'white',
  },
  contentContainer: {
    marginVertical: 30,
    marginHorizontal: '20%',
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    color: 'whitesmoke',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
  },
});

export default Homepage;
