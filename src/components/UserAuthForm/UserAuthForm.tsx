import "./UserAuthForm.css";

interface UserAuthFormProps {
  cardHeader: string;
  buttonHeader: string;
  handleLoginAndRegister: () => void;
  name: string;
  type: string;
  handleRoute: () => void;
}

function UserAuthForm(props: UserAuthFormProps) {
  const {
    cardHeader,
    buttonHeader,
    handleLoginAndRegister,
    name,
    type,
    handleRoute,
  } = props;

  return (
    <div className="login_wrapper">
      <div className="login_card">
        <h2>{cardHeader}</h2>
        {userStore.errorMsg && (
          <input type="text" placeholder={userStore.errorMsg}></input>
        )}
        <input
          onChange={(e) => (userStore.email = e.target.value)}
          type="text"
          placeholder="Email"
        ></input>
        <input
          onChange={(e) => (userStore.password = e.target.value)}
          type="password"
          placeholder="Password"
        ></input>
        <button
          onClick={() =>
            handleLoginAndRegister(userStore.email, userStore.password)
          }
          className="login_btn"
        >
          {buttonHeader}
        </button>
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
