import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, success, errors } = useRequest({
    url: "/api/users/signup",
    body: { email, password },
    method: "POST",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  useEffect(() => {
    if (success) {
      Router.push("/");
    }
  }, [success]);

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign in</h1>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign up</button>
    </form>
  );
};

export default signup;
