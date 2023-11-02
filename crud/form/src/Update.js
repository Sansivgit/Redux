import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useGetSingleDataMutation, useUpdateUserMutation } from "./redux/api";
// import { useNavigate } from "react-router-dom";

function Update() {
    const { id } = useParams()
    const [getSingleData] = useGetSingleDataMutation()
    const [updateData] = useUpdateUserMutation()
    const schema = yup.object({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup.string().required("Email is required").email("Email is invalid"),
        password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required")
    });

    // const [users, setUsers] = useState([]);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get("http://localhost:8000/users").then((res) => {
    //         setUsers(res.data.data);
    //     });
    // }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const personId = localStorage.getItem("LoginID");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await getSingleData({ id })
                const show = getData.data
                console.log(show);
                reset({
                    firstName: show.firstName,
                    lastName: show.lastName,
                    email: show.email,
                    password: show.password,
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);


    const onSubmit = async (data) => {
        try {
            const getData = await updateData({
                id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            })
            console.log(getData);
            // const res = await axios.post(
            //     `http://localhost:8000/update/edit/${personId}`,
            //     data
            // );
        } catch (err) {
            console.log(err.message);
        }
    }
    const handleDelete = async () => {
        try {
            const res = await axios.post(
                `http://localhost:8000/update/delete/${personId}`
            );
        } catch (err) {
            console.log(err.message);
        }
    }
    // const deleteUser = (id) => {
    //     // console.log(id);
    //     axios.delete(`http://localhost:8000/users/deleteuser/${id}`)
    //         .then(response => {
    //             console.log('Resource deleted successfully:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error deleting resource:', error);
    //         });
    // }

    return (
        <div className="container mt-3">
            <h2>Register Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} id="registration-form">
                <div className="form-row">
                    <div className="form-group col-5">
                        <label className="text-dark">First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            {...register("firstName")}
                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label className="text-dark">Last Name</label>
                        <input
                            name="lastName"
                            type="text"
                            {...register("lastName")}
                            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-dark">Email</label>
                        <input
                            name="email"
                            type="text"
                            {...register("email")}
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-dark">Password</label>
                        <input
                            name="password"
                            type="password"
                            {...register("password")}
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>

                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary mr-1">
                        Register
                    </button>
                    <div className="btn btn-danger" onClick={handleDelete}>Delete</div>
                </div>
            </form>

        </div>
    );
}

export default Update;