import { Inter } from "next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase-config";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t } = useTranslation();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 text-center">
      <h3 className="font-semibold text-xl my-4">
        {t("common:hello")} {user?.displayName}
      </h3>
      <h1 className="font-bold text-2xl">{t("common:welcome")}</h1>
      <p className="text-sm">{t("common:description")}</p>
    </main>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "host"])),
    },
    revalidate: 30,
  };
}
