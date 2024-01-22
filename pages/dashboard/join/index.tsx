import JoinSessionForm from "@/components/Join/JoinSessionForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function JoinPage() {
  return (
    <div className="mt-20">
      <JoinSessionForm />
    </div>
  );
}

export default JoinPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "host"])),
    },
    revalidate: 30,
  };
}
