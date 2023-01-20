import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import TableUsers from '../components/TableUsers';

const Users = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const [access, setAccess] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectUsers, setSelectUsers] = useState([]);

  useEffect(() => {
    verifyUser();
    // eslint-disable-next-line
  }, [cookies, navigate, removeCookie])

  const verifyUser = async () => {
    if (!cookies.jwt) {
      setAccess(false);
      navigate('/login');
    } else {
      axios.get(
        'http://localhost:5000/', 
        {params: {cookie: cookies.jwt}}
      )
      .then(res => {
        setUsers(res.data);
        setAccess(true);
      })
      .catch(e => {
        console.log(e.response.data.message);
        setAccess(false);
        removeCookie('jwt');
        navigate('/login');
      });
    }
  };

  const logOut = () => {
    setAccess(false);
    removeCookie('jwt');
    navigate('/login');
  }

  const deleteUsers = async (users) => {
    if (users.length > 0) {
      await axios.delete('http://localhost:5000/', {params: users}, {withCredentials: true}).then(res => { 
        setUsers(res.data);
        setSelectUsers([]);
        verifyUser();
        document.querySelectorAll('.form-check-input').forEach(item => item.checked = false);
      })
    }
  }

  const blockUsers = async (users, action) => {
    if (users.length > 0) {
      await axios.put('http://localhost:5000/', {users, action}).then(res => { 
        setUsers(res.data);
        setSelectUsers([]);
        verifyUser();
        document.querySelectorAll('.form-check-input').forEach(item => item.checked = false);
      })
    }
  }

  return (
    <>
      {access && users ? (
        <div className="container-md d-flex justify-content-center flex-column" style={{ width: "100%" }}>
          <div className="d-flex justify-content-between align-items-center p-2">
            <p className="h4 m-0">Table of users</p>
            <button
              className="btn btn-secondary m-0"
              onClick={logOut}
            >Log out</button>
          </div>
          <TableUsers 
            users={users} 
            deleteUsers={deleteUsers}
            blockUsers={blockUsers}
            selectUsers={selectUsers}
            setSelectUsers={setSelectUsers}
          />
        </div>
      ) : null
      }
    </>
  )
}

export default Users;