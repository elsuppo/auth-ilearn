import { useState, useEffect } from 'react';

const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectUsers, setSelectUsers] = useState([]);

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

  // select with single checkboxes
  const onSelectOneUser = (event) => {
    if (event.target.checked) {
      setSelectUsers(() => [...selectUsers, event.target.id])
    } else {
      setSelectUsers(() => selectUsers.filter(item => item !== event.target.id))
    }
  }

  // select with main checkbox in head of table
  const onSelectUsers = (event) => {
    const allCheckbox = document.querySelectorAll('.form-check-input');
    const allUsersId = [...allCheckbox].slice(1).map(item => item.id);
    if (event.target.checked) {
      allCheckbox.forEach(item => item.checked = true);
      setSelectUsers(() => [...allUsersId])
    } else {
      allCheckbox.forEach(item => item.checked = false);
      setSelectUsers([]);
    }
  }

    return (
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>
                <input
                  className="form-check-input"
                  role="button"
                  type="checkbox"
                  id="main-check"
                  onClick={onSelectUsers}></input>
              </th>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">registration date</th>
              <th scope="col">last login date</th>
              <th scope="col">status</th>
            </tr>
          </thead>
          <tbody>
            <View users={users} onSelectOneUser={onSelectOneUser} />
          </tbody>
        </table>
      </div >
    )
  }

  const View = (props) => {
    const { users, onSelectOneUser } = props;

    const formatDate = (date) => {
      return date.slice(0, 10);
    }

    return users.map((user, i) => {
      return (
        <tr key={i}>
          <td>
            <input
              className="form-check-input"
              role="button"
              type="checkbox"
              id={user._id}
              onClick={onSelectOneUser}></input>
          </td>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{formatDate(user.dateReg)}</td>
          <td>{formatDate(user.dateLastLogin)}</td>
          <td>{user.statusUser}</td>
        </tr>
      )
    })
  }

  export default TableUsers;