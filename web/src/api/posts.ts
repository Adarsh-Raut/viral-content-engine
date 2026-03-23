import axios from "axios";

const API = "http://localhost:5000/api";

export async function fetchPosts({ pageParam = 1, sort = "top" }) {
  const res = await axios.get(`${API}/posts`, {
    params: {
      page: pageParam,
      limit: 12,
      sort,
    },
  });

  return res.data;
}
