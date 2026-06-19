import express from "express";
import cors from "cors";
import "dotenv/config";

import fs from "node:fs";
import path from "node:path";



import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerk";
import { getEnv } from "./lib/env";

const env=getEnv();
const app=express();

const rawJson = express.raw({ type: "application/json", limit: "1 mb" });

app.post("/webhook/clerk", rawJson, (req, res) => {
  void clerkWebhookHandler(req, res);
});

app.use(express.json());
app.use(cors()); 
app.use(clerkMiddleware());

const publicDir = path.join(process.cwd(), "public");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }

    if (req.path.startsWith("/api") || req.path.startsWith("/webhooks")) {
      next();
      return;
    }

    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}


app.listen(env.PORT, () => console.log("listening on port " + env.PORT));
// come to the vid here ^