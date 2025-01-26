import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import TawkMessenger from "@/components/tawk-messenger";
import FacebookPixel from "@/components/FacebookPixel";

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
      <FacebookPixel />
      <Footer />
    </>
  );
}
