import ModalCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";

const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
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
      <div className="table-users-container">table users</div>
      <ModalCreateUser
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
      />
    </div>
  );
};
export default ManageUser;
