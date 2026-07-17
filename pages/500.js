import Image from "next/image";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/Error.module.css";

export default function ServerError() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>اتصال با سرور برقرار نیست!</h1>

          <p>لطفا بعدا دوباره امتحان کنید.</p>

          <Link href="/">بازگشت به صفحه اصلی</Link>
        </div>

        <div className={styles.image}>
          <Image
            src="/images/500.svg"
            width={350}
            height={350}
            alt="server error"
          />
        </div>
      </div>
    </MainLayout>
  );
}
