import { useEffect, useState } from "react";
import Image from "next/image";

import MainLayout from "../layouts/MainLayout";
import { getBasket } from "../services/basket";
import { createOrder } from "../services/orders";

export default function BasketPage() {
  const [tour, setTour] = useState(null);

  useEffect(() => {
    loadBasket();
  }, []);

  const loadBasket = async () => {
    try {
      const { data } = await getBasket();
      setTour(data);
    } catch (err) {
      setTour(null);
    }
  };

  const paymentHandler = async () => {
  try {
    const orderData = {
      nationalCode: "3720878654",
      fullName: "John Doe",
      gender: "male",
      birthDate: "2022-10-10",
    };

    const { data } = await createOrder(orderData);

    alert(data.message);

    await loadBasket();
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.message || "پرداخت انجام نشد");
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
        <h2>سبد خرید</h2>

        {tour && (
          <button
            onClick={paymentHandler}
            style={{
              margin: "20px 0",
              padding: "10px 20px",
            }}
          >
            پرداخت
          </button>
        )}

        {!tour && <p>سبد خرید خالی است.</p>}

        {tour && (
          <div
            style={{
              display: "flex",
              gap: 20,
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <Image src={tour.image} width={250} height={170} alt={tour.title} />

            <div>
              <h2>{tour.title}</h2>

              <p>
                {tour.origin.name} → {tour.destination.name}
              </p>

              <p>قیمت: {tour.price.toLocaleString()} تومان</p>

              <p>
                ظرفیت: {tour.availableSeats}
                {" / "}
                {tour.capacity}
              </p>

              <p>وسیله نقلیه: {tour.fleetVehicle}</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
