import { useState } from "react";
import "./UserAuthForm.css";

interface UserAuthFormProps {
  cardHeader: string;
  buttonHeader: string;
  handleLoginAndRegister: (email: string, password: string) => void;
  name: string;
  type: string;
  handleRoute: () => void;
  isLoading?: boolean;
  error?: string | null;
}

function UserAuthForm(props: UserAuthFormProps) {
  const {
    cardHeader,
    buttonHeader,
    handleLoginAndRegister,
    name,
    type,
    handleRoute,
    isLoading = false,
    error = null,
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginAndRegister(email, password);
  };

  return (
    <div className="login_wrapper">
      <div>
        <h2>{cardHeader}</h2>
        <form onSubmit={handleSubmit} className="login_card">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          ></input>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          ></input>
          <button type="submit" className="login_btn" disabled={isLoading}>
            {isLoading ? "Processing" : buttonHeader}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>

      <div className="register_card">
        <img
          src="/images/user_noun.png"
          alt="user_icon"
          width={105}
          height={95}
        ></img>
        <div className="register_text">
          <p>{name} an account?</p>
          <p onClick={handleRoute}>{type} here</p>
        </div>
      </div>
    </div>
  );
}

export default UserAuthForm;
