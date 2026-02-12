"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="main-wrapper">
      <Header />

      <Toaster position="top-right" />
      <div className="flex h-[calc(100vh-56px)]">
        <Sidebar />


        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

    
     
    </div>
  );
}
