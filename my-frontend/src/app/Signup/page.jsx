// SignupPage.jsx
import React, { useState } from "react";
import Signup from "../../components/Signuppage/Signup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate replaces useRouter
import { registerUser } from "../../store/auth-slice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const SignupPage = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ replaced useRouter

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await dispatch(registerUser(formData));

    if (response?.payload?.success) {
      alert(response.payload.message);
      navigate("/login"); // ✅ lowercase + useNavigate
    } else {
      alert("Error: " + response?.payload?.message);
    }
  };

  return (
    <div>
      <Signup
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default SignupPage;
