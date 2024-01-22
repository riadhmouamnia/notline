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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function LoginPage() {
  const { t } = useTranslation();
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
          <CardTitle>{t("common:login")}</CardTitle>
          <CardDescription>{t("login:createAcount")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="sm" variant="outline" onClick={logIn}>
            <FcGoogle className="text-lg mr-4" />
            {t("login:signInWithGoogle")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "login"])),
    },
    revalidate: 30,
  };
}
