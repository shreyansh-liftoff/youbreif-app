import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  configureFonts,
  MD3DarkTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import {type MD3Type} from 'react-native-paper/lib/typescript/types';
import {AppNavigator} from './navigation';
import { PlayerProvider } from '@liftoffllc/rn-audio-player';

const fontConfig: Record<string, MD3Type> = {
  default: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'normal',
    letterSpacing: 1.2,
    lineHeight: 24,
    fontSize: 16,
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts({config: fontConfig}),
  roundness: 10,
  colors: {
    primary: '#a532ff',
    text: Colors.lighter,
    background: Colors.darker,
    surface: Colors.darker,
    elevation: {
      level0: 'transparent',
      level1: 'whitesmoke',
      level2: 'whitesmoke',
      level3: 'whitesmoke',
      level4: 'whitesmoke',
      level5: 'whitesmoke',
    },
  },
};

function App(): React.JSX.Element {
  return (
    <PlayerProvider>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </PlayerProvider>
  );
}

export default App;
