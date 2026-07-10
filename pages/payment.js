import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import { createOrder } from "../services/orders";

export default function Payment() {
  const [loading, setLoading] = useState(false);

  const paymentHandler = async () => {
    try {
      const payload = {
        nationalCode: "3720878654",
        fullName: "John Doe",
        gender: "male",
        birthDate: "2022-10-10",
      };

      console.log("SEND:", payload);

      const { data } = await createOrder(payload);

      console.log("SUCCESS:", data);

      alert(data.message);

      await loadBasket();
    } catch (err) {
      console.log("STATUS:", err.response?.status);
      console.log("ERROR:", err.response?.data);
      console.log("REQUEST:", err.config?.data);
    }
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

        <button onClick={paymentHandler} disabled={loading}>
          {loading ? "درحال پرداخت..." : "پرداخت"}
        </button>
      </div>
    </MainLayout>
  );
}
