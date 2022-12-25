import { useState } from "react";
import Select from "react-select";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineMinusCircle, AiFillPlusSquare } from "react-icons/ai";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import ImageViewer from "react-simple-image-viewer";
import "./ManageQuestion.scss";
import { useEffect } from "react";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiServices";
import _ from "lodash";
import { toast } from "react-toastify";
const ManageQuestion = (props) => {
  const indexImage = 0;
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",

      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [questions, setQuestion] = useState(initQuestions);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchAllQuiz();
  }, []);
  const fetchAllQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let options = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(options);
    }
  };
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",

        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestion((pre) => {
        return [...pre, newQuestion];
      });
    }
    if (type === "REMOVE") {
      let cloneQuestion = questions;
      if (cloneQuestion && cloneQuestion.length > 0) {
        let newQuestion = cloneQuestion.filter((item) => item.id !== id);
        setQuestion(newQuestion);
      }
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId = "") => {
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswwer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers = [
        ...questionClone[index].answers,
        newAnswwer,
      ];
      setQuestion(questionClone);
    }
    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestion(questionClone);
    }
  };
  const handleOnchange = (type, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "QUESTION") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].description = value;
        setQuestion(questionClone);
      }
    }
  };
  const handleOnchangeFileQuestion = (questionId, e) => {
    let questionClone = _.cloneDeep(questions);
    if (e.target && e.target.files && e.target.files[0]) {
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].imageFile = e.target.files[0];
        questionClone[index].imageName = e.target.files[0].name;
        setQuestion(questionClone);
      }
    }
  };
  const handleOnchangeAnswerQuestion = (type, questionId, answerId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers.map((answer) => {
        if (answer.id === answerId) {
          if (type === "CHECKED") {
            answer.isCorrect = value;
          }
          if (type === "INPUT") {
            answer.description = value;
          }
        }
        return answer;
      });
      setQuestion(questionClone);
    }
  };
  const handlePreviewImageQuestion = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      if (questionClone[index].imageFile) {
        const url = URL.createObjectURL(questionClone[index].imageFile);
        setImages([url]);
        setShowImage(true);
      }
    }
  };
  const handleSubmitQuestionForQuiz = async () => {
    // validate
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose the quiz");
      return;
    }
    let lengthQuestion = questions.length;
    let indexQ = 0;
    let indexA = 0;
    let isValidA = true;
    for (let i = 0; i < lengthQuestion; i++) {
      let lengthAnswer = questions[i].answers.length;
      for (let j = 0; j < lengthAnswer; j++) {
        if (!questions[i].answers[j].description) {
          indexQ = i;
          indexA = j;
          isValidA = false;
          break;
        }
      }
      if (isValidA === false) {
        break;
      }
    }
    if (isValidA === false) {
      toast.error(
        `Not empty description for answer ${indexA + 1} of question ${
          indexQ + 1
        } `
      );
      return;
    }
    for (let i = 0; i < lengthQuestion; i++) {
      if (!questions[i].description) {
        toast.error(`Not empty description for question ${i + 1}`);
        return;
      }
    }
  };
  //
  // for (const question of questions) {
  //   // question
  //   let q = await postCreateNewQuestionForQuiz(
  //     +selectedQuiz.value,
  //     question.description,
  //     question.imageFile
  //   );
  //   // answer
  //   for (const answer of question.answers) {
  //     await postCreateNewAnswerForQuestion(
  //       answer.description,
  //       answer.isCorrect,
  //       q.DT.id
  //     );
  //   }
  // }
  // };
  return (
    <div className="question-container">
      <div className="title">ManageQuestion</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 mb-2">
          <label>Seleted Quiz:</label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2">Add Questions</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div className="a-main mb-4" key={question.id}>
                <div className="questions-content">
                  <div className="form-floating descripton">
                    <input
                      type="text"
                      className="form-control is-valid"
                      value={question.description}
                      onChange={(e) => {
                        handleOnchange("QUESTION", question.id, e.target.value);
                      }}
                    />
                    <label>Question's {index + 1} description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={question.id}>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input
                      onChange={(e) => {
                        handleOnchangeFileQuestion(question.id, e);
                      }}
                      type="file"
                      hidden
                      id={question.id}
                    />
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handlePreviewImageQuestion(question.id);
                      }}
                    >
                      {question.imageName
                        ? question.imageName
                        : "0 files is uploaded"}
                    </span>
                    {showImage ? (
                      <div className="image-lightbox">
                        <ImageViewer
                          src={images}
                          currentIndex={indexImage}
                          disableScroll={false}
                          closeOnClickOutside={true}
                          backgroundStyle={{ background: "rgba(0,0,0,0.95" }}
                          onClose={() => {
                            setShowImage(false);
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="btn-group">
                    <span
                      onClick={() => {
                        handleAddRemoveQuestion("ADD", question.id);
                      }}
                    >
                      <BsFillPatchPlusFill className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() => {
                          handleAddRemoveQuestion("REMOVE", question.id);
                        }}
                      >
                        <BsFillPatchMinusFill className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div className="answer-content" key={answer.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(e) => {
                            handleOnchangeAnswerQuestion(
                              "CHECKED",
                              question.id,
                              answer.id,
                              e.target.checked
                            );
                          }}
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            value={answer.description}
                            className="form-control iscorrect"
                            onChange={(e) => {
                              handleOnchangeAnswerQuestion(
                                "INPUT",
                                question.id,
                                answer.id,
                                e.target.value
                              );
                            }}
                          />
                          <label>Answers {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() => {
                              handleAddRemoveAnswer("ADD", question.id);
                            }}
                          >
                            <AiFillPlusSquare className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() => {
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                );
                              }}
                            >
                              <AiOutlineMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      <div>
        <button
          className="btn btn-warning"
          onClick={() => handleSubmitQuestionForQuiz()}
        >
          Save Questions
        </button>
      </div>
    </div>
  );
};
export default ManageQuestion;
