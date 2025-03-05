import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IconButtonProps {
  onPress: () => void;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
}

const IconButton = ({
  onPress,
  iconName,
  iconSize,
  iconColor,
  backgroundColor,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: backgroundColor ?? '#a532ff'},
      ]}>
      <Icon
        name={iconName}
        size={iconSize || 30}
        style={[styles.icon, {color: iconColor ?? 'white'}]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a532ff',
    borderRadius: 50,
  },
  icon: {
    padding: 8,
    color: 'white',
  },
});

export default IconButton;
