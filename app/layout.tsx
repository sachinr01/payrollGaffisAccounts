import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./dist/css/style.min.css";
import "./dist/css/dataTables.bootstrap5.min.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Script id="sidebar-toggle-ln" strategy="afterInteractive">
          {`
            document.addEventListener("click", function (e) {
              const toggle = e.target.closest(".sidebartoggler");
              if (!toggle) return;

              const pageWrapper = document.querySelector(".page-wrapper-new");
              if (!pageWrapper) return;

              pageWrapper.classList.toggle("collapsed");
            });
          `}
        </Script>
      </body>
    </html>
  );
}
