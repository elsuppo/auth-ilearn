import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const cols = [
  {field: 'id', headerName: 'id', width: 50},
  {field: 'name', headerName: 'name', width: 100},
  {field: 'email', headerName: 'email', width: 100},
  {field: 'dateReg', headerName: 'dateReg', width: 150},
  {field: 'dateLastLog', headerName: 'dateLastLog', width: 150},
  {field: 'status', headerName: 'status', width: 50},
];

const rows = [
  {id: 1, name: 'blank', email: 'blank', dateReg: 'blank data', dateLastLog: 'blank data', status: 'block'}
]


const Users = () => {
  const navigate = useNavigate();

  const logOut = () => {
    navigate('/login');
  }

  return (
    <div className="container-md d-flex justify-content-center flex-column" style={{width: "100%"}}>
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
  )
}

export default Users;