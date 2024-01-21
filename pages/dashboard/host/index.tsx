import SelectSessionForm from "@/components/host/SelectSessionForm";
import SigninToSessionForm from "@/components/host/SigninToSessionForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function HostPage() {
  return (
    <div className="flex flex-col space-y-8 items-center px-4 my-20">
      <SelectSessionForm />
      <SigninToSessionForm />
      <Button variant="outline" className="w-full">
        <Link href="/dashboard/host/create">New session</Link>
      </Button>
    </div>
  );
}

export default HostPage;
