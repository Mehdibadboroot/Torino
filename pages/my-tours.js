import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getMyTours } from "../services/orders";

export default function MyTours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    getMyTours().then((res) => {
      setTours(res.data);
    });
  }, []);

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto",
        }}
      >
        <h1>تورهای من</h1>

        {tours.map((tour) => (
          <div
            key={tour.id}
            style={{
              border: "1px solid #ddd",
              padding: 20,
              marginBottom: 20,
            }}
          >
            <h3>{tour.title}</h3>

            <p>
              {tour.origin.name} → {tour.destination.name}
            </p>

            <p>{tour.price.toLocaleString()} تومان</p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}