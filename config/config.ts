import Config from 'react-native-config';

export const ENV = {
  LOCAL_SERVER_URL: Config.LOCAL_SERVER_URL || 'http://localhost:4000/api',
  // Add more environment variables here
};
