import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';

export const asyncStorageToken = {
  get: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  set: async (token: string): Promise<void> => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  remove: async (): Promise<void> => {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },
};
