interface CachedNews {
  data: string[];
  timestamp: number;
}

const newsCache: Record<string, CachedNews> = {};
const CACHE_EXPIRATION_TIME = 60 * 1000; // 1min in milliseconds
const MAX_CACHE_SIZE = 100; // Set your desired maximum cache size

export const getNewsFromCache = async (
  userId: string
): Promise<string[] | undefined> => {
  const cachedNews = newsCache[userId];

  if (cachedNews && isCacheValid(cachedNews.timestamp)) {
    return cachedNews.data;
  }
  return undefined;
};

export const updateNewsCache = async (
  userId: string,
  news: string[]
): Promise<void> => {
  newsCache[userId] = {
    data: news,
    timestamp: Date.now(),
  };

  enforceCacheSizeLimit();
};

const isCacheValid = (timestamp: number): boolean => {
  const currentTime = Date.now();
  return currentTime - timestamp < CACHE_EXPIRATION_TIME;
};

const enforceCacheSizeLimit = () => {
  const userIds = Object.keys(newsCache);

  if (userIds.length > MAX_CACHE_SIZE) {
    const sortedUserIds = userIds.sort(
      (a, b) => newsCache[a].timestamp - newsCache[b].timestamp
    );

    // Remove entries until the size is within the limit
    const entriesToRemove = sortedUserIds.length - MAX_CACHE_SIZE;
    for (let i = 0; i < entriesToRemove; i++) {
      delete newsCache[sortedUserIds[i]];
    }
  }
};
