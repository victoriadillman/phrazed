import OpenAI from "openai";
const configuration = new Configuration({
  organization: "",
  apiKey: process.env.OPENAI_API_Key,
});
const openai = new OpenAI(configuration);

export default async function handler(req, res) {
    const completion = await openai.chat.completions.create({
      messages: [{role: "system", content: "Give me a family friend phrase commonly said in the English language."}],
      model: "gpt-3.5-turbo",
    });
    res.status(200).json(completion.choices);
}