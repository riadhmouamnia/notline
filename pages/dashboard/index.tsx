import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen justify-between items-center md:flex-row">
      <Link
        className="flex-1 w-full rounded-sm p-10 text-xl font-bold hover:bg-green-600 hover:text-white flex items-center justify-center"
        href="/dashboard/join"
      >
        {t("common:join")}
      </Link>
      <Link
        className="flex-1 w-full rounded-sm p-10 text-xl font-bold hover:bg-orange-500 hover:text-white flex items-center justify-center"
        href="/dashboard/host"
      >
        {t("common:host")}
      </Link>
    </div>
  );
}

export default DashboardPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "host"])),
    },
    revalidate: 30,
  };
}
