


import React, { useContext, useState } from "react";
import Logo from "../../assets/images/0004.png";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
// import { DataContext } from "../DataProvider/DataProvider";
import { AppState } from "../../App";






function Header() {
  // const navigate = useNavigate();
  // const [{ signState }, dispatch] = useContext(DataContext);
  // const { user } = useContext(AppState);
  // const [authenticate, setAuthenticate] = useState(false);


  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setAuthenticate(true);
  // }, []);
  // console.log(user.msg);
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setAuthenticate(false);

  //   navigate("/");
  //   window.location.reload();
  // };

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            <Link to="/">
              <img src={Logo} alt="Evangadi logo" />
            </Link>
          </div>

          <div className={classes.right_side}>
            <Link to={"/home"}>Home</Link>
            <Link to={"#"}>How it Works</Link>
{/* 
            {user.msg == "Authentication invalid-1" ||
            user.msg == "Authentication invalid-2" ? (
              <button className={classes.log_button}>LogIn</button>
            ) : (
              <button className={classes.log_button} onClick={logout}>
                Log Out
              </button>
            )} */}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Header;