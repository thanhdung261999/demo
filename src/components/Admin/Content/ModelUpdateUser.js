import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";

const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate, resetDataUpdate } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("USER");
  const [preViewImage, setPreViewImage] = useState("");
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      if (dataUpdate.username) {
        setUsername(dataUpdate.username);
      }
      setRole(dataUpdate.role);
      if (dataUpdate.image) {
        setPreViewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
      setImage("");
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);

    setEmail("");
    setPassword("");
    setUsername("");
    setImage("");
    setRole("USER");
    setPreViewImage("");
    resetDataUpdate();
  };
  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreViewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      // setPreViewImage("");
    }
  };
  const handleSubmitUpdateUser = async () => {
    let data = await putUpdateUser(dataUpdate.id, username, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchListUserWithPaninate(props.currentPage);
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
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                value={email}
                disabled
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                disabled
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">UserName</label>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="file" className="form-label label-upload">
                <FcPlus />
                Upload file image
              </label>
              <input
                onChange={(e) => {
                  handleUploadImage(e);
                }}
                type="file"
                id="file"
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
          <Button variant="primary" onClick={handleSubmitUpdateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
