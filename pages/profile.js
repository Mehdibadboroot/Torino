import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import DateObject from "react-date-object";
import { updateProfile, getProfile } from "../services/auth";

import styles from "../styles/Profile.module.css";

export default function ProfilePage() {
  const { user, setUser } = useAuth();

  const [editingAccount, setEditingAccount] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingBank, setEditingBank] = useState(false);
  const [birthDatePicker, setBirthDatePicker] = useState(null);

  const [form, setForm] = useState({
    email: "",

    firstName: "",
    lastName: "",
    nationalCode: "",
    gender: "",
    birthDate: "",

    shaba_code: "",
    debitCard_code: "",
    accountIdentifier: "",
  });

  const convertToPersian = (date) => {
    if (!date) return "";

    return new DateObject({
      date,
      calendar: gregorian,
    })
      .convert(persian)
      .format("YYYY/MM/DD");
  };

  useEffect(() => {
    if (!user) return;

    setForm({
      email: user.email || "",

      firstName: user.firstName || "",
      lastName: user.lastName || "",
      nationalCode: user.nationalCode || "",
      gender: user.gender || "",

      birthDate: convertToPersian(user.birthDate),

      shaba_code: user.payment?.shaba_code || "",
    });

    if (user.birthDate) {
      setBirthDatePicker(
        new DateObject({
          date: user.birthDate,
          calendar: gregorian,
        }).convert(persian),
      );
    }
  }, [user]);

  const changeHandler = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const saveHandler = async () => {
    if (editingPersonal && form.nationalCode.length !== 10) {
      alert("کد ملی باید ۱۰ رقم باشد");
      return;
    }

    if (
      editingBank &&
      form.debitCard_code &&
      form.debitCard_code.length !== 16
    ) {
      alert("شماره کارت باید ۱۶ رقم باشد");
      return;
    }

    try {
      const payload = {
        firstName: form.firstName,

        lastName: form.lastName,

        gender: form.gender,

        birthDate: new DateObject({
          date: form.birthDate,
          calendar: persian,
        })
          .convert(gregorian)
          .format("YYYY-MM-DD"),

        nationalCode: Number(form.nationalCode),

        email: form.email,

        payment: {
          shaba_code: form.shaba_code,

          debitCard_code: form.debitCard_code,

          accountIdentifier: form.accountIdentifier,
        },
      };

      await updateProfile(payload);

      try {
        const { data } = await getProfile();

        setUser(data);
      } catch (err) {
        console.log("refresh profile error", err);
      }

      setEditingAccount(false);

      setEditingPersonal(false);

      setEditingBank(false);

      alert("اطلاعات با موفقیت ذخیره شد");
    } catch (err) {
      console.log(err.response?.data || err);

      alert("خطا در ذخیره اطلاعات");
    }
  };
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>اطلاعات حساب کاربری</h3>

              {!editingAccount ? (
                <button onClick={() => setEditingAccount(true)}>
                  ویرایش اطلاعات
                </button>
              ) : (
                <div className={styles.actions}>
                  <button className={styles.save} onClick={saveHandler}>
                    تایید
                  </button>

                  <button
                    className={styles.cancel}
                    onClick={() => setEditingAccount(false)}
                  >
                    انصراف
                  </button>
                </div>
              )}
            </div>

            {!editingAccount ? (
              <div className={styles.grid}>
                <div>
                  <span>شماره موبایل</span>

                  <strong>{user?.mobile || "-"}</strong>
                </div>

                <div>
                  <span>ایمیل</span>

                  <strong>{user?.email || "-"}</strong>
                </div>
              </div>
            ) : (
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>ایمیل</label>

                  <input
                    name="email"
                    value={form.email}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>اطلاعات شخصی</h3>

              {!editingPersonal ? (
                <button onClick={() => setEditingPersonal(true)}>
                  ویرایش اطلاعات
                </button>
              ) : (
                <div className={styles.actions}>
                  <button className={styles.save} onClick={saveHandler}>
                    تایید
                  </button>

                  <button
                    className={styles.cancel}
                    onClick={() => setEditingPersonal(false)}
                  >
                    انصراف
                  </button>
                </div>
              )}
            </div>

            {!editingPersonal ? (
              <div className={styles.grid}>
                <div>
                  <span>نام و نام خانوادگی</span>

                  <strong>
                    {user?.firstName || "-"} {user?.lastName || ""}
                  </strong>
                </div>

                <div>
                  <span>کد ملی</span>

                  <strong>{user?.nationalCode || "-"}</strong>
                </div>

                <div>
                  <span>جنسیت</span>

                  <strong>
                    {user?.gender === "male"
                      ? "مرد"
                      : user?.gender === "female"
                        ? "زن"
                        : "-"}
                  </strong>
                </div>

                <div>
                  <span>تاریخ تولد</span>

                  <strong>{user?.birthDate || "-"}</strong>
                </div>
              </div>
            ) : (
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>نام</label>

                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={changeHandler}
                  />
                </div>

                <div className={styles.field}>
                  <label>نام خانوادگی</label>

                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={changeHandler}
                  />
                </div>

                <div className={styles.field}>
                  <label>کد ملی</label>

                  <input
                    name="nationalCode"
                    value={form.nationalCode}
                    maxLength={10}
                    inputMode="numeric"
                    onChange={(e) => {
                      setForm({
                        ...form,

                        nationalCode: e.target.value.replace(/\D/g, ""),
                      });
                    }}
                  />
                </div>

                <div className={styles.field}>
                  <label>جنسیت</label>

                  <select
                    name="gender"
                    value={form.gender}
                    onChange={changeHandler}
                  >
                    <option value="">انتخاب کنید</option>

                    <option value="male">مرد</option>

                    <option value="female">زن</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>تاریخ تولد</label>

                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    format="YYYY/MM/DD"
                    placeholder="تاریخ تولد"
                    value={birthDatePicker}
                    onChange={(date) => {
                      if (!date) {
                        setBirthDatePicker(null);

                        setForm({
                          ...form,
                          birthDate: "",
                        });

                        return;
                      }

                      setBirthDatePicker(date);

                      setForm({
                        ...form,

                        birthDate: date.convert(gregorian).format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>اطلاعات حساب بانکی</h3>

              {!editingBank ? (
                <button onClick={() => setEditingBank(true)}>
                  ویرایش اطلاعات
                </button>
              ) : (
                <div className={styles.actions}>
                  <button className={styles.save} onClick={saveHandler}>
                    تایید
                  </button>

                  <button
                    className={styles.cancel}
                    onClick={() => setEditingBank(false)}
                  >
                    انصراف
                  </button>
                </div>
              )}
            </div>

            {!editingBank ? (
              <div className={styles.grid}>
                <div>
                  <span>شماره شبا</span>

                  <strong>{user?.payment?.shaba_code || "-"}</strong>
                </div>

                <div>
                  <span>شماره کارت</span>

                  <strong>{user?.payment?.debitCard_code || "-"}</strong>
                </div>

                <div>
                  <span>شماره حساب</span>

                  <strong>{user?.payment?.accountIdentifier || "-"}</strong>
                </div>
              </div>
            ) : (
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>شماره شبا</label>

                  <input
                    name="shaba_code"
                    value={form.shaba_code}
                    maxLength={26}
                    inputMode="numeric"
                    onChange={(e) => {
                      setForm({
                        ...form,

                        shaba_code: e.target.value.replace(/\D/g, ""),
                      });
                    }}
                  />
                </div>

                <div className={styles.field}>
                  <label>شماره کارت</label>

                  <input
                    name="debitCard_code"
                    value={form.debitCard_code}
                    maxLength={16}
                    inputMode="numeric"
                    onChange={(e) => {
                      setForm({
                        ...form,

                        debitCard_code: e.target.value.replace(/\D/g, ""),
                      });
                    }}
                  />
                </div>

                <div className={styles.field}>
                  <label>شماره حساب</label>

                  <input
                    name="accountIdentifier"
                    value={form.accountIdentifier}
                    maxLength={20}
                    inputMode="numeric"
                    onChange={(e) => {
                      setForm({
                        ...form,

                        accountIdentifier: e.target.value.replace(/\D/g, ""),
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
