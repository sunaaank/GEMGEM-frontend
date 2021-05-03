import {
  PlainAPI,
  API,
  API_URL,
  version,
  createAsyncPromise,
} from "./api.config";
import { getToken, saveToken, destroyToken } from "../auth";
export { version };

export const api_url = API_URL;
export const refresh = () =>
  PlainAPI.post(
    "/token",
    {},
    {
      headers: {
        "X-CSRF-TOKEN": getToken().csrf,
        Authorization: `Bearer ${getToken().token}`,
      },
    }
  ).then((res) => {
    saveToken(res.data);
    return res.data;
  });

// User
export const login = (params) =>
  PlainAPI.post("/login", params).then((res) => {
    saveToken(res.data);
    return res;
  });
export const signup = (params) =>
  PlainAPI.post("/signup", params).then((res) => {
    saveToken(res.data);
    return res;
  });
export const logout = (_) =>
  API.delete("/logout").then((res) => {
    destroyToken();
  });
// User
export const getUser = () => API.get("/users");

// Category
export const getCategories = () => API.get("/categories");

// Item
export const getItems = () => API.get("/items");
export const getItem = (params) => API.get(`/items/${params}`);

// Cart
export const getCart = () => API.get(`/line_items`);
export const createCart = (params) =>
  API.patch(`/line_items/${params.item_id}`, params);
export const updateCart = (params) => API.patch(`/line_items/${params}`);
export const deleteCart = (params) =>
  API.delete(`/line_items/${params.item_id}`, params);

// Order
export const getOrder = () => API.get(`/order`);
export const createOrder = (params) => API.post(`/order`, params);
export const updateOrder = (params) => API.patch(`/order`, params);

// 카트 오더 아이디값 받아오는 api
