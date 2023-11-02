import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';





// functions to build form returned by useForm() hook
const Login = () => {
    // const navigate = useNavigate();
    const [user, setUser] = useState({})
    // form validation rules 
    const validationSchema = Yup.object().shape({



        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),

    });
    const { register, handleSubmit, reset, resetField, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onBlur",
    });


    async function onSubmit(data) {
        try {
            const res = await axios.post("http://localhost:8000/login/upload", data)
            setUser(res.data.loginexist);
            localStorage.setItem('LoginID', res.data.loginexist._id)
        } catch (error) {

        }

    }



    return (
        <div>
            <div className='container back'>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-6'><div className="card m-3">
                        <h5 className="card-header text-white" style={{ backgroundColor: '#063970' }}>Login Form </h5>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                                <div className="form-row">

                                    <div className="form-group col">
                                        <label>Email</label>
                                        <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.email?.message}</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-Logingroup col">
                                        <label>Password</label>
                                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.password?.message}</div>
                                    </div>

                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-1">Login</button>

                                </div>
                            </form>
                        </div>
                    </div></div>
                    <div className='col-3'></div>
                </div>

            </div>
            {/* <ToastContainer /> */}

            <div>

                {
                    user ? (<div>
                        <h2>User Detail</h2>
                        <h4>FirstName: {user.firstName}</h4>
                        <h4>LastName:{user.lastName}</h4>
                        <h4>Email:{user.email}</h4>
                    </div>) : (<h3>No Data</h3>)

                }
            </div>
        </div>
    )
}

export default Login
