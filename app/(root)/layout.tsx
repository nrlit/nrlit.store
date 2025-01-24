import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import TawkMessenger from "@/components/tawk-messenger";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <TawkMessenger />
      <Footer />
    </>
  );
}
