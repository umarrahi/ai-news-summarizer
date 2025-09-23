import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const ArticleSummarizer = sequelize.define("ArticleSummarizer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true, // summary may be generated later
  },
});

// 🔗 Relationship: One User → Many Summarized Articles
User.hasMany(ArticleSummarizer, { foreignKey: "userId", onDelete: "CASCADE" });
ArticleSummarizer.belongsTo(User, { foreignKey: "userId" });

export default ArticleSummarizer;
