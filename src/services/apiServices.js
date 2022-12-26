import axios from "../utils/axiosCustomize";
export const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};
export const getUserWithPanigate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
export const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};
export const deleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
export const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
export const postLogin = (email, password, delay) => {
  return axios.post("api/v1/login", {
    email,
    password,
    delay: 5000,
  });
};
export const postRegister = (email, password, username) => {
  return axios.post("api/v1/register", {
    email,
    password,
    username,
  });
};
export const getQuizUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};
export const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

export const postSubmitQuiz = (data) => {
  return axios.post("api/v1/quiz-submit", data);
};
export const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post("api/v1/quiz", data);
};
export const getAllQuizForAdmin = () => {
  return axios.get("api/v1/quiz/all");
};
export const deleteQuiz = (QuizId) => {
  return axios.delete(`api/v1/quiz/${QuizId}`);
};

export const putEditQuiz = (id, description, name, type, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", type);
  data.append("quizImage", image);
  return axios.put("api/v1/quiz", data);
};
export const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", image);
  return axios.post("api/v1/question", data);
};
export const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};
export const postAssignQuiz = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};
export const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
