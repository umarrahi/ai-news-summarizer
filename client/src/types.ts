export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
  };
}

export interface ArticleSummary {
  id: string;
  title: string;
  originalUrl?: string;
  content?: string;
  summary: string;
  keywords: string[];
  dateGenerated: string;
  wordCount: number;
  readingTime: string;
  isPremium: boolean;
}

export interface HistoryItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  isPremium: boolean;
}

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

export interface Summary {
  id: string; // Keep as string (from backend)
  title: string;
  summary: string;
  originalUrl: string;
  keywords: string[];
  dateGenerated: string;
  wordCount: number;
  readingTime: string;
  createdAt: string;
}

export interface SummaryItem {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
}