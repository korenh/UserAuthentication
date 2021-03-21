import React, { useState } from 'react'
import axios from 'axios'
import Validation from './Validation'
import config from '../config.json'
import { toast } from 'react-toastify';

export default function Register() {
    const [email , setEmail] = useState('')
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')

    const Register = () =>{
        !Validation(email , name , password)? console.log(config.FIELD_ERR) :
        axios.post( config.REGISTER_URL , {email , name , password})
        .then(res =>{
            toast.configure();
            toast.info(config.REGISTER_SUCCESS, {autoClose: 2000});
            setEmail('');setName('');setPassword('');
        })
        .catch(err => {
            toast.configure();
            toast.error(err.message, {autoClose: 2000});
        })
    }

    return (
        <div className='card-form'>
            <input value={email} type='text' placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
            <input value={name} type='text' placeholder='Name' onChange={e=>setName(e.target.value)}/>
            <input value={password} type='text' placeholder='Password' onChange={e=>setPassword(e.target.value)}/>
            <button onClick={()=>Register()}>Register</button>
        </div>
    )
}
