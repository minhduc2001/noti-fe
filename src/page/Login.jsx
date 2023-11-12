import React, { useState } from "react";
import axios from "axios";
import { getMessagingToken } from "../firebase";
function Login() {
  const host = "http://127.0.0.1:3333";
  const [value, setValue] = useState({});
  const [token, setToken] = useState("");

  const hanldeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = value;
    data.token = localStorage.getItem("token");
    axios
      .post(host + "/user/login", data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    let data = value;
    data.token = localStorage.getItem("token");
    axios
      .post(host + "/user/register", data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleNotify = () => {
    axios
      .post(host + "/user/login", {})
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleGroup = () => {
    axios
      .post(host + "/user/send-group-noti", {})
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleBoard = () => {
    axios
      .post(host + "/user/login", {})
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const generateToken = async () => {
    setToken(await getMessagingToken());
  };

  return (
    <div>
      <input type="text" name="username" onChange={hanldeInput} />
      <input type="text" name="password" onChange={hanldeInput} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleSubmit1}>Submit RG</button>

      <button onClick={handleNotify}>Get Notify</button>
      <button onClick={handleGroup}>Send Group Notify</button>
      <button onClick={handleBoard}>Send BoardCard Notify</button>
      <button onClick={generateToken}>Generate Token</button>

      <p>{token}</p>
    </div>
  );
}

export default Login;
