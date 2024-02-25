import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import {
  getNewsController,
  markAsReadController,
  markAsFavoriteController,
  getReadArticlesController,
  getFavoriteArticlesController,
  searchNewsController,
} from "../controllers/newsController";
import { newspreferencesValidator } from "../middleware/newsPreferenceValidatorMiddleware";

const newsRoutes = Router();

// Get News (requires authentication)
newsRoutes.get(
  "/",
  authenticateUser,
  newspreferencesValidator,
  getNewsController
);

// Mark article as read
newsRoutes.post("/:articleId/read", authenticateUser, markAsReadController);

// Mark article as favorite
newsRoutes.post(
  "/:articleId/favorite",
  authenticateUser,
  markAsFavoriteController
);

// Get read news
newsRoutes.get("/read", authenticateUser, getReadArticlesController);

// Get favorite news
newsRoutes.get("/favorites", authenticateUser, getFavoriteArticlesController);

// Search for news
newsRoutes.get("/search/:keyword", authenticateUser, searchNewsController);

export default newsRoutes;
