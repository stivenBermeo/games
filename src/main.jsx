import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from 'react-toastify';

import './index.css'
import App from './App.jsx'
import NavBar from './components/NavBar.jsx';
import TicTacToe from './components/TicTacToe.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <div className="vh-100 vw-100">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/"  element={<App/>}/>
          <Route path="/tic-tac-toe"  element={<TicTacToe/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  </>
)
