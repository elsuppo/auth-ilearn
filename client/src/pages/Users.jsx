import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const cols = [
  { field: 'id', headerName: 'id', width: 50 },
  { field: 'name', headerName: 'name', width: 100 },
  { field: 'email', headerName: 'email', width: 100 },
  { field: 'dateReg', headerName: 'dateReg', width: 150 },
  { field: 'dateLastLog', headerName: 'dateLastLog', width: 150 },
  { field: 'status', headerName: 'status', width: 50 },
];

const rows = [
  { id: 1, name: 'blank', email: 'blank', dateReg: 'blank data', dateLastLog: 'blank data', status: 'block' }
]

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
          <div className="d-flex justify-content-between align-items-center p-3">
            <p className="m-0">Table of users</p>
            <button
              className="btn btn-secondary m-0"
              onClick={logOut}
            >Log out</button>
          </div>

          <DataGrid
            checkboxSelection
            autoHeight
            rows={rows}
            columns={cols}
          />
        </div>
      )}
    </>


  )
}

export default Users;