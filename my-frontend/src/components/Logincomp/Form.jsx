import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin, loginUser } from "../../store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

const Form = ({ mode = "user" }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdminLogin = mode === "admin";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const loginAction = isAdminLogin ? loginAdmin : loginUser;
      const data = await dispatch(loginAction(formData)).unwrap();
      // data.user contains role from backend
      if (data?.user?.role === "admin") {
        navigate("/Dashboard/users");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err?.needsVerification && err?.email) {
        setError(err.message);
        navigate("/verify-email", { state: { email: err.email } });
        return;
      }
      setError(err?.message || "Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
    setFormData(initialState);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Loginimg/Rectangle 1 (1).png')" }}
    >
      <div className="bg-white/30 backdrop-blur-xl shadow-lg rounded-3xl p-8 w-96 border border-white/30">
        <h2 className="text-2xl font-bold text-center text-[#0C8699] mb-1">
          {isAdminLogin ? "Admin Sign In" : "Welcome Back"}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-5">
          {isAdminLogin ? "Admin portal access" : "Sign in to your account"}
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700 text-center">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-full bg-white/50 text-teal-900 placeholder-gray-500 border border-white/60 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-2xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-full bg-white/50 text-teal-900 placeholder-gray-500 border border-white/60 focus:ring-2 focus:ring-teal-400 focus:outline-none backdrop-blur-2xl"
          />

          <div className="text-sm text-[#0C8699] font-semibold hover:underline cursor-pointer text-left">
            Forgot Password?
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2.5 rounded-full transition shadow-md font-semibold mt-1 ${
              loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Signing In…" : "Sign In"}
          </button>
        </form>

        {isAdminLogin ? (
          <p className="text-center text-sm text-[#0C8699] font-semibold mt-5">
            User login?{" "}
            <span
              className="font-bold hover:underline cursor-pointer"
              onClick={() => navigate("/Login")}
            >
              Sign in as user
            </span>
          </p>
        ) : (
          <>
            <p className="text-center text-sm text-[#0C8699] font-semibold mt-5">
              Don't have an account?{" "}
              <span
                className="font-bold hover:underline cursor-pointer"
                onClick={() => navigate("/Signup")}
              >
                Sign up
              </span>
            </p>
            <p className="text-center text-sm text-[#0C8699] font-semibold mt-2">
              Admin?{" "}
              <span
                className="font-bold hover:underline cursor-pointer"
                onClick={() => navigate("/AdminLogin")}
              >
                Open admin login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
