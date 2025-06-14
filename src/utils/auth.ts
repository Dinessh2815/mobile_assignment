import { User } from "../types";
import { setIsLoggedIn, storeUserData } from "./storage";

// Hardcoded credentials
const VALID_EMAIL = "admin@example.com";
const VALID_PASSWORD = "1234";
const USER_NAME = "Admin User";

export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; message?: string }> => {
  // Check if credentials match
  if (email.toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
    const user: User = {
      name: USER_NAME,
      email: email.toLowerCase(),
    };

    // Store user data and set logged in
    await storeUserData(user);
    await setIsLoggedIn(true);

    return { success: true };
  }

  return {
    success: false,
    message: "Invalid email or password. Please try again.",
  };
};
