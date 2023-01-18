import { Link } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';

const Register = () => {
  return (
    <div className="w-100 p-4 d-flex justify-content-center">
      <form>
        <p class="h4 text-center mb-4">Register account</p>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="name">Name</label>
          <input 
            type="text" 
            name="name"
            placeholder="your name"
            className="form-control" 
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email"
            placeholder="email"
            className="form-control" 
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password"
            placeholder="password"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4" style={{ width: "100%" }}>Sign up</button>
        <span>
        Already have an account ? <Link to="/login"> Login </Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Register;