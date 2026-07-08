import api from "./api";

export const getTours = (params = {}) => {
  return api.get("/tour", {
    params,
  });
};

export const getTour = (tourId) => {
  return api.get(`/tour/${tourId}`);
};