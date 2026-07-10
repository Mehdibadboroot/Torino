import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTours } from "../services/tours";

export default function useTours() {
  const router = useRouter();

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const loadTours = async () => {
      try {
        setLoading(true);

        const { originId, destinationId, startDate, endDate } = router.query;

        const params = {};

        if (originId) params.originId = originId;
        if (destinationId) params.destinationId = destinationId;
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        console.log(params);
        const { data } = await getTours(params);

        setTours(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, [router.isReady, router.query]);

  return {
    tours,
    loading,
  };
}