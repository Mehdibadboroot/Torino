import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import { getTransactions } from "../services/transaction";

import styles from "../styles/Transactions.module.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const { data } = await getTransactions();

        setTransactions(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>تراکنش ها</h1>

        {loading ? (
          <p className={styles.empty}>در حال دریافت اطلاعات...</p>
        ) : transactions.length === 0 ? (
          <p className={styles.empty}>تراکنشی وجود ندارد</p>
        ) : (
          <div className={styles.table}>
            <div className={styles.header}>
              <span>تاریخ و ساعت</span>

              <span>مبلغ(تومان)</span>

              <span>نوع تراکنش</span>

              <span>شناسه تراکنش</span>
            </div>

            {transactions.map((item) => (
              <div className={styles.row} key={item.id}>
                <span>
                  {new Date(item.createdAt).toLocaleTimeString("fa-IR")}
                  {" - "}
                  {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                </span>

                <span>{item.amount.toLocaleString()}</span>

                <span>ثبت نام در تور گردشگری </span>

                <span>سفارش {item.id.slice(0, 8)} </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
