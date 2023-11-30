import React, { useState } from "react";

const Login = () => {
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { username, password } = e.target;

    await fetch("http://localhost:4001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        if (data.msg == "Login succes!!") {
          window.location = "/";
        } else {
          setError(true);
        }
      });
  };

  return (
    <>
      <div className="login">
        <div className="box">
          <main className="part1">
            <img src="/lazzaro.jpg" alt="logo" />
          </main>
          <main className="part2">
            <h1>Login</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label
                htmlFor="username"
                style={error ? { color: "red" } : { color: "black" }}
              >
                Username
              </label>
              <input type="text" name="username" id="username" />
              <label
                htmlFor="password"
                style={error ? { color: "red" } : { color: "black" }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                minLength={6}
                required
              />

              <button type="submit" style={{ cursor: "pointer" }}>
                Войти
              </button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default Login;
