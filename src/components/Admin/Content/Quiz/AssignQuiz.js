import { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  getAllQuizForAdmin,
  getAllUser,
  postAssignQuiz,
} from "../../../../services/apiServices";
const AssignQuiz = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetchAllQuiz();
    fetchAllUser();
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
  const fetchAllUser = async () => {
    const res = await getAllUser();
    if (res && res.EC === 0) {
      let options = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(options);
    }
  };
  const handleAssign = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setSelectedQuiz({});
      setListUser({});
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Seleted Quiz:</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group">
        <label className="mb-2">Seleted User:</label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button className="btn btn-warning mt-3" onClick={() => handleAssign()}>
          Assign
        </button>
      </div>
    </div>
  );
};
export default AssignQuiz;
