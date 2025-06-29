import React from "react";
import { useState } from "react"
import { Link } from "react-router";

function NavBar(){
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const toggleShowOffCanvas = () => {
    setShowOffCanvas(!showOffCanvas)
  }

  return <>
    <nav className="navbar shadow fixed-top bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Games</a>
      <button className="navbar-toggler" type="button" onClick={toggleShowOffCanvas} data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`offcanvas offcanvas-end ${showOffCanvas ? 'show' : ''}`} tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Borgir</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" onClick={toggleShowOffCanvas} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/tic-tac-toe">Tic Tac Toe</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sudoku">Sudoku</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/playground">Playground</Link>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr className="dropdown-divider"/>
                </li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li> */}
          </ul>
          {/* <form className="d-flex mt-3" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
        </div>
      </div>
    </div>
  </nav>
  </>
}

export default NavBar