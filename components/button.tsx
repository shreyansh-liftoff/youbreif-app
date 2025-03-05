import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Text} from 'react-native-paper';

interface AppButtonProps {
  onPress: () => void;
  iconName?: string;
  iconSize?: number;
  text: string;
}

const AppButton = ({onPress, iconName, iconSize, text}: AppButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        mode={'contained'}
        textColor={'white'}
        onPress={onPress}
        style={styles.button}>
        {iconName && (
          <View>
            <Icon name={iconName} size={iconSize || 20} style={{marginTop: 5, color: 'white'}} />
          </View>
        )}
        <View>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  button: {
    width: '100%',
    padding: 5,
    margin: 20,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 10,
  },
});

export default AppButton;
