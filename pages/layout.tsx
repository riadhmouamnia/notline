import Navbar from "@/components/Navbar";

function RootLayout({ children }: any) {
  return (
    <div className="container mx-auto max-w-xl">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default RootLayout;
