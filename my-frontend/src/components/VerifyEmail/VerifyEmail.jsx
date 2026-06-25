import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOTP, verifyOTP } from "../../store/auth-slice";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value.slice(0, 6));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      alert("Email not found. Please sign up again.");
      navigate("/Signup");
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await dispatch(verifyOTP({ email, otp }));
      if (data?.payload?.success) {
        alert(data.payload.message);
        navigate("/Login");
      } else {
        const message =
          data?.payload?.message ||
          data?.error?.message ||
          "OTP verification failed. Please try again.";
        alert(`Error: ${message}`);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      alert("Email not found. Please sign up again.");
      navigate("/Signup");
      return;
    }

    setIsResending(true);
    try {
      const data = await dispatch(resendOTP({ email }));
      if (data?.payload?.success) {
        alert(data.payload.message);
      } else {
        const message =
          data?.payload?.message ||
          data?.error?.message ||
          "Failed to resend OTP. Please try again.";
        alert(`Error: ${message}`);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Signup/Rectangle 1 (1).png')" }}
    >
      <div className="bg-white/30 backdrop-blur-xl shadow-lg rounded-3xl p-8 w-96 border border-white/30">
        <h2 className="text-2xl font-bold text-center text-[#0C8699] mb-2">
          Verify Email
        </h2>
        <p className="text-center text-sm text-[#0C8699] mb-4">
          Enter the 6-digit OTP sent to {email || "your email"}
        </p>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={handleChange}
            maxLength={6}
            className="w-full px-4 py-2 mb-3 rounded-full bg-white/10 text-teal-900 placeholder-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-lg text-center tracking-widest text-lg"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-teal-600 text-white py-2 rounded-full transition shadow-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700"
            }`}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className={`w-full mt-3 text-[#0C8699] font-semibold hover:underline ${
            isResending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isResending ? "Sending..." : "Resend OTP"}
        </button>

        <p className="text-center text-sm text-[#0C8699] font-semibold mt-4">
          Already verified?{" "}
          <span
            className="text-[#0C8699] font-bold hover:underline cursor-pointer"
            onClick={() => navigate("/Login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
