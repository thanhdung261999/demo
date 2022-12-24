import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { useState } from "react";
import ModalResult from "./ModalResult";
const DetailQuiz = (props) => {
  const [index, setIndex] = useState(0);
  const [dataQuiz, setDataQuiz] = useState([]);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const handleNextQuiz = () => {
    if (index < dataQuiz.length - 1) {
      setIndex(index + 1);
    }
  };
  const handlePrevQuiz = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    fetchQuestion(quizId);
  }, [quizId]);
  const fetchQuestion = async (quizId) => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let image = null;
          let answers = [];
          let questionDescription = "";
          value.forEach((item, index) => {
            if (index === 0) {
              image = item.image;
              questionDescription = item.description;
            }
            item.answers.isChecked = false;
            answers.push(item.answers);
          });

          return { questionId: key, image, answers, questionDescription };
        })
        .value();
      setDataQuiz(data);
    }
  };
  const handleFinish = async () => {
    if (dataQuiz && dataQuiz.length > 0) {
      const payload = {
        quizId: +quizId,
        answers: [],
      };
      const answers = [];
      if (dataQuiz && dataQuiz.length > 0) {
        dataQuiz.forEach((item) => {
          let questionId = +item.questionId;
          let userAnswerId = [];

          item.answers.forEach((a) => {
            if (a.isChecked) {
              userAnswerId.push(a.id);
            }
          });
          answers.push({
            questionId,
            userAnswerId,
          });
        });
        payload.answers = answers;
      }
      const res = await postSubmitQuiz(payload);
      if (res && res.EC === 0) {
        setIsShowModalResult(true);
        console.log(res.DT);
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          dataQuiz: dataQuiz,
        });
      } else {
        alert("error");
      }
    }
  };
  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      question.answer = question.answers.map((answer) => {
        if (+answer.id === answerId) {
          answer.isChecked = !answer.isChecked;
        }
        return answer;
      });
      let index = dataQuizClone.findIndex(
        (quiz) => +quiz.questionId === +questionId
      );
      if (index > -1) {
        dataQuizClone[index] = question;
        setDataQuiz(dataQuizClone);
      }
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <div className="q-content">
          <Question
            handleCheckBox={handleCheckBox}
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-primary" onClick={() => handlePrevQuiz()}>
            Prev
          </button>
          <button className="btn btn-danger" onClick={() => handleNextQuiz()}>
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">Right</div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};
export default DetailQuiz;
