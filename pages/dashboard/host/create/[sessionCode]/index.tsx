import SessionDetails from "@/components/host/SessionDetails";
import { Button } from "@/components/ui/button";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

function SessionPreviewPage({ sessionCode }: { sessionCode: string }) {
  return (
    <div className="mt-20 flex flex-col gap-4">
      <SessionDetails sessionCode={sessionCode} />
      <div className="flex flex-col md:flex-row justify-center flex-wrap gap-2">
        <Link className="flex-1" href={`/dashboard/host/${sessionCode}`}>
          <Button className="w-full" variant="default">
            Host now
          </Button>
        </Link>
        <Link className="flex-1" href="/dashboard">
          <Button className="w-full" variant="secondary">
            Save for later
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SessionPreviewPage;

export async function getServerSideProps({
  params,
  locale,
}: {
  params: { sessionCode: string };
  locale: string;
}) {
  const { sessionCode } = params;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "host"])),
      sessionCode,
    },
  };
}
