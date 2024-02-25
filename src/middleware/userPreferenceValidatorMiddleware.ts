import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const createValidator = (validations: ValidationChain[]) => [
  ...validations,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.info(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const preferencesValidator = createValidator([
  body("preferences.categories")
    .isArray()
    .withMessage("Categories must be an array"),

  body("preferences.sources").isArray().withMessage("Sources must be an array"),

  body("preferences.country")
    .isString()
    .withMessage("country preference must be a string"),

  body("preferences.contentType")
    .isArray()
    .withMessage("Content type must be an array"),

  body("preferences.frequencyOfUpdates")
    .isString()
    .withMessage("Frequency of updates must be a string"),

  body("preferences.language")
    .isString()
    .withMessage("Language must be a string"),

  body("preferences.trendingTopics")
    .isArray()
    .withMessage("Trending topics must be an array"),
]);
