import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";

import {  useState, createContext } from "react";
import axios from "./Api/axiosConfig";
import Askquestion from "./pages/AskquestionsPage/Askquestion";
import QuestionDetail from "./pages/QuestiondescPage/QuestionDetail";
import LayOut from "./Components/Layout/Layout";
import Auth from "./pages/Auth/Auth";

export const AppState = createContext();

function App() {
  const [user, setuser] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // async function checkUser() {
  //   try {
  //     const { data } = await axios.get("users/check", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     });
  //     setuser(data);
  //   } catch (error) {
  //     console.log(error.response);
  //     navigate("/");
  //   }
  // }


  return (
    <AppState.Provider value={{ user, setuser }}>
      <LayOut>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/askquestions" element={<Askquestion />} />
          <Route
            path="/answerquestions/:questionid"
            element={<QuestionDetail />}
          />
        </Routes>
      </LayOut>
    </AppState.Provider>
  );
}

export default App;
