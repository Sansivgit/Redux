import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const getToken = () => {
    return localStorage.getItem('LoggedUserToken');
};

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'users',
            providesTags: ['User'],
        }),
        getUser: builder.query({
            query: (id) => `users/fetchuser/${id}`,
        }),
        getSingleUser: builder.query({
            query: () => ({
                url: `users/getSingle`,
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `users/deleteuser/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        getSingleData: builder.mutation({
            query: (body) => ({
                url: `update/update`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `update/${id}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['User'],
        }),
        logInUser: builder.mutation({
            query: (data) => ({
                url: 'users/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),

});



export const { useGetSingleUserQuery, useGetUsersQuery, useGetUserQuery, useAddUserMutation, useDeleteUserMutation, useGetSingleDataMutation, useLogInUserMutation, useUpdateUserMutation } = usersApi;