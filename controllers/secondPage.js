const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function articleSummary(link) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = "i am giving a news article link describe the news in depth and in an easy to understand language " + link;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text)
  return text
}

exports.getArticle = async (req, res) => {
  try {
    const { url } = req.body
    const summary = await articleSummary(url)
    res.json(summary)
  } catch (err) {
    console.log(err.message)
  }
}
