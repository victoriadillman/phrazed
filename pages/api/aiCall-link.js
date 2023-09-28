import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_Key,
});

export default async function handler(req, res) {
    const completion = await openai.chat.completions.create({
      messages: [{role: "user", content: "Tell me a phrase said in the English language."}],
      model: "gpt-3.5-turbo",
      temperature: 1.2,
      max_tokens: 10
    });
    res.status(200).json(completion.choices[0]['message']['content']);
}