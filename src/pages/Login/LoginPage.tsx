"use client";

import { useNavigate } from "react-router-dom";
import UserAuthForm from "../../components/UserAuthForm/UserAuthForm";
import { useLoginMutation } from "../../store/api/authApi";

function Login() {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginMutation();

  const handleRegisterRoute = () => {
    console.log("register route requested");
    navigate("/register");
  };

  const handleLoginAndRegister = async (email: string, password: string) => {
    try {
      await loginUser({ email, password }).unwrap();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
      <UserAuthForm
        cardHeader={"Login"}
        buttonHeader={"Login"}
        handleLoginAndRegister={handleLoginAndRegister}
        name={"Need"}
        type={"Register"}
        handleRoute={handleRegisterRoute}
        isLoading={isLoading}
        error={error ? "Login failed. Please check your credentials." : null}
      />
    </div>
  );
}

export default Login;
