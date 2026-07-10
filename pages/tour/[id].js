import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import TourDetails from "../../components/TourDetails/TourDetails";

import { getTour } from "../../services/tours";

export default function TourPage() {
  const router = useRouter();
  const { id } = router.query;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadTour = async () => {
      try {
        const { data } = await getTour(id);
        setTour(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, [id]);

  

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "1220px",
          margin: "40px auto",
          padding: "0 16px",
        }}
      >
        {loading && <h3>در حال دریافت اطلاعات...</h3>}

        {!loading && tour && <TourDetails tour={tour} />}
      </div>
    </MainLayout>
  );
}