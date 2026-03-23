import axios from "axios";

const API = "http://localhost:5000/api";

export async function fetchPosts(params: {
  page?: number;
  limit?: number;
  sort?: string;
}) {
  const res = await axios.get(`${API}/posts`, { params });
  return res.data;
}
