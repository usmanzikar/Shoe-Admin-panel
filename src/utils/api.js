import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Products
export const fetchProducts = () => API.get("/products");

export const createProduct = (productData) => {
  if (productData instanceof FormData) {
    return API.post("/products", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return API.post("/products", productData);
};

export const updateProduct = (id, productData) => {
  if (productData instanceof FormData) {
    return API.put(`/products/${id}`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return API.put(`/products/${id}`, productData);
};

export const deleteProduct = (id) => API.delete(`/products/${id}`);

//offersPage
export const updateProductOffer = (id, offer) =>
  axios.put(`/api/products/${id}/offer`, { offer });

export default API;
