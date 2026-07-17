import { useState } from "react";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";

import { updateProfile, getProfile } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

import styles from "./CompleteProfileModal.module.css";

export default function CompleteProfileModal({ onClose, onSuccess }) {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    nationalCode: user?.nationalCode || "",
    gender: user?.gender || "",
    birthDate: user?.birthDate || "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    if (!form.firstName.trim()) {
      return alert("نام را وارد کنید");
    }

    if (!form.lastName.trim()) {
      return alert("نام خانوادگی را وارد کنید");
    }

    if (!/^\d{10}$/.test(form.nationalCode)) {
      return alert("کد ملی معتبر نیست");
    }

    if (!form.gender) {
      return alert("جنسیت را انتخاب کنید");
    }

    if (!form.birthDate) {
      return alert("تاریخ تولد را انتخاب کنید");
    }

    try {
      setLoading(true);

      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        nationalCode: Number(form.nationalCode),
        gender: form.gender,
        birthDate: form.birthDate,
      };

      await updateProfile(payload);

      const { data } = await getProfile();

      setUser(data);

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      alert("ثبت اطلاعات با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>مشخصات مسافر</h2>

        <div className={styles.row}>
          <input
            type="text"
            name="firstName"
            placeholder="نام"
            value={form.firstName}
            onChange={changeHandler}
          />

          <input
            type="text"
            name="lastName"
            placeholder="نام خانوادگی"
            value={form.lastName}
            onChange={changeHandler}
          />
        </div>

        <div className={styles.row}>
          <input
            type="text"
            name="nationalCode"
            placeholder="کد ملی"
            maxLength={10}
            value={form.nationalCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");

              setForm({
                ...form,
                nationalCode: value,
              });
            }}
          />

          <select name="gender" value={form.gender} onChange={changeHandler}>
            <option value="">جنسیت</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
        </div>

        <div className={styles.dateWrapper}>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            value={form.birthDate}
            placeholder="تاریخ تولد"
            calendarPosition="bottom-right"
            onChange={(date) => {
              if (!date) return;

              const gregorianDate = date
                .convert(gregorian)
                .format("YYYY-MM-DD");

              setForm({
                ...form,
                birthDate: gregorianDate,
              });
            }}
          />
        </div>

        <button
          className={styles.submit}
          disabled={loading}
          onClick={submitHandler}
        >
          {loading ? "در حال ثبت..." : "ثبت و خرید نهایی"}
        </button>
      </div>
    </div>
  );
}
