import CreateNewSeassionForm from "@/components/host/CreateNewSeassionForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function CreateSessionPage() {
  return (
    <div className="my-20">
      <CreateNewSeassionForm />
    </div>
  );
}

export default CreateSessionPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "host"])),
    },
    revalidate: 30,
  };
}
