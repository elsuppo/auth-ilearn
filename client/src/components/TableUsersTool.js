const TableUsersTool = ({selectedUsers, deleteUsers}) => {

  return (
    <div className="d-flex justify-content-end align-items-center p-2">
      <span id="deleteIcon" role="button" style={{ fontSize: "100%" }}>
        <i 
        className="fa-sharp fa-solid fa-trash"
        onClick={() => deleteUsers(selectedUsers)}></i>
      </span>
      <span
        id="blockIcon"
        role="button"
        style={{ fontSize: "100%" }}
        className="ms-3"
      ><i className="fa-solid fa-ban"></i>
      </span>
    </div>
  )
}

export default TableUsersTool;