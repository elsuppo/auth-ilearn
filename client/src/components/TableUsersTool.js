const TableUsersTool = ({ selectUsers, deleteUsers, blockUsers }) => {

  return (
    <div className="d-flex justify-content-end align-items-center p-2">
      <span id="blockIcon" role="button" style={{ fontSize: "100%" }}>
        <i className="fa-solid fa-lock-open"
          onClick={() => blockUsers(selectUsers, 'unlock')}
        ></i>
      </span>
      <span id="deleteIcon" role="button" className="ms-3" style={{ fontSize: "100%" }}>
        <i className="fa-solid fa-lock"
          onClick={() => blockUsers(selectUsers, 'block')}
        ></i>
      </span>
      <span id="deleteIcon" role="button" className="ms-3" style={{ fontSize: "100%" }}>
        <i className="fa-sharp fa-solid fa-trash"
          onClick={() => deleteUsers(selectUsers)}
        ></i>
      </span>
    </div>
  )
}

export default TableUsersTool;