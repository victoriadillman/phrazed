import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_Key,
});

export default async function handler(req, res) {
    const completion = await openai.chat.completions.create({
      messages: [{role: "user", content: "Tell me a complete short idiom said in the English language"}],
      model: "gpt-3.5-turbo",
      temperature: 1
    });
    const string = completion.choices[0]['message']['content'];
    if (string[0] === '"' && string[string.length - 1] === '"') {
      const newStr = string.slice(1, string.length - 2);
      completion.choices[0]['message']['content'] = newStr;
    }
    // const completion = {'choices':[{'message': {'content':'dummy data'}}]};
    res.status(200).json(completion.choices[0]['message']['content']);
}