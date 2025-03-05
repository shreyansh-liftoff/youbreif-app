import {useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Menu, Button} from 'react-native-paper';
import {supportedLanguages} from '../data';
import Icon from 'react-native-vector-icons/Ionicons';
import { useVideoStore } from '../store/store';


const SelectIcon = () => <Icon name={'checkmark-outline'} size={20} color={'#a532ff'} />;

const LanguageSelect: React.FC = ({
}) => {
  const [visible, setVisible] = useState(false);
  const {setLanguage, language} = useVideoStore();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const getTitle = (text: string, isSelected: boolean) => {
    return (
    <View style={styles.text}>
        {isSelected ? <SelectIcon /> : null}
        <Text style={isSelected ? styles.selectedText : {}}>{text}</Text>
    </View>
    );
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchorPosition={'bottom'}
        contentStyle={styles.menuContent}
        anchor={
          <Button
            mode={'outlined'}
            onPress={openMenu}
            textColor={'black'}
            contentStyle={styles.button}>
            {language.name}
          </Button>
        }>
        <ScrollView style={styles.scrollView}>
          {supportedLanguages.map(lang => (
            <Menu.Item
              key={lang.code}
              onPress={() => {
                setLanguage(lang);
                closeMenu();
              }}
              titleStyle={[
                language.code === lang.code && styles.selectedText,
              ]}
              title={getTitle(lang.name, language.code === lang.code)}
            />
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 50,
  },
  button: {
    borderWidth: 0,
    backgroundColor: 'whitesmoke',
  },
  menuContent: {
    minWidth: 150,
    maxHeight: 500, // Limit menu height
  },
  scrollView: {
    maxHeight: 450, // Slightly less than menuContent to account for padding
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
},
  selectedText: {
    color: '#a532ff',
    fontWeight: 600,
  },
});

export default LanguageSelect;
