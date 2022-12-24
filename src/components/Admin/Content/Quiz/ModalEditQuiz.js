import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import Select from "react-select";

import _ from "lodash";
import { putEditQuiz } from "../../../../services/apiServices";

const ModalEditQuiz = (props) => {
  const { show, setShow, dataEdit, fetchAllQuiz, options, setDataEdit } = props;
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [preViewImage, setPreViewImage] = useState("");
  useEffect(() => {
    if (!_.isEmpty(dataEdit)) {
      if (dataEdit.description) {
        setDescription(dataEdit.description);
      }
      if (dataEdit.name) {
        setName(dataEdit.name);
      }
      if (dataEdit.difficulty) {
        setType(dataEdit.difficulty);
      }
      if (dataEdit.image) {
        setPreViewImage(`data:image/jpeg;base64,${dataEdit.image}`);
        setImage(dataEdit.image);
      }
    }
  }, [dataEdit]);
  const handleClose = () => {
    setShow(false);
  };
  const handleUploadImageQuiz = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreViewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };
  const handleSubmitEditQuiz = async () => {
    let data = await putEditQuiz(
      dataEdit.id,
      description,
      name,
      type.value,
      image
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchAllQuiz();
      setDataEdit({});
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        className="modal-add-user"
        show={show}
        size="xl"
        backdrop="static"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>
            <div className="my-3">
              <Select
                defaultValue={type}
                onChange={setType}
                options={options}
                placeholder={dataEdit.difficulty}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="file-edit" className="form-label label-upload">
                <FcPlus />
                Upload file image
              </label>
              <input
                onChange={(e) => {
                  handleUploadImageQuiz(e);
                }}
                type="file"
                id="file-edit"
                hidden
              />
            </div>
            <div className="col-md-12 img-preview">
              {preViewImage ? (
                <img src={preViewImage} alt="" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitEditQuiz}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalEditQuiz;
