import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { mw as requestIp } from "request-ip";
import { StatusCodes } from "http-status-codes";
import routes from "./routes";
import { loggerHandler } from "./middlewares/logger";
import { errorHandler, notFoundHandler } from "./middlewares/error";

dotenv.config();

const { PORT = 8000 } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestIp());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req, res) => {
      console.warn(`DDoS Attempt from ${req.ip}`);
      res.status(StatusCodes.TOO_MANY_REQUESTS).json({
        error: "Too many requests. Please try in a minute.",
      });
    },
  })
);
app.use(loggerHandler);

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to the API!",
  });
});
app.use("/api", routes);

app.all("*", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
