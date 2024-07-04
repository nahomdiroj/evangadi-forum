import React, { useRef, useState } from "react";
import axios from "../../Api/axiosConfig";
import { Link} from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classes from './Register.module.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function Register({setIsLogin}) {

  const userNameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const [isVisible, setIsVisible] = useState(false)
  
  const toggleVisibility = () =>{
    setIsVisible(!isVisible)
  }

  async function handleSubmit(e) {
    e.preventDefault();

    
    const usernameValue = userNameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      // alert("Please provide all required information");
      toast.warning("Please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });

   // alert('register sucessful. Please log in')
      toast.success('register sucessful. Please log in')
      // navigate("/")
      setIsLogin(true)
    } catch (error) {
      // alert('something went wrong')
      toast.error('something went wrong')
      console.log(error.response);
    }
  }
 return (
    <section>
      <div className={classes.register_container}>
        <div className={classes.form_text}>
          <h3>Join the network</h3>
          <p>
            Already have an account?
            <Link onClick={() => setIsLogin(true)}>Sign in</Link>
          </p>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.form_group}>
            <input
              ref={emailDom}
              type="email"
              placeholder="Email"
              className={classes.full_width}
            />
          </div>
          <div className={`${classes.form_group} ${classes.name_fields}`}>
            <input
              ref={firstnameDom}
              type="text"
              placeholder="First Name"
              className={classes.half_width}
            />
            <input
              ref={lastnameDom}
              type="text"


    placeholder="Last Name"
              className={classes.half_width}
            />
          </div>
          <div className={classes.form_group}>
            <input
              ref={userNameDom}
              type="text"
              placeholder="Username"
              className={classes.full_width}
            />
          </div>
          <div className={classes.form_group}>
            <div className={classes.password_container}>
              <input
                ref={passwordDom}
                type={isVisible?"text" : "password"}
                placeholder="Password"
                className={classes.password_input}
              />
              <span
                onClick={toggleVisibility}
                className={classes.password_icon}
              >
                {isVisible?<FaEye/> : <FaEyeSlash/> }
              </span>
            </div>
          </div>
          <button type="submit" className={classes.full_width}>
            Agree and Join
          </button>
        </form>
        <div className={classes.termPrivacy_container}>
          <p>
            I agree to the <Link>privacy policy</Link> and{" "}
            <Link>terms of service</Link>
          </p>
        </div>
        <div className={classes.alreadyAccount_container}>
          <Link onClick={() => setIsLogin(true)}>Already have an account?</Link>
        </div>
      </div>
    </section>
  );
}

export default Register;