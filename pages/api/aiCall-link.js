import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_Key,
});

export default async function handler(req, res) {
    const completion = await openai.chat.completions.create({
      messages: [{role: "user", content: "Give me a family friend phrase commonly said in the English language."}],
      model: "gpt-3.5-turbo",
      
    });
    res.status(200).json(completion.choices);
}