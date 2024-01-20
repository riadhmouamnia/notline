import { Inter } from "next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t } = useTranslation();

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <h3 className="my-8">{t("common:hello")}</h3>
      <h1>Noteline App</h1>

      <div className="flex gap-4">
        <Link href="/" locale="en">
          <span className="fi fi-gb rounded mr-2"></span> English
        </Link>
        <Link href="/" locale="fr">
          <span className="fi fi-fr rounded mr-2"></span> Français
        </Link>
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
