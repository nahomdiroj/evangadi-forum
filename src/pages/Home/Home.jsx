import { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import axios from "../../Api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import userImg from "../../assets/images/user.jpg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [values, setValues] = useState([]);
  // useEffect(() => {
  //   if (!token) {
  //     toast.warning("Please Login");
  //     navigate("/");
  //     return;
  //   }
  //   axios
  //     .get("/questions/all-questions/", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       setValues(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [token]);

  const handleClick = (questionid) => {
    navigate(`/answerquestions/${questionid}`);
  };

  return (
    <section className="home_section">
      <div className="home_container">
        <button
          className="ask_question_button"
          onClick={() => navigate("/askquestions")}
        >
          Ask Questions
        </button>
        <h2 className="welcome_message">Welcome: {user?.username}</h2>
      </div>

      <div className="question_section">
        <h2>Questions</h2>
        <hr />
        <div className="question_container">
          {values.map((question, index) => (
            <div key={question?.questionid}>
              <div
                className="question_item"
                onClick={() => handleClick(question?.questionid)}
              >
                <div className="icon_username_container">
                  <div className="icon_container">
                    <img src={userImg} alt="" />
                  </div>
                  <span className="question_username">
                    {question?.username}
                  </span>
                </div>
                <span className="question_title">{question?.title}</span>

                <div className="arrow_icon_container">
                  <MdKeyboardArrowRight size={40} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
