import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    setErrors({
      email: '',
      password: '',
    }) 
  }, [values])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:5000/login', {
        ...values,
      }, {
        withCredentials: true
      });
      if (data) {
        if (data.errors) {
          const {email, password} = data.errors;
          setErrors({email, password});
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
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
          <span className="text-danger">{errors.email}</span>
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
          <span className="text-danger">{errors.password}</span>
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