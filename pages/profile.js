import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/auth";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await updateProfile({
        firstName,
        lastName,
      });

      setUser(data);

      alert("پروفایل بروزرسانی شد");
    } catch (err) {
      alert("خطا");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: 500,
          margin: "50px auto",
        }}
      >
        <h1>پروفایل</h1>

        <form onSubmit={submitHandler}>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="نام"
          />

          <br />
          <br />

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="نام خانوادگی"
          />

          <br />
          <br />

          <button disabled={loading}>
            {loading ? "..." : "ذخیره"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}