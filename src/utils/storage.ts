import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, HealthData, TodoItem } from "../types";

const USER_KEY = "@proactively_user";
const IS_LOGGED_IN_KEY = "@proactively_is_logged_in";
const HEALTH_DATA_KEY = "@proactively_health_data";
const TODO_ITEMS_KEY = "@proactively_todo_items";

// Default todo items
const DEFAULT_TODO_ITEMS: TodoItem[] = [
  {
    id: "1",
    text: "Achieve 30k steps every week for blood sugar",
    completed: false,
    assignee: "Laurie Simons",
    date: "Sep 5, 2024",
  },
  {
    id: "2",
    text: "Take up health Coaching",
    completed: false,
    assignee: "Laurie Simons",
    date: "Sep 5, 2024",
  },
  {
    id: "3",
    text: "Go to a nearby gym and workout for 30 mins",
    completed: false,
    assignee: "Laurie Simons",
    date: "Sep 5, 2024",
  },
  {
    id: "4",
    text: "Complete 2 courses of Dr. Laurie Simons",
    completed: true,
    assignee: "Laurie Simons",
    date: "Aug 30, 2024",
  },
];

// Default health data values
const DEFAULT_HEALTH_DATA: HealthData = {
  steps: 12000,
  bmi: 22.5,
  sleep: 8.0,
};

// User data functions
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

// Health data functions
export const storeHealthData = async (
  healthData: HealthData
): Promise<void> => {
  try {
    await AsyncStorage.setItem(HEALTH_DATA_KEY, JSON.stringify(healthData));
  } catch (error) {
    console.error("Error storing health data:", error);
  }
};

export const getHealthData = async (): Promise<HealthData> => {
  try {
    const healthDataJson = await AsyncStorage.getItem(HEALTH_DATA_KEY);
    return healthDataJson ? JSON.parse(healthDataJson) : DEFAULT_HEALTH_DATA;
  } catch (error) {
    console.error("Error retrieving health data:", error);
    return DEFAULT_HEALTH_DATA;
  }
};

export const updateSteps = async (steps: number): Promise<HealthData> => {
  const currentData = await getHealthData();
  const updatedData = { ...currentData, steps };
  await storeHealthData(updatedData);
  return updatedData;
};

export const updateBMI = async (bmi: number): Promise<HealthData> => {
  const currentData = await getHealthData();
  const updatedData = { ...currentData, bmi };
  await storeHealthData(updatedData);
  return updatedData;
};

export const updateSleep = async (sleep: number): Promise<HealthData> => {
  const currentData = await getHealthData();
  const updatedData = { ...currentData, sleep };
  await storeHealthData(updatedData);
  return updatedData;
};

// Auth functions
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

// Todo items functions
export const storeTodoItems = async (todoItems: TodoItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(todoItems));
  } catch (error) {
    console.error("Error storing todo items:", error);
  }
};

export const getTodoItems = async (): Promise<TodoItem[]> => {
  try {
    const todoItemsJson = await AsyncStorage.getItem(TODO_ITEMS_KEY);
    return todoItemsJson ? JSON.parse(todoItemsJson) : DEFAULT_TODO_ITEMS;
  } catch (error) {
    console.error("Error retrieving todo items:", error);
    return DEFAULT_TODO_ITEMS;
  }
};

export const updateTodoItem = async (id: string, updates: Partial<TodoItem>): Promise<TodoItem[]> => {
  const currentItems = await getTodoItems();
  const updatedItems = currentItems.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
  await storeTodoItems(updatedItems);
  return updatedItems;
};

export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      USER_KEY,
      IS_LOGGED_IN_KEY,
      HEALTH_DATA_KEY,
      TODO_ITEMS_KEY,
    ]);
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};
