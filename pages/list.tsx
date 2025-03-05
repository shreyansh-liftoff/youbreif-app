import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import AllSummaries from '../components/allSummaries';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

type ListRouteProp = RouteProp<RootStackParamList, 'List'>;

const List = () => {
  const navigation = useNavigation();
  const route = useRoute<ListRouteProp>();
  const { title } = route.params;

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d1a3d', '#1a1a1a']}
      style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction color={'white'} onPress={() => navigation.goBack()} />
        <Appbar.Content title={title} titleStyle={styles.title} />
      </Appbar.Header>
      <View style={styles.content}>
        <AllSummaries showAllOption={false} direction={'vertical'} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
  },
});

export default List;
