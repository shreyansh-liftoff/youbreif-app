import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SummaryList from './list';
import {ENV} from '../config/config';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation';

interface AllSummariesProps {
  showAllOption?: boolean;
  direction?: 'horizontal' | 'vertical';
}

const AllSummaries = ({
  showAllOption = false,
  direction = 'horizontal',
}: AllSummariesProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const fetchFunction = async (offset: number, limit: number) => {
    const response = await fetch(
      `${ENV.SERVER_URL}/video/all?offset=${offset}&limit=${limit}`,
    );
    const data = await response.json();
    return data;
  };

  const onPress = (record: Record<string, string>) => {
    navigation.navigate('Details', {
      record,
    });
  };

  const handleRoute = () => {
    navigation.navigate('List', {
      title: 'All Summaries',
    });
  };

  return (
    <View style={styles.container}>
      {
        showAllOption && (
          <View style={styles.heading}>
            <Text style={styles.label}>{'All Summaries'}</Text>
            <TouchableOpacity onPress={handleRoute}>
              <Text style={styles.link}>{'View All >'}</Text>
            </TouchableOpacity>
          </View>
        )
      }
      <SummaryList
        direction={direction}
        fetch={fetchFunction}
        max={10}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
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

export default AllSummaries;
