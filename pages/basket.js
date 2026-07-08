import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MainLayout from "../layouts/MainLayout";
import { getBasket } from "../services/basket";

export default function Basket() {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    getBasket().then((res) => {
      setBasket(res.data);
    });
  }, []);

  const totalPrice = basket.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: 1100,
          margin: "40px auto",
        }}
      >
        <h1>سبد خرید</h1>

        {basket.map((tour) => (
          <div
            key={tour.id}
            style={{
              display: "flex",
              gap: 20,
              border: "1px solid #ddd",
              borderRadius: 12,
              marginBottom: 20,
              padding: 20,
            }}
          >
            <Image
              src={tour.image}
              width={220}
              height={150}
              alt={tour.title}
            />

            <div>
              <h2>{tour.title}</h2>

              <p>
                {tour.origin.name} → {tour.destination.name}
              </p>

              <p>
                {tour.price.toLocaleString()} تومان
              </p>
            </div>
          </div>
        ))}

        <h2>
          مجموع :
          {" "}
          {totalPrice.toLocaleString()}
          {" "}
          تومان
        </h2>

        <Link href="/payment">
          <button>ادامه خرید</button>
        </Link>
      </div>
    </MainLayout>
  );
}