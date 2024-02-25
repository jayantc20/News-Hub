export interface NewsPreferences {
  userId: string;
  categories: string[]; // e.g., ["Technology", "Business"]
  sources: string[]; // e.g., ["CNN", "BBC"]
  country: string;
  contentType: string[]; // e.g., ["Articles", "Videos"]
  frequencyOfUpdates: string; // e.g., "Real-time", "Daily"
  language: string; // e.g., "en", "es"
  trendingTopics: string[]; // e.g., ["AI", "Blockchain"]
}
