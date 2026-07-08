import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

import MainLayout from "../../layouts/MainLayout";
import { getTour } from "../../services/tours";
import { addToBasket } from "../../services/basket";
import { useAuth } from "../../context/AuthContext";

export default function TourDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth();

  const [tour, setTour] = useState(null);

  useEffect(() => {
    if (!id) return;

    getTour(id).then((res) => {
      setTour(res.data);
    });
  }, [id]);

  const reserveHandler = async () => {
    if (!user) {
      alert("ابتدا وارد شوید");
      return;
    }

    try {
      const res = await addToBasket(id);

      alert(res.data.message);
    } catch (err) {
      alert("خطا");
    }
  };

  if (!tour) return <p>درحال بارگذاری...</p>;

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto",
        }}
      >
        <Image
          src={tour.image}
          width={700}
          height={450}
          alt={tour.title}
        />

        <h1>{tour.title}</h1>

        <p>
          {tour.origin.name} → {tour.destination.name}
        </p>

        <p>
          قیمت:
          {" "}
          {tour.price.toLocaleString()}
          {" "}
          تومان
        </p>

        <p>
          ظرفیت:
          {" "}
          {tour.availableSeats}
          {" / "}
          {tour.capacity}
        </p>

        <button onClick={reserveHandler}>
          رزرو تور
        </button>
      </div>
    </MainLayout>
  );
}