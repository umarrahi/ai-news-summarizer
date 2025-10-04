// backend\src\models\articleSummarizer.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const ArticleSummarizer = sequelize.define("ArticleSummarizer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  articleUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  articleText: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Relation: User → ArticleSummarizer
User.hasMany(ArticleSummarizer, { foreignKey: "userId", onDelete: "CASCADE" });
ArticleSummarizer.belongsTo(User, { foreignKey: "userId" });

export default ArticleSummarizer;
