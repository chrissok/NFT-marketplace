// These styles apply to every route in the application
import "./globals.css";

import { Web3Modal } from "@/context/Web3Modal";
import { ReactNode } from "react";
import { Michroma, Blinker, Montserrat } from "next/font/google";
import { RaribleSdkProvider } from "@/context/RaribleSdkContext";
import NavBar from "@/templates/Layout/NavBar";
import Footer from "@/templates/Layout/Footer";

export const metadata = {
  title: "Emergence Marketplace",
  description: "Marketplace",
};

const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--main-font",
  display: "swap",
});

const blinker = Blinker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--body-font",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--special-font",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scrollbar-none">
      <body
        className={`${michroma.variable} ${blinker.variable} ${montserrat.variable} bg-black-main`}
      >
        <Web3Modal>
          <RaribleSdkProvider>
            <NavBar />
            {children}
            <Footer />
          </RaribleSdkProvider>
        </Web3Modal>
      </body>
    </html>
  );
}
