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
  <div className='card-form' style={{textAlign:'left'}}>
  <p style={{wordWrap:'break-word' , width:'255px'}}>Access Token {sessionStorage.getItem('access_token')}</p>
  </div>
  )
}

export {Validation , Protected , Main}