import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {}
};

export const storeData = async (key, value) => {
  try {
    await storeString(key, JSON.stringify(value));
  } catch (e) {}
};

export const getString = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {}
};

export const getData = async (key) => {
  try {
    stringifiedValue = await getString(key);
    return stringifiedValue != null ? JSON.parse(stringifiedValue) : null;
  } catch (e) {}
};
