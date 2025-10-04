// src/services/api/articleSummarizer.ts
import api from "../axios";

export const getAllSummaries = async () => {
  const res = await api.get("/article-summarizers");
  return res.data;
};

export const getSummaryById = async (id: string) => {
  const res = await api.get(`/article-summarizers/${id}`);
  return res.data;
};

export const createSummary = async (data: { articleUrl?: string; articleText?: string }) => {
  const res = await api.post("/article-summarizers", data);
  return res.data;
};

export const updateSummary = async (id: string, data: any) => {
  const res = await api.put(`/article-summarizers/${id}`, data);
  return res.data;
};

export const deleteSummary = async (id: string) => {
  const res = await api.delete(`/article-summarizers/${id}`);
  return res.data;
};
