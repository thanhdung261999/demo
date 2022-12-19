const TableUser = (props) => {
  const { listUser, handleClickBtnUpdate, handleClickBtnDelete } = props;
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-secondary">View</button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <th colSpan="4">Not found data</th>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;
