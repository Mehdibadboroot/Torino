import { useState } from "react";
import { sendOtp, checkOtp } from "../../../services/auth";
import { useAuth } from "../../../context/AuthContext";

export default function LoginModal({ onClose }) {
  const { login } = useAuth();

  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const sendCodeHandler = async () => {
    if (!mobile) return alert("شماره موبایل را وارد کنید");

    try {
      setLoading(true);

      const { data } = await sendOtp(mobile);

      console.log("OTP :", data);

      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "خطا در ارسال کد");
    } finally {
      setLoading(false);
    }
  };

  const verifyHandler = async () => {
    if (!code) return alert("کد را وارد کنید");

    try {
      setLoading(true);

      const { data } = await checkOtp(mobile, code);

      login(data);

      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "کد اشتباه است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          width: 350,
        }}
      >
        {step === 1 ? (
          <>
            <h3>ورود</h3>

            <input
              style={{ width: "100%", marginTop: 20 }}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="09123456789"
            />

            <button
              onClick={sendCodeHandler}
              disabled={loading}
              style={{ width: "100%", marginTop: 20 }}
            >
              ارسال کد
            </button>
          </>
        ) : (
          <>
            <h3>کد تایید</h3>

            <input
              style={{ width: "100%", marginTop: 20 }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="کد"
            />

            <button
              onClick={verifyHandler}
              disabled={loading}
              style={{ width: "100%", marginTop: 20 }}
            >
              تایید
            </button>
          </>
        )}

        <button
          style={{
            marginTop: 15,
            width: "100%",
          }}
          onClick={onClose}
        >
          بستن
        </button>
      </div>
    </div>
  );
}