import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "../styles/Basket.module.css";
import MainLayout from "../layouts/MainLayout";

import { getBasket } from "../services/basket";

export default function BasketPage() {
  const router = useRouter();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBasket();
  }, []);

  const loadBasket = async () => {
    try {
      const res = await getBasket();


      const data = res?.data;

      if (!data || !data.id) {
        setTour(null);
        return;
      }

      setTour(data);
    } catch (err) {

      setTour(null);
    } finally {
      setLoading(false);
    }
  };
  const paymentHandler = () => {
    router.push("/payment");
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>سبد خرید</h1>

        {loading && <p>در حال دریافت اطلاعات...</p>}

        {!loading && !tour && (
          <div className={styles.empty}>
            <h2>سبد خرید خالی است</h2>

            <p>هنوز توری به سبد خرید اضافه نکرده‌اید.</p>
          </div>
        )}

        {!loading && tour && (
          <div className={styles.card}>
            <div className={styles.imageBox}>
              <Image
                src={tour.image}
                width={280}
                height={190}
                alt={tour.title}
                className={styles.image}
              />
            </div>

            <div className={styles.info}>
              <h2>{tour.title}</h2>

              <div className={styles.route}>
                {tour.origin?.name}

                <span>→</span>

                {tour.destination?.name}
              </div>

              <div className={styles.items}>
                <div>
                  <span>قیمت</span>

                  <strong>
                    {Number(tour.price).toLocaleString("fa-IR")} تومان
                  </strong>
                </div>

                <div>
                  <span>ظرفیت</span>

                  <strong>
                    {tour.availableSeats}

                    {" / "}

                    {tour.capacity}
                  </strong>
                </div>

                <div>
                  <span>وسیله نقلیه</span>

                  <strong>{tour.fleetVehicle}</strong>
                </div>
              </div>
            </div>

            <button className={styles.payment} onClick={paymentHandler}>
              ادامه و پرداخت
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
