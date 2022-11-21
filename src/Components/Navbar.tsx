import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, dispatch } = useAuth();
  const logoutUser = () => {
    localStorage.removeItem("user");
    dispatch({ type: "logout" });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light position-fixed w-100 top-0">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-white">
            Todos
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user && (
                <div className="mx-3">
                  <div className="fw-semibold text-white my-2">Welcome, {user.email}</div>
                </div>
              )}
              {user && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-item mx-3">
                  <button
                    className="btn btn-outline-danger"
                    onClick={logoutUser}
                  >
                    Logout
                  </button>
                </li>
              )}
              {!user && (
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
              {!user && (
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/signup">
                    Signup
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
