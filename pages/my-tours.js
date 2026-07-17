import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getMyTours } from "../services/orders";
import styles from "../styles/MyTours.module.css";

export default function MyTours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      const { data } = await getMyTours();

      setTours(data);
    } catch (err) {
      console.log(err);

      setTours([]);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("fa-IR");
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>تور های من</h1>

        {tours.length === 0 ? (
          <p>توری خریداری نشده است</p>
        ) : (
          tours.map((tour) => (
            <div className={styles.card} key={tour.id}>
              <div className={styles.header}>
                <h3>{tour.title || "تور اقلیم کردستان"}</h3>

                <span className={`${styles.status} ${styles.completed}`}>
                  به اتمام رسیده
                </span>
              </div>

              <div className={styles.divider} />

              <div className={styles.info}>
                <div className={styles.item}>
                  <span>شماره تور:</span>

                  <strong>{tour.id}</strong>
                </div>

                <div className={styles.item}>
                  <span>شروع:</span>

                  <strong>{formatDate(tour.startDate)}</strong>
                </div>

                <div className={styles.item}>
                  <span>برگشت:</span>

                  <strong>{formatDate(tour.endDate)}</strong>
                </div>

                <div className={styles.item}>
                  <span>مبلغ پرداخت شده:</span>

                  <strong className={styles.green}>
                    {Number(tour.price).toLocaleString("fa-IR")} تومان
                  </strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}
