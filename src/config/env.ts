import * as dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

const envVariables = z.object({
  // Open AI
  OPENAI_KEY: z.string(),
  // Twitter
  TWITTER_APP_KEY: z.string(),
  TWITTER_APP_SECRET: z.string(),
  TWITTER_ACCESS_TOKEN: z.string(),
  TWITTER_ACCESS_SECRET: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
