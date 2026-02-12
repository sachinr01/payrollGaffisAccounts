"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, Edit2, Trash2, Plus, Filter } from "lucide-react";
import { Eye, Pencil, Download } from "lucide-react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";


export default function EmployeeDashboard() {
  const { user, isAdmin, loadingData } = useAuth();

  const router = useRouter();
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const res = await fetch(
          "https://gaffis.net/pulse/public/api/payroll/list"
        );
        const data = await res.json();
        setPayrolls(data);
      } catch (error) {
        console.error("Failed to fetch payrolls", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrolls();
  }, []);


  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [router]);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Payroll?",
      html: `
      <p style="margin-bottom:10px;">
        This action cannot be undone.
      </p>
      <p style="margin-bottom:15px;">
        Type <strong>DELETE</strong> below to confirm.
      </p>
      <input 
        type="text" 
        id="confirmInput" 
        class="swal2-input" 
        placeholder="Type DELETE"
      />
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      preConfirm: () => {
        const input = (
          document.getElementById("confirmInput") as HTMLInputElement
        ).value;

        if (input !== "DELETE") {
          Swal.showValidationMessage("You must type DELETE to confirm");
          return false;
        }
        return true;
      },
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://gaffis.net/pulse/public/api/payroll/delete/${id}`,
        { method: "POST" }
      );

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message || "Delete failed", "error");
        return;
      }

      setPayrolls((prev) =>
        prev.filter((item) => item.payroll_id !== id)
      );
      
      toast.success("Payroll deleted successfully");

    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };



  const handleDownload = async (id: number) => {
    try {
      const res = await fetch(
        `https://gaffis.net/pulse/public/api/payroll/${id}`
      );

      const response = await res.json();

      if (!res.ok || !response.success) {
        toast.error("Failed to fetch payroll details");
        return;
      }

      const payroll = response.data;

      // Convert 2026-01 → January 2026
      const formatMonth = (monthStr: string) => {
        const date = new Date(monthStr + "-01");
        return date.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });
      };

      const formattedMonth = formatMonth(payroll.payment_month);

      // ===== CREATE A4 SIZE CONTAINER =====
      const element = document.createElement("div");

      element.style.width = "794px"; // A4 width in px
      element.style.minHeight = "1123px"; // A4 height in px
      element.style.padding = "60px 50px 80px 50px"; // more bottom space
      element.style.background = "#ffffff";
      element.style.fontFamily = "Arial, sans-serif";
      element.style.color = "#2c3e50";

      element.innerHTML = `
     <div style="text-align:center; margin-bottom:30px;">
      <div style="display:flex; justify-content:center; margin-bottom:15px;">
        <img src="/logo-icon.png" style="width:140px; display:block;" />
      </div>
      <h1 style="margin:0; font-size:28px;">
        Gaffis Technologies PVT LMT
      </h1>
      <h2 style="margin:8px 0 0 0; font-weight:500; font-size:20px;">
        Salary Slip - ${formattedMonth}
      </h2>

     </div>


      <hr style="margin:25px 0;"/>

      <div style="display:flex; justify-content:space-between; font-size:16px; line-height:28px;">
        <div>
          <p><strong>Employee Name:</strong> ${payroll.user?.name ?? "-"}</p>
          <p><strong>Gross Salary:</strong> ₹${payroll.salary ?? 0}</p>
          <p><strong>Payment Date:</strong> ${payroll.payment_date ?? "-"}</p>
          <p><strong>Due Date:</strong> ${payroll.due_date ?? "-"}</p>
        </div>
        <div>
          <p><strong>Status:</strong> ${payroll.salary_status ?? "-"}</p>
          <p><strong>In-hand Salary:</strong> ₹${payroll.inhand_salary ?? 0}</p>
          <p><strong>Payroll ID:</strong> #${payroll.payroll_id ?? "-"}</p>
        </div>
      </div>

      <hr style="margin:30px 0;"/>

      <div style="display:flex; justify-content:space-between;">

        <table style="width:48%; border-collapse:collapse; font-size:16px;">
          <thead>
            <tr style="background:#2962ff; color:white;">
              <th style="padding:10px; text-align:left;">Earnings</th>
              <th style="padding:10px;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:8px;">Basic Pay</td><td>₹${payroll.basic_pay ?? 0}</td></tr>
            <tr><td style="padding:8px;">HRA</td><td>₹${payroll.hr_allowance ?? 0}</td></tr>
            <tr><td style="padding:8px;">Conveyance</td><td>₹${payroll.conveyance ?? 0}</td></tr>
            <tr><td style="padding:8px;">Other Allowance</td><td>₹${payroll.other_allowance ?? 0}</td></tr>
            <tr style="font-weight:bold;">
              <td style="padding:8px;">Total Salary</td>
              <td>₹${payroll.salary ?? 0}</td>
            </tr>
          </tbody>
        </table>

        <table style="width:48%; border-collapse:collapse; font-size:16px;">
          <thead>
            <tr style="background:#dc3545; color:white;">
              <th style="padding:10px; text-align:left;">Deductions</th>
              <th style="padding:10px;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:8px;">TDS</td><td>₹${payroll.tds ?? 0}</td></tr>
            <tr><td style="padding:8px;">PT</td><td>₹${payroll.pt ?? 0}</td></tr>
            <tr><td style="padding:8px;">Other Deduction</td><td>₹${payroll.other_deduction ?? 0}</td></tr>
            <tr style="font-weight:bold;">
              <td style="padding:8px;">Total Deduction</td>
              <td>₹${payroll.total_deduction ?? 0}</td>
            </tr>
          </tbody>
        </table>

      </div>

      <div style="margin-top:50px; font-size:16px;">
        <p><strong>Comment:</strong> ${payroll.comment ?? "-"}</p>
      </div>

      <div style="margin-top:120px; text-align:right; font-size:16px;">
        <p>Authorised Signature</p>
      </div>
    `;

      document.body.appendChild(element);

      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

      document.body.removeChild(element);

      const employeeName =
        payroll.user?.name?.replace(/\s+/g, "_") || "Employee";

      pdf.save(`${employeeName}_${formattedMonth}.pdf`);
    } catch (error) {
      toast.error("Error generating payroll PDF");
    }
  };




  if (loadingData) return null; // or show loader

  return (
    <div className="page-wrapper-new">
      <div className="pt-4 pr-5 pl-5">
        <div className="row">
          <div className="col-5 align-self-center">
            <h4 className="page-title">Payroll</h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Payrolls
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-7 align-self-center">
            <div className="d-flex no-block justify-content-end align-items-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                onClick={() => router.push("/payroll/addUser")}
              >
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow">
        <div className="table-responsive card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <label>Payment Month</label>
              <input
                type="month"
                className="form-control"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label>Payment Date</label>
              <input
                type="date"
                className="form-control"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-secondary w-100"
                onClick={() => {
                  setFilterMonth("");
                  setFilterDate("");
                }}
              >
                Clear Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <table
            id="file_export"
            className="table table-striped table-bordered display text-nowrap"
          >
            <thead>
              <tr>
                <th>Employee</th>
                <th>Salary</th>
                <th>Basic Pay</th>
                <th>Total Deduction</th>
                <th>Inhand Salary</th>
                <th>Payment Month</th>
                <th>Payment Date</th>
                <th>Status</th>
                {isAdmin && (
                  <th>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={9} className="text-center">
                    Loading payrolls...
                  </td>
                </tr>
              )}

              {!loading && payrolls.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center">
                    No payroll data found
                  </td>
                </tr>
              )}

              {!loading &&
                payrolls
                  .filter((payroll) => {
                    const monthMatch = filterMonth
                      ? payroll.payment_month?.startsWith(filterMonth)
                      : true;

                    const dateMatch = filterDate
                      ? payroll.payment_date === filterDate
                      : true;

                    return monthMatch && dateMatch;
                  })
                  .map((payroll) => {



                    return (
                      <tr key={payroll.payroll_id}>
                        {/* User */}
                        <td>{payroll.user?.name ?? "-"}</td>

                        <td>₹{payroll.salary}</td>
                        <td>₹{payroll.basic_pay}</td>
                        <td>₹{payroll.total_deduction}</td>

                        {/* Net Salary */}
                        <td>₹{payroll.inhand_salary}</td>
                        {/* Payment Month */}
                        <td>
                          {payroll.payment_month
                            ? new Date(payroll.payment_month + "-01").toLocaleString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                            : "-"}
                        </td>
                        {/* Payment Date */}
                        <td>{payroll.payment_date ?? "-"}</td>


                        {/* Status */}
                        <td className="capitalize">{payroll.salary_status}</td>

                        {/* Actions */}
                        {isAdmin && (
                          <td>
                            <div className="flex items-center gap-2">

                              <button
                                onClick={() => (window.location.href = `/payroll/view/${payroll.payroll_id}`)}
                                className="flex items-center justify-center w-10 h-10 rounded border bg-blue-500 hover:bg-blue-600 text-white transition"
                              >
                                <Eye size={18} />
                              </button>

                              <button
                                onClick={() => (window.location.href = `/payroll/edit/${payroll.payroll_id}`)}
                                className="flex items-center justify-center w-10 h-10 rounded border bg-blue-500 hover:bg-blue-600 text-white transition"
                              >
                                <Pencil size={18} />
                              </button>


                              <button
                                onClick={() => handleDelete(payroll.payroll_id)}
                                className="flex items-center justify-center w-10 h-10 rounded border bg-blue-500 hover:bg-blue-600 text-white transition">
                                <Trash2 size={18} />
                              </button>

                              <button
                                onClick={() => handleDownload(payroll.payroll_id)}
                                className="flex items-center gap-2 px-4 h-10 rounded border bg-blue-500 hover:bg-blue-600 text-white font-medium transition">
                                <Download size={18} />
                                Payroll Slip
                              </button>

                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
