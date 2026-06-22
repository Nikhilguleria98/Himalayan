import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/auth-slice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await dispatch(registerUser(formData));
      if (data?.payload?.success) {
        alert(data.payload.message);
        navigate("/Login");
      } else {
        const message =
          data?.payload?.message ||
          data?.error?.message ||
          "Registration failed. Please try again.";
        alert(`Error: ${message}`);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
    setFormData(initialState);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Signup/Rectangle 1 (1).png')" }}
    >
      <div className="bg-white/30 backdrop-blur-xl shadow-lg rounded-3xl p-8 w-96 border border-white/30">
        <h2 className="text-2xl font-bold text-center text-[#0C8699] mb-4">
          Sign up
        </h2>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            required
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 rounded-full bg-white/10 text-teal-900 placeholder-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 rounded-full bg-white/10 text-teal-900 placeholder-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 rounded-full bg-white/10 text-teal-900 placeholder-gray-600 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-lg"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-teal-600 text-white py-2 rounded-full transition shadow-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        <p className="text-center text-sm text-[#0C8699] font-semibold mt-4">
          Already have an account?{" "}
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

export default Signup;
