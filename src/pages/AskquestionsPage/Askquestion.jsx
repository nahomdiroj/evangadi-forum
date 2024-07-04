
import React, { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "../../Api/axiosConfig";
import Loader from "../../Components/Loader/Loader";
import "./Askquestion.css";

const Askquestion = () => {
  const navigate = useNavigate();
  const titleDom = useRef();
  const descriptionDom = useRef();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    const token = localStorage.getItem("token");

    console.log(titleValue);
    if (!titleValue || !descriptionValue) {
      alert("Please provide all required information");
      return;
    }
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      await axios.post(
        "questions/askquestions",
        {
          title: titleValue,
          description: descriptionValue,
        },
        config
      );
      // alert("question post sucessful");

      navigate("/home");
      setIsLoading(true);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response);
      setIsLoading(false);
    }
  }

  return (
    <section className="question_section_container">
      <div className="question_steps_container">
        <div className="question_steps">
          <h3>Steps to write a good question</h3>
          <div className="question_steps_list">
            <ul>
              <li>Summarize your problem in a one-line title.</li>
              <li>Describe your problem in more detail.</li>
              <li>Describe what you tried and what you expected to happen</li>
              <li>Review your question and post it to the site</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="ask_question_form">
        <h3> Ask a Public question</h3>
        <Link to={"/home"}>Go to question page</Link>
        <div className="ask_question_box">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              ref={titleDom}
              required
              placeholder="Question Title"
            />
            <textarea
              id="description"
              name="description"
              rows="10"
              cols="50"
              ref={descriptionDom}
              required
              placeholder="Describe your problem in more detail"
            ></textarea>
            <button type="submit">
              <button type="submit">
                {isLoading ? (
                  <Loader color="#ff8500" size={10} />
                ) : (
                  "Post Your Question"
                )}
              </button>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Askquestion;