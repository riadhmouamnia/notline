import { Inter } from "next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import LoginPage from "@/components/Login";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase-config";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t } = useTranslation();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <h3 className="my-8">
        {t("common:hello")} {user?.displayName}
      </h3>
      <h1>Noteline App</h1>

      <div className="flex gap-4">
        <Link href="/" locale="en">
          <span className="fi fi-gb rounded mr-2"></span> English
        </Link>
        <Link href="/" locale="fr">
          <span className="fi fi-fr rounded mr-2"></span> Français
        </Link>
      </div>
      <div>
        {!user ? <LoginPage /> : <button onClick={signOut}>Logout</button>}
      </div>
    </main>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 30,
  };
}
