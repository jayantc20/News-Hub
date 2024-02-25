import { query, validationResult, ValidationChain } from "express-validator";
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

    const { sources, category, country, trending } = req.query;

    // const finalTrending = trending === undefined ? "true" : trending;

    const trueCount = [sources, category, country, trending].filter(
      (value) => value === "true"
    ).length;

    if (trueCount === 0) {
      // Set trending to true if no other preferences are true
      req.query = { ...req.query, trending: "true" };
      // req.query.trending = "true";
    } else if (trueCount > 1) {
      const msg = "Only one of sources, category, country can be true";
      logger.info({
        msg,
      });
      return res.status(400).json({
        errors: [{ msg }],
      });
    }

    next();
  },
];

export const newspreferencesValidator = createValidator([
  query("sources")
    .optional()
    .isBoolean()
    .withMessage("sources must be a boolean"),

  query("category")
    .optional()
    .isBoolean()
    .withMessage("category must be a boolean"),

  query("country")
    .optional()
    .isBoolean()
    .withMessage("country must be a boolean"),

  query("trending")
    .optional()
    .isBoolean()
    .withMessage("trending must be a boolean"),
]);
