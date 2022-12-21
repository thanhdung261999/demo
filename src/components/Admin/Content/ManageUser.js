import ModalCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import { getAllUser, getUserWithPanigate } from "../../../services/apiServices";
import ModalUpdateUser from "./ModelUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPagiate from "./TableUserPaginate";
const ManageUser = () => {
  const LIMIT_USER = 5;
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [listUser, setListUser] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetchListUser();
    fetchListUserWithPaninate(1);
  }, []);
  const fetchListUser = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  const fetchListUserWithPaninate = async (page) => {
    let res = await getUserWithPanigate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };
  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };
  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };
  const resetDataUpdate = () => {
    setDataUpdate({});
  };
  const handleDeleteUser = () => {};

  return (
    <div className="manager-user-container">
      <div className="title">Manage-user</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus style={{ marginRight: "5px" }} />
            Add new Users
          </button>
        </div>
      </div>

      <TableUserPagiate
        pageCount={pageCount}
        listUser={listUser}
        handleClickBtnUpdate={handleClickBtnUpdate}
        handleClickBtnDelete={handleClickBtnDelete}
        fetchListUserWithPaninate={fetchListUserWithPaninate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalCreateUser
        fetchListUser={fetchListUser}
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
        fetchListUserWithPaninate={fetchListUserWithPaninate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalUpdateUser
        resetDataUpdate={resetDataUpdate}
        fetchListUser={fetchListUser}
        show={showModalUpdateUser}
        setShow={setShowModalUpdateUser}
        dataUpdate={dataUpdate}
        fetchListUserWithPaninate={fetchListUserWithPaninate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalDeleteUser
        fetchListUser={fetchListUser}
        show={showModalDeleteUser}
        setShow={setShowModalDeleteUser}
        dataDelete={dataDelete}
        handleDeleteUser={handleDeleteUser}
        fetchListUserWithPaninate={fetchListUserWithPaninate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default ManageUser;
