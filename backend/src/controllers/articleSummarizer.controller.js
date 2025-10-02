// // backend\src\controllers\articleSummarizer.controller.js
// import ArticleSummarizer from "../models/articleSummarizer.model.js";
// import User from "../models/user.model.js";

// // Create Summarized Article
// export const createArticleSummarizer = async (req, res) => {
//   try {
//     const { title, content, summary } = req.body;

//     const newArticle = await ArticleSummarizer.create({
//       title,
//       content,
//       summary,
//       userId: req.user.id, // 👈 attach logged-in user
//     });

//     res.status(201).json(newArticle);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // Get All Summarized Articles (with User info)
// export const getAllArticleSummarizers = async (req, res) => {
//   try {
//     const articles = await ArticleSummarizer.findAll({
//       include: { model: User, attributes: ["id", "name", "email"] },
//     });
//     res.json(articles);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get Single Summarized Article
// export const getArticleSummarizerById = async (req, res) => {
//   try {
//     const article = await ArticleSummarizer.findByPk(req.params.id, {
//       include: { model: User, attributes: ["id", "name", "email"] },
//     });
//     if (!article) return res.status(404).json({ message: "Article summarizer not found" });
//     res.json(article);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update Summarized Article
// export const updateArticleSummarizer = async (req, res) => {
//   try {
//     const article = await ArticleSummarizer.findByPk(req.params.id);
//     if (!article) return res.status(404).json({ message: "Article summarizer not found" });

//     await article.update(req.body);
//     res.json(article);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete Summarized Article
// export const deleteArticleSummarizer = async (req, res) => {
//   try {
//     const article = await ArticleSummarizer.findByPk(req.params.id);
//     if (!article) return res.status(404).json({ message: "Article summarizer not found" });

//     await article.destroy();
//     res.json({ message: "Article summarizer deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


import fetch from "node-fetch";
import * as cheerio from "cheerio";
import ArticleSummarizer from "../models/articleSummarizer.model.js";
import User from "../models/user.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Extract text from URL
const extractArticleText = async (url) => {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  let text = "";
  $("p").each((_, el) => {
    text += $(el).text() + " ";
  });

  return text.trim();
};

// Summarize using Gemini
const generateSummary = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  console.log(model);
  const result = await model.generateContent(
    `Summarize the following article in 5 sentences:\n\n${text}`
  );
  return result.response.text();
};

// Create Summarizer
export const createArticleSummarizer = async (req, res) => {
  try {
    const { articleUrl, articleText } = req.body;

    let content = articleText;

    if (articleUrl) {
      content = await extractArticleText(articleUrl);
    }

    if (!content) {
      return res.status(400).json({ message: "Please provide either articleUrl or articleText" });
    }

    const summary = await generateSummary(content);

    const newArticle = await ArticleSummarizer.create({
      articleUrl,
      articleText: content,
      summary,
      userId: req.user.id,
    });

    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Summarized Articles (with User info)
export const getAllArticleSummarizers = async (req, res) => {
  try {
    const articles = await ArticleSummarizer.findAll({
      include: { model: User, attributes: ["id", "name", "email"] },
    });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Summarized Article
export const getArticleSummarizerById = async (req, res) => {
  try {
    const article = await ArticleSummarizer.findByPk(req.params.id, {
      include: { model: User, attributes: ["id", "name", "email"] },
    });
    if (!article) return res.status(404).json({ message: "Article summarizer not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Summarized Article
export const updateArticleSummarizer = async (req, res) => {
  try {
    const article = await ArticleSummarizer.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Article summarizer not found" });

    await article.update(req.body);
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Summarized Article
export const deleteArticleSummarizer = async (req, res) => {
  try {
    const article = await ArticleSummarizer.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Article summarizer not found" });

    await article.destroy();
    res.json({ message: "Article summarizer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};