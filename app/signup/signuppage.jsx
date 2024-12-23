import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseapp } from "./../../lib/firebase";

const auth = getAuth(firebaseapp);

const signupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setpasword] = useState("");

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((value) =>
      alert("success")
    );
  };
  return (
    <div className="signup-page">
      <label>Email </label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        required
        placeholder="Enter Your email here"
      />
      <label>password </label>
      <input
        onChange={(e) => setpasword(e.target.value)}
        value={password}
        type="password"
        required
        placeholder="Enter Your password here"
      />
      <button onClick={createUser}>Signuppage</button>
    </div>
  );
};
export default signupPage;