// store.js

import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api";


const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
       
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(usersApi.middleware)
           
});

export default store;