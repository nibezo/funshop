import "./Login.scss";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigateToMain = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigateToMain("/main");
    }
  });
  function login() {
    const loginFormData = new FormData();
    loginFormData.append(
      "username",
      document.querySelector(".login__login").value
    );
    loginFormData.append(
      "password",
      document.querySelector(".login__password").value
    );
    const loginUser = () => {
      return axios
        .post(
          `http://funshop-backend-8077bd-25d50d-89-23-116-185.traefik.me/token`,
          loginFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("token_type", res.data.token_type);
          localStorage.setItem(
            "username",
            document.querySelector(".login__login").value
          );
          navigateToMain("/main");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loginUser();
  }
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
          login();
        }}
      >
        Enter
      </button>
    </div>
  );
}
