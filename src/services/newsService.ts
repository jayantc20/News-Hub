import axios from "axios";
import { getNewsFromCache, updateNewsCache } from "../utils/cache";
import { getPreferences } from "./preferenceService";
import { UserActivity } from "../models/userActivity";
import { Request } from "express";
import { NewsPreferences } from "../models/NewsPreference";
import config from "config";

const NEWS_API_KEY = config.get("NEWS_API_KEY");

const fetchNewsFromAPI = async (url: string): Promise<string[]> => {
  const response = await axios.get(url);
  return response.data.articles.map((article: any) => ({
    title: article.title,
    description: article.description,
    content: article.content,
    source: {
      id: article.source.id,
      name: article.source.name,
    },
  }));
};
const constructApiUrl = (preferences: NewsPreferences): string => {
  const { sources, categories, country, trendingTopics } = preferences;
  const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}`;
  const queryParams: string[] = [];

  if (sources.length > 0) {
    queryParams.push(`sources=${sources.join(",")}`);
  } else if (categories.length > 0) {
    queryParams.push(`category=${categories.join(" OR ")}`);
  } else if (country) {
    queryParams.push(`country=${country.toLowerCase()}`);
  } else if (trendingTopics) {
    queryParams.push(`q=${trendingTopics.join(" OR ")}`);
  }

  return `${apiUrl}&${queryParams.join("&")}`;
};

export const getNewsForUser = async (
  req: Request
): Promise<{ news?: string[] } | { error: string; status: number }> => {
  const userId = req.body.userId;
  const userPreferences = await getPreferences(userId);

  if ("error" in userPreferences) {
    return userPreferences;
  }

  // Fetch news from cache
  const cachedNews = await getNewsFromCache(userId);

  if (cachedNews && cachedNews.length > 0) {
    return { news: cachedNews }; // Return cached news if not empty
  }

  const useSource = req.query.sources === "true";
  const useCategory = req.query.category === "true";
  const useCountry = req.query.country === "true";
  const useTrending = req.query.trending === "true";

  const selectedPreference: Partial<NewsPreferences> = {
    sources: useSource ? userPreferences.sources : [],
    categories:
      useCategory && !useSource && !useTrending
        ? userPreferences.categories
        : [],
    country:
      useCountry && !useSource && !useCategory && !useTrending
        ? userPreferences.country
        : "",
    trendingTopics:
      useTrending && !useSource && !useCategory && !useCountry
        ? userPreferences.trendingTopics
        : [],
  };

  const apiUrl = constructApiUrl(selectedPreference as NewsPreferences);

  const newsData = await fetchNewsFromAPI(apiUrl);

  // Update cache
  await updateNewsCache(userId, newsData);
  return { news: newsData };
};

const userActivities: UserActivity[] = [];

export const markArticleAsRead = async (
  userId: string,
  articleId: string
): Promise<void> => {
  let userActivity = userActivities.find(
    (activity) => activity.userId === userId
  );

  if (!userActivity) {
    userActivity = { userId, articles: [] };
    userActivities.push(userActivity);
  }

  const existingArticle = userActivity!.articles.find(
    (article) => article.articleId === articleId
  );

  if (existingArticle) {
    existingArticle.read = true;
  } else {
    userActivity!.articles.push({ articleId, read: true, favorite: false });
  }
};

export const markArticleAsFavorite = async (
  userId: string,
  articleId: string
): Promise<void> => {
  let userActivity = userActivities.find(
    (activity) => activity.userId === userId
  );

  if (!userActivity) {
    userActivity = { userId, articles: [] };
    userActivities.push(userActivity);
  }

  const existingArticle = userActivity!.articles.find(
    (article) => article.articleId === articleId
  );

  if (existingArticle) {
    existingArticle.favorite = true;
  } else {
    userActivity!.articles.push({ articleId, read: false, favorite: true });
  }
};

// TODO: Replace API with different API where we can fetch articles based on article Ids
// after fetching articleID from userActivity call the newsAPI to get the article details
export const getReadArticles = async (userId: string): Promise<string[]> => {
  const userActivity = userActivities.find(
    (activity) => activity.userId === userId
  );

  if (userActivity) {
    const readArticles = userActivity.articles
      .filter((article) => article.read)
      .map((article) => article.articleId);

    return readArticles;
  } else {
    return [];
  }
};

// TODO: Replace API with different API where we can fetch articles based on article Ids
// after fetching articleID from userActivity call the newsAPI to get the article details
export const getFavoriteArticles = async (
  userId: string
): Promise<string[]> => {
  const userActivity = userActivities.find(
    (activity) => activity.userId === userId
  );

  if (userActivity) {
    const favoriteArticles = userActivity.articles
      .filter((article) => article.favorite)
      .map((article) => article.articleId);

    return favoriteArticles;
  } else {
    return [];
  }
};
export const searchNewsForUser = async (keyword: string): Promise<string[]> => {
  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    keyword
  )}&apiKey=${NEWS_API_KEY}`;

  const response = await fetchNewsFromAPI(apiUrl);
  return response || [];
};
