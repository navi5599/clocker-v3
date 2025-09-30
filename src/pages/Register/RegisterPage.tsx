import { useNavigate } from "react-router-dom";
import UserAuthForm from "../../components/UserAuthForm/UserAuthForm";
import { useRegisterMutation } from "../../store/api/authApi";

export default function RegsiterPage() {
  const navigate = useNavigate();

  const [registerUser, { isLoading, error }] = useRegisterMutation();

  const handleLogin = () => {
    console.log("login route requested");
    navigate("/login");
  };

  const handleLoginAndRegister = async (email: string, password: string) => {
    console.log("register requested", email, password);
    try {
      await registerUser({ email, password })
        .unwrap()
        .then(() => {
          navigate("/login");
        });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div>
      <UserAuthForm
        cardHeader={"Register"}
        buttonHeader={"Register"}
        handleLoginAndRegister={handleLoginAndRegister}
        name={"Have"}
        type={"Login"}
        handleRoute={handleLogin}
        isLoading={isLoading}
        error={error ? "Registration failed. Please try again." : null}
      />
    </div>
  );
}
