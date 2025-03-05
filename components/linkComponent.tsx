import {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import IconButton from './iconButton';

interface LinkComponentProps {
  onSubmit: (url: string) => void;
}

const LinkComponent = ({onSubmit}: LinkComponentProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (url) {
      onSubmit(url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={url}
          onChangeText={setUrl}
          placeholder="Paste a youtube link to summarize"
          placeholderTextColor={'lightgrey'}
          style={styles.input}
        />
        <IconButton onPress={handleSubmit} iconName={'headset'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    padding: 12,
    height: 50,
  },
});

export default LinkComponent;
