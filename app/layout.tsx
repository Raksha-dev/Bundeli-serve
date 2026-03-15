import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthListener from "@/components/AuthListener";

export const metadata: Metadata = {
  title: "BundeliServe — Food Delivery at Your Doorstep",
  description:
    "Order fresh, local food from the best restaurants near you. Fast delivery, cash on delivery.",
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
          <AuthListener />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
