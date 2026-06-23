// Shared shell for auth pages (signup / signin): a centered card on a warm
// radial-gradient backdrop, with no app Navbar/Footer.
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-[22px] bg-[radial-gradient(120%_90%_at_50%_0%,#FDF9F2_0%,#FBF6EE_45%,#F6EFE3_100%)] px-6 py-10">
      {children}
      <p className="text-[13px] text-faint">
        Built by <span className="font-semibold text-muted">[Your Name]</span> —
        Portfolio
      </p>
    </div>
  );
}
