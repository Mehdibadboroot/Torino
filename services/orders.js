import api from "./api";

export const createOrder = () =>
  api.post("/order");

export const getMyTours = () => {
  return api.get("/user/tours");
};