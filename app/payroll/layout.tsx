import Script from "next/script";
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
      <Script src="/libs/datatables.net/js/jquery.dataTables.min.js"></Script>
      <Script src="https://cdn.datatables.net/buttons/1.5.1/js/dataTables.buttons.min.js"></Script>
      <Script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.flash.min.js"></Script>
      <Script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.html5.min.js"></Script>
      <Script src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.print.min.js"></Script>
      <Script id="init-datatables" strategy="afterInteractive">
        {`(function () {
          if (typeof window === 'undefined') return;
          function init() {
            var $ = window.$;
            if (!$ || !$.fn || !$.fn.DataTable) {
              setTimeout(init, 50);
              return;
            }
            var table = $('#file_export');
            if (table.length) {
              table.DataTable({
                dom: 'Bfrtip',
                destroy: true,
                autoWidth: false,
                columns: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
                buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
              });
              $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-cyan text-white me-1');
            }
          }
          init();
        })()`}
      </Script>
    </div>
  );
}
