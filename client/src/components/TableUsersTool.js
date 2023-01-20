import axios from 'axios';

const TableUsersTool = ({selectedUsers}) => {

  const deleteUsers = async (users) => {
    if (users) {
      await axios.delete('http://localhost:5000/', {users}, {withCredentials: true}).then(res => {  
        console.log(res);  
        console.log(res.data);  
    
        // const posts = this.state.posts.filter(item => item.id !== id);  
        // this.setState({ posts });  
      })  
    }
  }

  return (
    <div className="d-flex justify-content-end align-items-center p-2">
      <span
        id="deleteIcon"
        role="button"
        style={{ fontSize: "100%" }}
        onClick={() => deleteUsers(...selectedUsers)}
      ><i className="fa-sharp fa-solid fa-trash"></i>
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