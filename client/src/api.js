import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// fetch by category
export const fetchItems = (category) => API.get(`/items?category=${category}`);

// fetch by id
export const fetchItem = (id) => API.get(`/items/${id}`);

// add new item
export const createItem = (newItem) => API.post("/items/add", newItem);

// remove item
export const removeItem = (id) => API.delete(`/items/${id}`);
