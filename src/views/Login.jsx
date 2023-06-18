import React from "react";
import axios from "axios";

import loginService from "../Service/loginService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()
  const [data, setData] = useState({})

  const [error, setError] = useState("");


const onChangeHandler = (e) =>{
  setData({
    ...data,
    [e.target.name]: e.target.value
  })
  console.log(data)
}

  const onSubmitHandler = (e) => {
    e.preventDefault()

    loginService.LoginAuth(data)

      .then((res) => {

        console.log(res)
        localStorage.setItem("user", JSON.stringify(res.data))
        // navigate('/')
        window.location.href = "/"
      })
      .catch((err) => {
        console.log(err)
        setError("Le nom d'utilisateur ou mot de passe est incorrect.")
      })

  }

  return (
    <div>
      <section className="login-block">
        {/* Container-fluid starts */}
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {/* Authentication card start */}




              <form className="md-float-material form-material" onSubmit={onSubmitHandler}>
                <div className="text-center">
                  <img src="assets/images/logo.png" alt="logo.png" />
                </div>
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row m-b-20">
                      <div className="col-md-12">
                        <h3 className="text-center">Sign In</h3>
                      </div>
                    </div>
                    <div className="form-group form-primary" >
                      <input type="text" name="username" className="form-control" placeholder="username" onChange={onChangeHandler}/>
                      <span className="form-bar" />
                      <label className="float-label">Your username</label>
                    </div>
                    <div className="form-group form-primary">
                      <input type="password" name="password" className="form-control" placeholder="Password" onChange={onChangeHandler} />
                      <span className="form-bar" />
                      <label className="float-label">Password</label>
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div className="row m-t-25 text-left">
                      <div className="col-12">
                        <div className="my-checkbox fade-in-primary d- ">
                          <label>
                            <input type="checkbox" defaultValue />
                            <span className="cr"><i className="cr-icon icofont icofont-ui-check txt-primary " /></span>
                            <span className="text-inverse">Remember me</span>
                          </label>
                        </div>
                        <div className="forgot-phone text-right f-right">
                          <a href="#" className="text-right f-w-600"> Forgot Password?</a>
                        </div>
                      </div>
                    </div>
                    <div className="row m-t-30">
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20">Sign in</button>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-10">
                        <p className="text-inverse text-left m-b-0">Thank you.</p>
                        <p className="text-inverse text-left"><a href="index.html"><b>Back to website</b></a></p>
                      </div>
                      <div className="col-md-2">
                        <img src="assets/images/auth/Logo-small-bottom.png" alt="small-logo.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div></div></div></section>
    </div>
  )
}
export default Login