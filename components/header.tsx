import React from 'react';
import {StatusBar, Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LanguageSelect from './languageSelect';

const Header = () => {

  return (
    <View>
      <StatusBar
        backgroundColor="#1a1a1a"
        barStyle="light-content"
        translucent
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>{'You'}</Text>
          <Text style={styles.logoAccent}>{'brief AI'}</Text>
        </View>
        <View style={styles.languageContainer}>
          <LanguageSelect />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#a532ff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#a532ff',
  },
  logoAccent: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  languageContainer: {
    justifyContent: 'center',
  },
});

export default Header;
