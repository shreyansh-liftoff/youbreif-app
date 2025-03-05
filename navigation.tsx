import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from './pages/homepage';
import Dashboard from './pages/dashboard';
import DetailsPage from './pages/details';
import {VideoRecord} from './store/store';
import List from './pages/list';

// Define your route params here
export type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  Details: {record: VideoRecord};
  List: {title: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen
          name={'Home'}
          component={Homepage}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen
          name={'Dashboard'}
          component={Dashboard}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen
          name={'Details'}
          component={DetailsPage}
          options={{
            animation: 'none',
          }}
        />
        <Stack.Screen
          name={'List'}
          component={List}
          options={{
            animation: 'none',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
