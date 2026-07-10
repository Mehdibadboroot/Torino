import api from "./api";

export const getTours = (params = {}) => {
  return api.get("/tour", {
    params,
  });
};

export const getTour = (id) => {
  return api.get(`/tour/${id}`);
};