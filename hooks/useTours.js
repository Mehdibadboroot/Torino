import { useEffect, useState } from "react";
import { getTours } from "../services/tours";

export default function useTours(filters = {}) {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTours() {
      try {
        const { data } = await getTours(filters);
        setTours(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  return {
    tours,
    loading,
  };
}