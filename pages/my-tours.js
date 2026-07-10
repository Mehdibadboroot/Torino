import { useEffect, useState } from "react";
import Image from "next/image";

import MainLayout from "../layouts/MainLayout";
import { getMyTours } from "../services/orders";

export default function MyToursPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      const { data } = await getMyTours();

      setTours(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto",
        }}
      >
        <h2>تورهای من</h2>

        {tours.length === 0 && <p>هنوز توری خریداری نکرده‌اید.</p>}

        {tours.map((tour) => (
          <div
            key={tour.id}
            style={{
              display: "flex",
              gap: 20,
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 20,
              marginTop: 20,
            }}
          >
            <Image src={tour.image} width={220} height={150} alt={tour.title} />

            <div>
              <h3>{tour.title}</h3>

              <p>
                {tour.origin.name} → {tour.destination.name}
              </p>

              <p>{tour.price.toLocaleString()} تومان</p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
