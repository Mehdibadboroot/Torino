import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";

import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/green.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        rtl={true}
        theme="light"
      />
    </AuthProvider>
  );
}
