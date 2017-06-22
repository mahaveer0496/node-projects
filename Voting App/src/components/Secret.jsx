import React from 'react';
import axios from 'axios';

const Secret = ({history}) => {
  const logoutHandler = () => {
    axios.get('http://localhost:3000/user/logout')
    .then((res) => { 
      console.log(res.data);
      history.push('/')
   });
  };
  return (
    <div className="container">
      <h1 className="text-center">
        this is the secret page
      </h1>
      <button
        onClick={logoutHandler}
        className="btn btn-primary"
      >
        Logout
      </button>
    </div>
  );
};

export default Secret;
