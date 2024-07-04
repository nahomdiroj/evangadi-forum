import React, { useRef, useState } from "react";
import axios from "../../Api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import classes from "./Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      toast.warning("Please provide all required information");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      // alert("login sucessful");
      setIsLoading(false);

      localStorage.setItem("token", data.token);

     // navigate("/home");
      //window.location.reload();
      setTimeout(() => {
        navigate("/home");
        window.location.reload();
      }, 2000);
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error.response);
      setIsLoading(false);
    }
  }

  return (
    <section className={classes.login_section}>
      <div className={classes.login_container}>
        {isLoading ? (
          <div className={classes.loader_container}>
            <Loader color="#ff8500" />
          </div>
        ) : (
          <>
            <div className={classes.login_text}>
              <h3>Log in to your account</h3>
              <p>
                Don't have an account?{" "}
                <Link onClick={() => setIsLogin(false)}>
                  Create a new account
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.form_group}>
                <input
                  ref={emailDom}
                  type="email"
                  id="email"
                  placeholder="Email"
                  className={classes.full_width}
                />
              </div>
              <div className={classes.form_group}>
                <div className={classes.password_container}>
                  <input
                    ref={passwordDom}
                    type={isVisible ? "text" : "password"}
                    placeholder="Password"
                    className={classes.password_input}
                  />
                  <span
                    onClick={toggleVisibility}
                    className={classes.password_icon}
                  >
                    {isVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              <div className={classes.button_wrapper}>
                <button
                  type="submit"
                  className={`${classes.button} ${classes.full_width}`}
                >
                  Log In
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default Login;
