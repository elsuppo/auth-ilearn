import axios from 'axios';

const TableUsersTool = ({selectedUsers}) => {

  const deleteUsers = async (users) => {
    if (users) {
      await axios.delete('http://localhost:5000/', {params: users}, {withCredentials: true}).then(res => { 
        console.log(res.data);
      })  
    }
  }

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