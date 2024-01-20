import Link from "next/link";

function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen justify-between items-center">
      <Link href="/dashboard/host">Host</Link>
      <Link href="/dashboard/join">Join</Link>
    </div>
  );
}

export default DashboardPage;
