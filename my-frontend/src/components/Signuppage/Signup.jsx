import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/auth-slice";

const initialState = {
  userName: "",
  email: "",
  phone: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const data = await dispatch(registerUser(formData));
      if (data?.payload?.success) {
        // EMAIL VERIFICATION DISABLED - Redirect directly to login page
        // navigate("/verify-email", { state: { email: formData.email } });
        navigate("/Login");
      } else {
        const message =
          data?.payload?.message ||
          data?.error?.message ||
          "Registration failed. Please try again.";
        setError(message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Signup/Rectangle 1 (1).png')" }}
    >
      <div className="bg-white/30 backdrop-blur-xl shadow-lg rounded-3xl p-8 w-96 border border-white/30">
        <h2 className="text-2xl font-bold text-center text-[#0C8699] mb-1">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-600 mb-5">
          Join Himalayan Khadu today
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700 text-center">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            required
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-full bg-white/50 text-teal-900 placeholder-gray-500 border border-white/60 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-full bg-white/50 text-teal-900 placeholder-gray-500 border border-white/60 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-lg"
          />
          <div className="flex rounded-full overflow-hidden bg-white/50 border border-white/60 focus-within:ring-2 focus-within:ring-teal-400">
            <span className="flex items-center px-3 text-gray-500 text-sm font-medium border-r border-white/60 bg-white/30">
              +91
            </span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              pattern="[0-9]{10}"
              className="flex-1 px-3 py-2.5 bg-transparent text-teal-900 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-full bg-white/50 text-teal-900 placeholder-gray-500 border border-white/60 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-lg"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white py-2.5 rounded-full transition shadow-md font-semibold mt-2 ${
              isSubmitting
                ? "bg-teal-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isSubmitting ? "Signing Up…" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-[#0C8699] font-semibold mt-5">
          Already have an account?{" "}
          <span
            className="font-bold hover:underline cursor-pointer"
            onClick={() => navigate("/Login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
