import { auth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Layout for the main app pages — shared Navbar + Footer chrome.
// Auth pages live under (auth) and intentionally skip this.
export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      <Navbar user={session?.user ?? null} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
