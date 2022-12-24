import { useState, useEffect } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalEditQuiz from "./ModalEditQuiz";

const TableQuiz = (props) => {
  const [listQuiz, setLiztQuid] = useState([]);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [showModalEditQuiz, setShowModalEditQuiz] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    fetchAllQuiz();
  }, []);
  const fetchAllQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setLiztQuid(res.DT);
    }
  };
  return (
    <>
      <div className="title-table">Lizt Quid</div>
      <table className="table table-hover table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((quiz, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{quiz.name}</td>
                  <td>{quiz.description}</td>
                  <td>{quiz.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setDataEdit(quiz);
                        setShowModalEditQuiz(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setDataDelete(quiz);
                        setShowModalDeleteQuiz(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listQuiz && listQuiz.length === 0 && (
            <tr>
              <th colSpan="5">Not found data</th>
            </tr>
          )}
        </tbody>

        <ModalDeleteQuiz
          show={showModalDeleteQuiz}
          setShow={setShowModalDeleteQuiz}
          dataDelete={dataDelete}
          fetchAllQuiz={fetchAllQuiz}
        />
        <ModalEditQuiz
          show={showModalEditQuiz}
          setShow={setShowModalEditQuiz}
          dataEdit={dataEdit}
          fetchAllQuiz={fetchAllQuiz}
          options={props.options}
          setDataEdit={setDataEdit}
        />
      </table>
    </>
  );
};
export default TableQuiz;
