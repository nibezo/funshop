import "./Login.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./../Spinner/Spinner";

export default function Login() {
  const navigateToMain = useNavigate();
  const [isError, setIsError] = useState(false);
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigateToMain("/main");
    }
  });

  useEffect(() => {
    setLoaded(false);
  }, []);

  function login() {
    const loginFormData = new FormData();
    const username = document.querySelector(".login__login").value;
    const password = document.querySelector(".login__password").value;
    if (username && password) {
      loginFormData.append("username", username);
      loginFormData.append("password", password);
      setLoaded(true);
      const loginUser = () => {
        return axios
          .post(`https://funapi.ilyadev.tech/token`, loginFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            setLoaded(false);
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("token_type", res.data.token_type);
            localStorage.setItem(
              "username",
              document.querySelector(".login__login").value
            );
            navigateToMain("/main");
          })
          .catch((err) => {
            console.log("err");
            console.log(err);
          });
      };
      loginUser();
    } else {
      setIsError(true);
    }
  }
  return (
    <div className="login">
      {loaded && <Spinner>Login is loading...</Spinner>}
      <h1 style={{ textAlign: "center" }}>Welcome | Fun Shop</h1>
      <input
        type="text"
        className={`login__input login__login ${
          isError ? "login__input--error" : ""
        }`}
        onChange={() => {
          setIsError(false);
        }}
        placeholder="Login"
      />
      <input
        type="password"
        className={`login__input login__password ${
          isError ? "login__input--error" : ""
        }`}
        onChange={() => {
          setIsError(false);
        }}
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
