import React from "react";
import { Route } from "react-router-dom";
import Auth from "./Auth";

const Protected = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth.isauthenticated()) {
          return <Component {...props} />;
        }
      }}
    />
  );
};


const Validation = (email , name , password) =>{
  return true
}


const Main = () =>{
  return(
  <div className='card-form' style={{textAlign:'center'}}>
    <p>Welcome {sessionStorage.getItem('name')}</p>
  </div>
  )
}

export {Validation , Protected , Main}