import SelectSessionForm from "@/components/host/SelectSessionForm";
import SigninToSessionForm from "@/components/host/SigninToSessionForm";
import { Button } from "@/components/ui/button";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

function HostPage() {
  return (
    <div className="flex flex-col space-y-8 items-center px-4 my-20">
      <SelectSessionForm />
      <SigninToSessionForm />
      <Link className="w-full" href="/dashboard/host/create">
        <Button className="w-full" variant="outline">
          New session
        </Button>
      </Link>
    </div>
  );
}

export default HostPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "host"])),
    },
    revalidate: 30,
  };
}
