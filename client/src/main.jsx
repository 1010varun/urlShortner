import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import userReducer from "./features/login.js"
import userUrls from "./features/userUrls.js"

const store = configureStore({
  reducer: {
    user: userReducer,
    userUrls
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
