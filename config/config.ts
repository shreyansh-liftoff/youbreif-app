import Config from 'react-native-config';

export const ENV = {
  LOCAL_SERVER_URL: Config.LOCAL_SERVER_URL || 'http://localhost:4000/api',
  SERVER_URL: Config.SERVER_URL || 'https://youbrief-backend.vercel.app/api',
  // Add more environment variables here
};
