import express, { json, urlencoded, Express } from "express";
import helmet from "helmet";
import config from "config";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./utils/errorHandler";
import router from "./routes";

const app: express.Application = express();
const port: number = config.get("PORT");

app.use(helmet());
// Use rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(limiter);

// Use Routes
app.use(router);

// Global Error Handler
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
