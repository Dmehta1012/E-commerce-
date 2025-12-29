import axios from "axios";

const fetchproduct = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const getproduct = async () => {
  const res= await fetchproduct.get("/products");
  return res.data;
};

export default fetchproduct