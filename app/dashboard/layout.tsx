import Script from "next/script";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="main-wrapper">
      <Header />

      <div className="flex h-[calc(100vh-56px)]">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>

      {/* Scripts ONLY for dashboard */}
      <Script src="/libs/jquery/dist/jquery.min.js" />
      {/* <!-- Bootstrap tether Core JavaScript --> */}
      <Script src="/libs/bootstrap/dist/js/bootstrap.bundle.min.js" />
      {/* <!-- Theme Required Js --> */}
      <Script src="/js/app.min.js" />
      <Script src="/js/app.init.js" />
      <Script src="/js/app-style-switcher.js" />
      {/* <!-- perfect scrollbar JavaScript --> */}
      <Script src="/libs/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js" />
      <Script src="/libs/jquery-sparkline/jquery.sparkline.min.js" />
      {/* <!--Wave Effects --> */}
      <Script src="/js/waves.js" />
      {/* <!--Menu sidebar --> */}
      <Script src="/js/sidebarmenu.js" />
      {/* <!--Custom JavaScript --> */}
      <Script src="/js/feather.min.js" />
      <Script src="/js/custom.min.js" />
      {/* <!-- --------------------------------------------------------------- -->
          <!-- This page JavaScript -->
          <!-- --------------------------------------------------------------- --> */}
      <Script src="/libs/apexcharts/dist/apexcharts.min.js" />
      <Script src="/js/pages/dashboards/dashboard1.js" />
    </div>
  );
}
