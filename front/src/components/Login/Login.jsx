import "./Login.scss";

export default function Login({ setLogin }) {
  return (
    <div className="login">
      <h1 style={{ textAlign: "center" }}>Welcome | Fun Shop</h1>
      <input type="text" className="login__login" placeholder="Login" />
      <input
        type="password"
        className="login__password"
        placeholder="Password"
      />
      <button
        className="login__enter"
        onClick={() => {
          setLogin(true);
          console.log(document.querySelector(".login__login").value);
          console.log(document.querySelector(".login__password").value);
        }}
      >
        Enter
      </button>
    </div>
  );
}
