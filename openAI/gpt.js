import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const askGPT = async (query) => {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "assistant", content: "Provide just the answer to asked question without any explanations"},{ role: "user", content: query }],
    });

    return chatCompletion.data.choices[0].message.content;
  } catch (e) {
    console.log(e);
  }
};

export default askGPT;
