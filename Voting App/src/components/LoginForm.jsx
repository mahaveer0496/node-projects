import React from 'react';
import axios from 'axios';
import { withRouter, Redirect } from 'react-router-dom';

const LoginForm = ({ history, handleAuth }) => {
  let email = null;
  let password = null;
  const submitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/user/login', {
      email: email.value,
      password: password.value,
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        handleAuth();
        history.replace('/secret');
      } else {
        history.replace('/');
      }
    });
  };
  return (
    <form method="POST" className="container" onSubmit={submitHandler}>
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-7">
          <div className="form-group">
            <small id="helpId" className="text-muted">Enter your email</small>
            <input type="text" className="form-control" ref={input => email = input} />
          </div>

          <div className="form-group">
            <small id="helpId" className="text-muted">Enter your password</small>
            <input type="text" className="form-control" ref={(input) => { password = input; }} />
          </div>

          <div className="form-group">
            <input type="submit" className="btn btn-primary" aria-describedby="helpId" value="Login" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default withRouter(LoginForm);
