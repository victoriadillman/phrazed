import OpenAI from "openai";

export default function handler(req, res) {
  const openai = new OpenAI();
  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{role: "system", content: "Give me a family friend phrase commonly said in the English language."}],
      model: "gpt-3.5-turbo",
    });
    res.status(200).json(completion.choices)
  }
}