import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiServices";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete, fetchAllQuiz } = props;
  const handleClose = () => setShow(false);

  const handleDeleteQuiz = async () => {
    let data = await deleteQuiz(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchAllQuiz();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete this Quiz. name:
          {dataDelete && dataDelete.name ? dataDelete.name : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancle
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDeleteQuiz();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDeleteQuiz;
