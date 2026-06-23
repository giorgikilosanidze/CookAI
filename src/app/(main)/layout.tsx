import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Layout for the main app pages — shared Navbar + Footer chrome.
// Auth pages live under (auth) and intentionally skip this.
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
