import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import { createOrder } from "../services/orders";

export default function Payment() {
  const [loading, setLoading] = useState(false);

  const paymentHandler = async () => {
    try {
      setLoading(true);

      const res = await createOrder();

      alert(res.data.message);

    } catch (err) {
      alert("خطا در پرداخت");
    }

    setLoading(false);
  };

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: 600,
          margin: "80px auto",
          textAlign: "center",
        }}
      >
        <h1>پرداخت</h1>

        <button
          onClick={paymentHandler}
          disabled={loading}
        >
          {loading ? "درحال پرداخت..." : "پرداخت"}
        </button>
      </div>
    </MainLayout>
  );
}