// import Head from "next/head";
import React,{ useContext, useState } from "react";
// import AuthContext from "../context/AuthContext";
// import styles from '../styles/Login.module.css'
import { AuthContext } from 'lib/hooks/AuthContext';
// import {  AuthContext } from 'lib/hooks/use-connect';


export default function Login() {
  const [input, setInput] = useState("");
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(input)
  }
  
  return (
    <div>
     

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="email"
          placeholder="Email address..."
        />
        <button type="submit">Get Started</button>
      </form>

    </div>
  );
}