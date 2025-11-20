import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { healthHandler } from "./handlers/health";
import { getOgImageHandler } from "./handlers/og";
import { logger } from "hono/logger";

export const app = new Hono();

app.use(logger());

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/health", healthHandler);

app.get("/og", getOgImageHandler);

export const handler = handle(app);

export default app;
