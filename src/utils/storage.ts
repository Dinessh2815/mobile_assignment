import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";

const USER_KEY = "@proactively_user";
const IS_LOGGED_IN_KEY = "@proactively_is_logged_in";

export const storeUserData = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

export const getUserData = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

export const setIsLoggedIn = async (isLoggedIn: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(IS_LOGGED_IN_KEY, JSON.stringify(isLoggedIn));
  } catch (error) {
    console.error("Error storing login state:", error);
  }
};

export const getIsLoggedIn = async (): Promise<boolean> => {
  try {
    const isLoggedIn = await AsyncStorage.getItem(IS_LOGGED_IN_KEY);
    return isLoggedIn ? JSON.parse(isLoggedIn) : false;
  } catch (error) {
    console.error("Error retrieving login state:", error);
    return false;
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([USER_KEY, IS_LOGGED_IN_KEY]);
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};
