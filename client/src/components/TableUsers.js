import { useState } from 'react';

import TableUsersBody from './TableUsersBody';
import TableUsersTool from './TableUsersTool';

const TableUsers = ({users}) => {
  const [selectUsers, setSelectUsers] = useState([]);

  // select with single checkboxes
  const onSelectOneUser = (event) => {
    if (event.target.checked) {
      setSelectUsers(() => [...selectUsers, event.target.id])
    } else {
      setSelectUsers(() => selectUsers.filter(item => item !== event.target.id))
    }
  }

  // select with main checkbox in head of table
  const onSelectAllUsers = (event) => {
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
    <>
      <TableUsersTool selectedUsers={selectUsers}/>
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
                  onClick={onSelectAllUsers}></input>
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
            <TableUsersBody users={users} onSelectOneUser={onSelectOneUser} />
          </tbody>
        </table>
      </div>
    </>

  )
}

export default TableUsers;