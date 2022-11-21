import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import useLoginAndSignup from "../hooks/useLoginAndSignup";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { handleAuth, error, setError } = useLoginAndSignup(
    "http://localhost:8000/api/auth/signup"
  );

  const handleSignup = async (event: any) => {
    event.preventDefault();
    await handleAuth(email, password);
  };

  return (
    <>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div
        className="container d-flex justify-content-center align-items-center w-100"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {error?.msg && (
            <Alert
              variant={error?.error ? "danger" : "success"}
              dismissible
              onClose={() => setError({ msg: "" })}
            >
              {error?.msg}
            </Alert>
          )}
          <div className="card bg-gradient rounded-4 shadow-sm">
            <div className="card-body">
              <div className="card-title fs-2 text-center fw-semibold">
                Signup
              </div>
              <form onSubmit={handleSignup}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
                <input
                  className="text-white btn bg-gradient btn-purple-20 w-100 shadow-sm"
                  type="submit"
                  value="Signup"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
