"use client";

import { cn } from "@/lib/utils/mergeCss";
import FormControl from "./FormControl";
import Input from "./Input";
import Label from "./Label";
import { Button } from "../buttons/Button";
// import { signUpAction } from "@/actions/signUpAction";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseInit";
import { useRouter } from "next/navigation";


function EmailAndPasswordForm({ children, className }) {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
    .then(router.push("/registered-users"))
    .catch(e=> console.log(e))
  };


  return (
    <form onSubmit={handleSubmit} className={(cn("space-y-8"), className)}>
      <FormControl className="flex flex-col">
        <Label htmlFor="email">Enter Email Address</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="jane_doe@gmail.com"
        />
      </FormControl>

      <FormControl className="flex flex-col">
        <Label htmlFor="password">Enter Your Password</Label>
        <Input
          type="text"
          id="password"
          name="password"
          placeholder="ex: N45sd6md@pr"
        />
      </FormControl>
      <FormControl className="mt-12">
        <Button type="submit" className="w-full bg-indigo-950">Please SignUp</Button>
      </FormControl>
    </form>
  );
}

export default EmailAndPasswordForm;
