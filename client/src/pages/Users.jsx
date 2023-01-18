import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid'; 

const cols = [
  {field: 'name', headerName: 'name', width: 200},
  {field: 'email', headerName: 'email', width: 200},
  {field: 'phone', headerName: 'phone', width: 200},
];

const Users = () => {

  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUsers(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const rowData = users?.map(user => {
    return {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      id: user?.id
    }
  })

  return (
    <div style={{width: "100%"}}>
      <DataGrid
        checkboxSelection
        autoHeight
        rows={rowData}
        columns={cols}
      />
    </div>
  )
}

export default Users;