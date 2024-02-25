import { NewsPreferences } from "../models/NewsPreference";

const userPreferences: { userId: string; preferences?: NewsPreferences }[] = [];

export const getPreferences = async (
  userId: string
): Promise<NewsPreferences | { error: string; status: number }> => {
  const userPreference = userPreferences.find(
    (entry) => entry.userId === userId
  );
  if (!userPreference || !userPreference.preferences) {
    return { error: "Preferences not found", status: 404 };
  }
  return userPreference.preferences;
};

export const updatePreferences = async (
  userId: string,
  preferences: NewsPreferences
): Promise<NewsPreferences | { error: string; status: number }> => {
  let userPreference = userPreferences.find((entry) => entry.userId === userId);
  if (!userPreference) {
    userPreference = { userId, preferences };
    userPreferences.push(userPreference);
  } else {
    userPreference.preferences = preferences;
  }
  if (!userPreference || !userPreference.preferences) {
    return { error: "Preferences not found", status: 404 };
  }
  return userPreference.preferences;
};

export const createPreferences = async (
  userId: string,
  preferences: NewsPreferences
): Promise<NewsPreferences | { error: string; status: number }> => {
  const existingUserPreference = userPreferences.find(
    (entry) => entry.userId === userId
  );
  if (existingUserPreference) {
    return { error: "Preferences already exist", status: 400 };
  }
  userPreferences.push({ userId, preferences });
  return preferences;
};
