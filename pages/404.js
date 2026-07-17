import Image from "next/image";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";

import styles from "../styles/Error.module.css";

export default function NotFound() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>صفحه مورد نظر یافت نشد!</h1>

          <Link href="/">بازگشت به صفحه اصلی</Link>
        </div>

        <div className={styles.image}>
          <Image src="/images/404.svg" width={350} height={350} alt="404" />
        </div>
      </div>
    </MainLayout>
  );
}
