import api from "./api";

export const createOrder = (orderData) => {
  return api.post("/order", orderData);
};

export const getMyTours = () => {
  return api.get("/user/tours");
};