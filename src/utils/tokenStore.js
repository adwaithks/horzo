import * as SecureStore from 'expo-secure-store';

export const setToken = (key, value) => {
    return SecureStore.setItemAsync(key, value);
};

export const getToken = (key) => {
    return SecureStore.getItemAsync(key);
};

export const eraseToken = (key) => {
    return SecureStore.setItemAsync(key, '');
}