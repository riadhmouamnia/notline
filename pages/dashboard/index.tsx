import Link from "next/link";

function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen justify-between items-center md:flex-row">
      <Link
        className="flex-1 w-full rounded-sm p-10 text-xl font-bold hover:bg-green-600 hover:text-white flex items-center justify-center"
        href="/dashboard/join"
      >
        Join
      </Link>
      <Link
        className="flex-1 w-full rounded-sm p-10 text-xl font-bold hover:bg-orange-500 hover:text-white flex items-center justify-center"
        href="/dashboard/host"
      >
        Host
      </Link>
    </div>
  );
}

export default DashboardPage;
