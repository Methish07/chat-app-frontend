import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import './app.css'
import SetAvatar from "./pages/SetAvatar";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/register" Component={Register}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/setAvatar" Component={SetAvatar}></Route>
        <Route path="/" Component={Chat}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
