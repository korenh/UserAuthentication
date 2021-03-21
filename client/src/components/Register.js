import React, { useState } from 'react'
import axios from 'axios'
import {Validation} from './Protected'
import config from '../config.json'
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom"

export default function Register() {
    const history = useHistory()
    const [email , setEmail] = useState('')
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')

    const Register = () =>{
        !Validation(email , name , password)? console.log(config.FIELD_ERR) :
        axios.post( config.REGISTER_URL , {email , name , password})
        .then(res =>{
            toast.configure();
            toast.info(config.REGISTER_SUCCESS, {autoClose: 2000});
            history.push("/")
        })
        .catch(err => {
            toast.configure();
            toast.error(err.message, {autoClose: 2000});
        })
    }

    return (
        <div className='card-form'>
            <input type='text' placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
            <input type='text' placeholder='Name' onChange={e=>setName(e.target.value)}/>
            <input type='text' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
            <button onClick={()=>Register()}>Register</button>
        </div>
    )
}
