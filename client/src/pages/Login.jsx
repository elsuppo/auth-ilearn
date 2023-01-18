import {useState} from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      
    } catch (error) {
      
    }
  }

  return (
    <div className="w-100 p-4 d-flex justify-content-center">
      <form onSubmit={(event) => handleSubmit(event)}>
        <p className="h4 text-center mb-4">Login</p>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email"
            placeholder="email"
            className="form-control"
            onChange={(event) => setValues({...values, [event.target.name]: event.target.value})} 
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="password"
            className="form-control"
            onChange={(event) => setValues({...values, [event.target.name]: event.target.value})} 
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4" style={{ width: "100%" }}>Sign in</button>
        <span>
          Don't have an account ? <Link to="/register"> Register </Link>
        </span>
      </form>
    </div>
  )
}

export default Login;