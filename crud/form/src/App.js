import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../src/redux/api.js";

const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

function App() {
  const navigate = useNavigate();
  const [newData] = useAddUserMutation();
  const [deleteData] = useDeleteUserMutation();

  const { data, isLoading, isError } = useGetUsersQuery();

  const users = data && data.data ? data.data : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  });

  const onSubmit = async (data) => {

    try {
      newData(data);
      console.log("Registration successful", data);
      navigate("/login")
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  if (isError) {
    console.log(isError);
  }
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

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
          <div className="form-group col">
            <label className="text-dark">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                }`}
            />
            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
          </div>
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary mr-1">
            Register
          </button>
        </div>
      </form>

      <div className="container mt-5">
        <h3>Users</h3>
        <div>
          {users.length ? (
            <table className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>email</th>
                  <th>Actions/View</th>
                  <th>Actions/Edit</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => deleteData(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-info"
                        onClick={() => navigate(`/viewuser/${user._id}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Contacts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
