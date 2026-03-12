import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "BundeliServe — Food from the Heart of Madhya Pradesh",
  description:
    "Order fresh, local food from the best restaurants and surrounding Bundelkhand region.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
