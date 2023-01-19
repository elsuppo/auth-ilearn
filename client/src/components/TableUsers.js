import { useState, useEffect } from 'react';

const TableUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/users');
      const usersData = await res.json();
      setUsers(usersData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th scope="col"><input className="form-check-input" type="checkbox" id="main-check"></input></th>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">registration date</th>
            <th scope="col">status</th>
          </tr>
        </thead>
        <tbody>
          <View users={users} />
        </tbody>
      </table>
    </div >
  )
}

const View = (props) => {
  const users = props.users;
  
  const formatDate = (date) => {
    return date.slice(0, 10);
  }

  return users.map((user, i) => {
    return (
      <tr key={i}>
        <td><input className="form-check-input" type="checkbox" value="" id={user._id}></input></td>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{formatDate(user.dateReg)}</td>
        <td>{user.statusUser}</td>
      </tr>
    )
  })

}


export default TableUsers;