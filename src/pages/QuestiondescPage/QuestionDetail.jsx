import React, { useEffect, useRef, useState } from "react";
import axios from "../../Api/axiosConfig";
import { useParams, useNavigate, Link } from "react-router-dom";
import userImg from "../../assets/images/user.jpg";
import Loader from "../../Components/Loader/Loader";
import "./QuestionDetail.css";
import { toast } from "react-toastify";

const QuestionDetail = () => {
  const navigate = useNavigate();
  const answert = useRef();
  const { questionid } = useParams();
  const [questionDesc, setQuestionDesc] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  async function questionasked() {
    try {
      const result = await axios.get(`/questions/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // console.log(result.data)
      setQuestionDesc(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function answeredQuestion() {
    try {
      const result = await axios.get(`/answers/answers/${questionid}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      // console.log(result.data)
      setAnswered(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    questionasked();
    answeredQuestion();
  }, []);

  // console.log(questionDesc)

  async function handleSubmit(e) {
    e.preventDefault();

    const answerValue = answert.current.value;
    const token = localStorage.getItem("token");

    console.log(answerValue);

    if (!answerValue) {
      alert("Please provide all required information");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      await axios.post(
        `/answers/answerquestions/${questionid}`,
        {
          answer: answerValue,
        },
        config
      );
      // alert("answer post sucessful");
      toast.success("answer post sucessful");
      window.location.reload();

      //   navigate("/");
    } catch (error) {
      // alert(error?.response?.data?.msg);
      toast.error(error?.response?.data?.msg);
      console.log(error.response);
    }
  }
  //   console.log(answered)
  return (
    <section className="question_answer_page_container">
      <h4>Question</h4>
      <div>
        {/* Display the question */}
        {questionDesc?.map((question, i) => (
          <div key={i} className="question_title">
            <h6>{question.title}?</h6>
            <p>{question.description}</p>
            {/* Display edit and delete buttons for authenticated user */}
          </div>
        ))}
      </div>
      {/* Display the answers */}
      <div>
        <hr />
        <div className="answer_community">
          <h3>Answer From The Community</h3>
        </div>

        <hr />
        {/* Display posted answers */}
        <div>
          {answered?.map((answer, i) => (
            <div key={i} className="answer_item">
              <div className="icon_username_container">
                <div className="icon_container">
                  <img src={userImg} alt="User" />
                </div>
                <span className="question_username">{answer.username}</span>
              </div>
              <div className="answer_text">
                <h6>{answer.answer}</h6>

                {/* Display edit and delete buttons for authenticated user */}
              </div>
            </div>
          ))}
        </div>

        {/* Answer form */}
        <div className="answer_form">
          <h3>Answer The Top Question</h3>
          <Link to={"/home"}>Go to question page</Link>
          <div className="ask_question_box">
            <form onSubmit={handleSubmit}>
              <textarea
                ref={answert}
                type="password"
                placeholder="Your Answer"
                required
              />

              <button type="submit" className="answer_button">
                {isLoading ? (
                  <Loader color="#ff8500" size={10} />
                ) : (
                  "Post Your Answer"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionDetail;
