import React from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const submitHandler = () => {

  };
  return (
    <form className="container">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-7">
          <div className="form-group">
            <small id="helpId" className="text-muted">Enter your email</small>
            <input type="text" name="email" className="form-control" aria-describedby="helpId" />
          </div>

          <div className="form-group">
            <small id="helpId" className="text-muted">Enter your password</small>
            <input type="text" name="email" className="form-control" aria-describedby="helpId" />
          </div>

          <div className="form-group">
            <input type="submit" className="btn btn-primary" aria-describedby="helpId" value="sign-up" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
