import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Login from './Login';
import Dashboard from './Dashboard';
import Update from './Update';
import store from '../src/redux/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/viewuser/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
