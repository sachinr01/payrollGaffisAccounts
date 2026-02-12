"use client";

import { useEffect } from "react";

export default function ThemeScripts() {
  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false; // preserve order
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    async function loadAllScripts() {
      try {
        // 1️⃣ jQuery FIRST
        await loadScript("/libs/jquery/dist/jquery.min.js");

        // 2️⃣ Bootstrap
        await loadScript("/libs/bootstrap/dist/js/bootstrap.bundle.min.js");

        // 3️⃣ Plugins
        await loadScript(
          "/libs/perfect-scrollbar/dist/js/perfect-scrollbar.jquery.js"
        );
        await loadScript(
          "/libs/jquery-sparkline/jquery.sparkline.min.js"
        );

        // 4️⃣ Theme Core
        await loadScript("/js/app.min.js");
        await loadScript("/js/app.init.js");
        await loadScript("/js/app-style-switcher.js");
        await loadScript("/js/waves.js");
        await loadScript("/js/sidebarmenu.js");
        await loadScript("/js/feather.min.js");
        await loadScript("/js/custom.min.js");

        // 5️⃣ DataTables
        await loadScript(
          "/libs/datatables.net/js/jquery.dataTables.min.js"
        );
        await loadScript(
          "https://cdn.datatables.net/buttons/1.5.1/js/dataTables.buttons.min.js"
        );
        await loadScript(
          "https://cdn.datatables.net/buttons/1.5.1/js/buttons.html5.min.js"
        );
        await loadScript(
          "https://cdn.datatables.net/buttons/1.5.1/js/buttons.print.min.js"
        );

        // 6️⃣ Sidebar Toggle Script
        document.addEventListener("click", function (e: any) {
          const toggle = e.target.closest(".sidebartoggler");
          if (!toggle) return;

          const pageWrapper = document.querySelector(".page-wrapper-new");
          if (!pageWrapper) return;

          pageWrapper.classList.toggle("collapsed");
        });

        // 7️⃣ Initialize DataTables
        const initDataTables = () => {
          const $ = (window as any).$;
          if (!$ || !$.fn || !$.fn.DataTable) {
            setTimeout(initDataTables, 100);
            return;
          }

          const table = $("#file_export");
          if (table.length) {
            table.DataTable({
              dom: "Bfrtip",
              destroy: true,
              autoWidth: false,
              buttons: ["copy", "csv", "excel", "pdf", "print"],
            });

            $(
              ".buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel"
            ).addClass("btn btn-cyan text-white me-1");
          }
        };

        initDataTables();
      } catch (error) {
        console.error("Error loading theme scripts:", error);
      }
    }

    loadAllScripts();
  }, []);

  return null;
}
