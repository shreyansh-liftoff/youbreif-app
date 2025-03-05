import {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Card from './cards';

interface SummaryListProps {
  direction: 'horizontal' | 'vertical';
  fetch: (offset: number, limit: number) => Promise<any>;
  max?: number;
  onPress?: (record: Record<string, string>) => void;
}

const LIMIT = 10;

const SummaryList = ({fetch, direction, max, onPress}: SummaryListProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await fetch(offset, LIMIT);
      setData(newData);
      setOffset(offset + LIMIT);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const newData = await fetch(offset, LIMIT);
    setData([...data, ...newData]);
    setOffset(offset + LIMIT);
    setLoading(false);
  };

  const getData = useMemo(() => {
    return max ? data.slice(0, max) : data;
  }, [data, max]);

  return (
    <FlatList
      data={getData}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Card {...item} record={item} onPress={onPress} />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      horizontal={direction === 'horizontal'}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.listContent]}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default SummaryList;
