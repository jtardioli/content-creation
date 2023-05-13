import "./config/env.js";
import { openai } from "./config/openai.js";
import { rwTwitterClient } from "./config/twitter.js";

// List of technologies
const technologies = [
  "React",
  "A React hook",
  "React component optimization",
  "React query library",
  "Solidity",
  "Solidity gas optimizations",
  "TypeScript",
  "SQL",
  "Prisma",
  "tRPC",
  "Zod",
  "Blockchain",
];

async function main() {
  try {
    const randomTech =
      technologies[Math.floor(Math.random() * technologies.length)];

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Give a specific tip related to ${randomTech} in the context of web development. keep it as concise as possible. Avoid obvious advice like using the latest versions of technologies. add the end add a # like a tweet`,
      temperature: 0.9,
      max_tokens: 130,
    });

    const tweetText = response.data.choices[0].text;
    console.log("prompt:", randomTech);
    console.log(tweetText);

    if (tweetText) {
      await rwTwitterClient.v2.tweet(tweetText);
    } else {
      throw Error("No tweetText available");
    }
    console.log("Tweet posted");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}

main();
