// pages/signIn.js
"use client";
import React, { useState } from "react"; 
import { auth, db } from "@/lib/firebase/firebaseInit";
import Input from "@/components/forms/Input";
import Label from "@/components/forms/Label";
import FormControl from "@/components/forms/FormControl";
import { Button } from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function SigninPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Form submitted'); // Log to check if function is triggered

    const email = event.target.email.value;
    const password = event.target.password.value;

    setLoading(true);
    setError("");

    try {
      console.log('Attempting to sign in'); // Log before sign-in attempt

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);

      // Query Firestore for user role by email
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.role === "admin" || userData.role === "manager") {
          console.log(`User is ${userData.role}`); // Log if user is admin
          router.push("/registered-users");
        } else {
          console.log('User is not admin'); // Log if user is not admin
          setError("Access denied. Only admins can log in.");
          setLoading(false);
          await auth.signOut();
        }
      } else {
        console.log('No such document'); // Log if no document exists
        setError("No user data found. Please contact support.");
        setLoading(false);
        await auth.signOut();
      }
    } catch (e) {
      console.error('Error during sign-in:', e);
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl className="flex flex-col">
        <Label htmlFor="email">Enter Email Address</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="jane_doe@gmail.com"
          required
        />
      </FormControl>

      <FormControl className="flex flex-col">
        <Label htmlFor="password">Enter Your Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="ex: N45sd6md@pr"
          required
        />
      </FormControl>
      {error && <p className="text-red-500">{error}</p>}
      <FormControl className="mt-12">
        <Button type="submit" className="w-full bg-red-800 text-white text-xl" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </FormControl>
    </form>
  );
}