"use server";
import { redirect } from "next/navigation";
//import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseInit"; // Ensure correct path

async function signUpAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  // Here you would handle Firebase authentication, for example:
  // await createUserWithEmailAndPassword(auth, email, password);

  // For now, just log the email and password
  // redirect('/registered-users'); // Uncomment if you want to redirect
  return null;
}

export { signUpAction };

// REDIRECT NOT WORKING
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // user credentials that it  created uid..., username, photo, phonenubmer, validated
//     const user = userCredential.user;
//     console.log(user);
//     // on success rediret to the /demo
//     // next/navigation/redirect
//     redirect("/registered-users");
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     console.log(errorCode, errorMessage);
//   });

/* 
        NEXT.js Server Action (PHP NOT!)
        The page doesn't reload.......????
        fn() must be async client - server - client
                            form -  serverAction - redirect on success

        1. Call the firebase createuser(auth, email, password)

        2. Sign In   signInwith(auth, email, password)
           Google, GitHub sign up providers (video...)

        3. Demo Page
           Protected Route only authenticated users get access. (video)
*/