import { auth } from "@/lib/firebase-config";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

function LoginPage() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return <button onClick={() => signInWithGoogle()}>Sign In</button>;
}

export default LoginPage;
