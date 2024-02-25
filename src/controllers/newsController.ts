import { Request, Response, NextFunction } from "express";
import {
  getNewsForUser,
  searchNewsForUser,
  markArticleAsRead,
  markArticleAsFavorite,
  getReadArticles,
  getFavoriteArticles,
} from "../services/newsService";

export const getNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await getNewsForUser(req);

    if ("error" in result) {
      res.status(result.status).json({ error: result.error });
    } else {
      res.json({ news: result.news });
    }
  } catch (error) {
    next(error);
  }
};

export const searchNewsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keyword = req.params.keyword;

  try {
    const result = await searchNewsForUser(keyword);
    res.json({ searchResult: result });
  } catch (error) {
    next(error);
  }
};

export const markAsReadController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.userId;
  const articleId = req.params.articleId;

  try {
    await markArticleAsRead(userId, articleId);
    res.json({ message: "Article marked as read successfully." });
  } catch (error) {
    next(error);
  }
};

export const markAsFavoriteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.userId;
  const articleId = req.params.articleId;

  try {
    await markArticleAsFavorite(userId, articleId);
    res.json({ message: "Article marked as favorite successfully." });
  } catch (error) {
    next(error);
  }
};

export const getReadArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.userId;

  try {
    const readArticles = await getReadArticles(userId);
    res.json({ readArticles });
  } catch (error) {
    next(error);
  }
};

export const getFavoriteArticlesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.userId;

  try {
    const favoriteArticles = await getFavoriteArticles(userId);
    res.json({ favoriteArticles });
  } catch (error) {
    next(error);
  }
};
