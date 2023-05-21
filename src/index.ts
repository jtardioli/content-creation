import "./config/env.js";
import { openai } from "./config/openai.js";
import { rwTwitterClient } from "./config/twitter.js";

async function main() {
  const prompt = `Give me 1 useful tip for when using React`;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.9,
      max_tokens: 120,
    });

    const tweetText = response.data.choices[0].text;
    console.log("prompt:", prompt);
    console.log(tweetText);

    if (tweetText) {
      await rwTwitterClient.v2.tweet(`${tweetText} #React`);
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
