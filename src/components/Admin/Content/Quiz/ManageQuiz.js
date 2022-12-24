import "./ManagaQuiz.scss";
import Select from "react-select";
import { useState } from "react";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import { UploadImage } from "../../../Button/Button";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [preViewImage, setPreViewImage] = useState("");
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreViewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    if (!name || name.length < 4 || !description) {
      toast.error("Name/Description is require");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      setName("");
      setImage(null);
      setDescription("");
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>ManageQuiz</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add new Quiz:
                </legend>
                <div className="form-floating mb-3 form-group">
                  <input
                    value={name}
                    type="text"
                    className="form-control"
                    placeholder="your quiz name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating form-group">
                  <input
                    value={description}
                    type="text"
                    className="form-control"
                    placeholder="description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <label>Description</label>
                </div>
                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                  />
                </div>
                <div className="more-actions">
                  <UploadImage htmlFor="file" />
                  <input
                    type="file"
                    id="file"
                    hidden
                    className="form-control"
                    onChange={(e) => handleChangeFile(e)}
                  />
                  <div className="col-md-12 img-preview">
                    {preViewImage ? (
                      <img src={preViewImage} alt="" />
                    ) : (
                      <span>Preview Image</span>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSubmitQuiz()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="list-detail">
        <TableQuiz options={options} />
      </div>
    </div>
  );
};
export default ManageQuiz;
