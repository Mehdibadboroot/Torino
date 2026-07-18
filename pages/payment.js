import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { useAuth } from "../context/AuthContext";

import { getBasket } from "../services/basket";
import { createOrder } from "../services/orders";
import { updateProfile, getProfile } from "../services/auth";

import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";

import { useRouter } from "next/router";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";

import { toast } from "react-toastify";

import Image from "next/image";
import styles from "../styles/Payment.module.css";

export default function Payment() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [basket, setBasket] = useState(null);

  const [loading, setLoading] = useState(false);

  const [needProfile, setNeedProfile] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    gender: "",
    birthDate: "",
  });

  useEffect(() => {
    loadProfile();
    loadBasket();
  }, []);

  const toEnglishDigits = (str = "") =>
    str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const convertToPersian = (date) => {
  if (!date) return "";

  return new DateObject({
    date: toEnglishDigits(date),
    calendar: gregorian,
  })
    .convert(persian)
    .format("YYYY/MM/DD");
};

  const loadProfile = async () => {
    try {
      const { data } = await getProfile();

      setUser(data);

      setForm({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        nationalCode: data.nationalCode || "",
        gender: data.gender || "",
        birthDate: data.birthDate || "",
      });

      const completed =
        data.firstName &&
        data.lastName &&
        data.nationalCode &&
        data.gender &&
        data.birthDate;

      setNeedProfile(!completed);
    } catch (err) {
      console.log(err);
    }
  };

  const loadBasket = async () => {
    try {
      const { data } = await getBasket();

      setBasket(data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    try {
      setLoading(true);

      if (needProfile) {
        await updateProfile({
          firstName: form.firstName,
          lastName: form.lastName,
          nationalCode: Number(form.nationalCode),
          gender: form.gender,
          birthDate: form.birthDate,
        });

        const { data: profile } = await getProfile();
        setNeedProfile(false);
        setUser(profile);
      }

      const payload = {
        nationalCode: Number(form.nationalCode),
        fullName: `${form.firstName} ${form.lastName}`,
        gender: form.gender,
        birthDate: form.birthDate,
      };

      const { data } = await createOrder(payload);

      toast.success(data.message);

      router.push("/my-tours");
    } catch (err) {
      console.log(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const days = basket
    ? Math.ceil(
        (new Date(basket.endDate) - new Date(basket.startDate)) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  const nights = Math.max(days - 1, 0);

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.right}>
          <h2 className={styles.title}>مشخصات مسافر</h2>

          {needProfile ? (
            <div className={styles.grid}>
              <input
                placeholder="نام و نام خانوادگی"
                name="firstName"
                value={form.firstName}
                onChange={changeHandler}
              />

              <input
                placeholder="نام خانوادگی"
                name="lastName"
                value={form.lastName}
                onChange={changeHandler}
              />

              <input
                placeholder="کد ملی"
                name="nationalCode"
                maxLength={10}
                value={form.nationalCode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nationalCode: e.target.value.replace(/\D/g, ""),
                  })
                }
              />

              <select
                name="gender"
                value={form.gender}
                onChange={changeHandler}
              >
                <option value="">جنسیت</option>
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>

              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={form.birthDate}
                format="YYYY/MM/DD"
                placeholder="تاریخ تولد"
                onChange={(date) => {
                  if (!date) return;

                  setForm({
                    ...form,
                    birthDate: date.convert(gregorian).format("YYYY-MM-DD"),
                  });
                }}
              />
            </div>
          ) : (
            <div className={styles.profileBox}>
              <div className={styles.profileItem}>
                <span>نام</span>
                <strong>{user?.firstName}</strong>
              </div>

              <div className={styles.profileItem}>
                <span>نام خانوادگی</span>
                <strong>{user?.lastName}</strong>
              </div>

              <div className={styles.profileItem}>
                <span>کد ملی</span>
                <strong>{user?.nationalCode}</strong>
              </div>

              <div className={styles.profileItem}>
                <span>جنسیت</span>
                <strong>{user?.gender === "male" ? "مرد" : "زن"}</strong>
              </div>

              <div className={styles.profileItem}>
                <span>تاریخ تولد</span>
                <strong>
                  {user?.birthDate ? convertToPersian(user.birthDate) : "-"}
                </strong>
              </div>
            </div>
          )}
        </div>

        <div className={styles.left}>
          {basket && (
            <>
              <Image
                src={basket.image}
                width={360}
                height={220}
                alt={basket.title}
                className={styles.image}
              />

              <h3>{basket.title}</h3>

              <p>
                {days} روز و {nights} شب
              </p>

              <div className={styles.price}>
                <span>قیمت نهایی</span>

                <strong>
                  {Number(basket.price).toLocaleString("fa-IR")} تومان
                </strong>
              </div>

              <button
                className={styles.payBtn}
                onClick={submitHandler}
                disabled={loading}
              >
                {loading ? "درحال ثبت..." : "ثبت و خرید نهایی"}
              </button>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
