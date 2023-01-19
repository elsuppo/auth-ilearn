import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import TableUsers from '../components/TableUsers';

const Users = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        setAccess(false);
        navigate('/login');
      } else {
        const { data } = await axios.post('http://localhost:5000', {}, { withCredentials: true });
        if (!data.status) {
          setAccess(false);
          removeCookie('jwt');
          navigate('/login');
        }
      }
      setAccess(true);
    };
    verifyUser();
  }, [cookies, navigate, removeCookie])

  const logOut = () => {
    setAccess(false);
    removeCookie('jwt');
    navigate('/login');
  }

  return (
    <>
      {!access ? null : (
        <div className="container-md d-flex justify-content-center flex-column" style={{ width: "100%" }}>
          <div className="d-flex justify-content-between align-items-center p-2">
            <p className="h4 m-0">Table of users</p>
            <button
              className="btn btn-secondary m-0"
              onClick={logOut}
            >Log out</button>
          </div>

          <div className="d-flex justify-content-end align-items-center p-2">
            <span 
              id="deleteIcon"
              role="button"
              style={{ fontSize: "100%"}}
            ><i className="fa-sharp fa-solid fa-trash"></i>
            </span>
            <span 
              id="blockIcon" 
              role="button"
              style={{ fontSize: "100%"}}
              className="ms-3"
            ><i className="fa-solid fa-ban"></i>
            </span>
          </div>
          <TableUsers />
        </div>
      )
      }
    </>
  )
}

export default Users;