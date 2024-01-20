import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase-config";
import { useRouter } from "next/router";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LoginPage() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const router = useRouter();

  const logIn = async () => {
    const userCred = await signInWithGoogle();
    if (userCred) {
      await Cookies.set("loggedin", "true");
      router.push("/");
    }
  };

  return (
    <div className="mt-24">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Start by creating an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="sm" variant="outline" onClick={logIn}>
            <FcGoogle className="text-lg mr-4" />
            Sign In with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
