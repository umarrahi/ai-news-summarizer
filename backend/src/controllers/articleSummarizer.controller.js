import ArticleSummarizer from "../models/articleSummarizer.model.js";
import User from "../models/user.model.js";

// Create Summarized Article
export const createArticleSummarizer = async (req, res) => {
  try {
    const { title, content, summary } = req.body;

    const newArticle = await ArticleSummarizer.create({
      title,
      content,
      summary,
      userId: req.user.id, // 👈 attach logged-in user
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
