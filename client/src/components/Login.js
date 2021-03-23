import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Validation} from './Protected'
import config from '../config.json'
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom"
import Auth from './Auth'

export default function Login() {
    
    const history = useHistory()
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    useEffect(() => {
        axios.post( config.VERIFY_URL , { access_token:sessionStorage.getItem('access_token')})
        .then(res =>{  
            Auth.login(() => {history.push("/main")}) //res.data.name contains user data
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    

    const Login = () =>{
        !Validation(email , 'LOGIN' , password)? console.log(config.FIELD_ERR) :
        axios.post( config.LOGIN_URL , {email , password})
        .then(res =>{
            toast.configure();
            toast.info(config.LOGIN_SUCCESS, {autoClose: 2000});
            sessionStorage.setItem('access_token', res.data.access_token);
            Auth.login(() => {history.push("/main")})
        })
        .catch(err => {
            toast.configure();
            toast.error(err.message, {autoClose: 2000});
        })
    }

    return (
        <div className='card-form'>
             <input type='text' placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
            <input type='text' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
            <button onClick={()=>Login()}>Login</button>
        </div>
    )
}
