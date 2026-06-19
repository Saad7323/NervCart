import express from "express";
import cors from "cors";
import "dotenv/config";

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


app.listen(env.PORT, () => console.log("listening on port " + env.PORT));
// come to the vid here ^