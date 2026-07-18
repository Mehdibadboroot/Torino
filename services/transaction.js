import api from "./api";

export function getTransactions() {
  return api.get("/user/transactions");
}