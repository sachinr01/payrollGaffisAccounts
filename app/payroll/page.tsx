"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, Edit2, Trash2, Plus, Filter } from "lucide-react";
import { Eye, Pencil, Download } from "lucide-react";
import toast from "react-hot-toast";

export default function EmployeeDashboard() {
  const router = useRouter();
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (!confirm("Are you sure you want to delete this payroll?")) return;

    try {
      const res = await fetch(
        `https://gaffis.net/pulse/public/api/payroll/delete/${id}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Delete failed");
        return;
      }

      toast.success("Payroll deleted successfully");

      // ✅ remove row instantly
      setPayrolls((prev) =>
        prev.filter((item) => item.payroll_id !== id)
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
  };


  const [open, setOpen] = useState(false);

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
      <div className="card">
        <div className="table-responsive card-body">

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
                <th>Payment Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
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
                payrolls.map((payroll) => {


                  return (
                    <tr key={payroll.payroll_id}>
                      {/* User */}
                      <td>{payroll.user?.name ?? "-"}</td>

                      <td>₹{payroll.salary}</td>
                      <td>₹{payroll.basic_pay}</td>
                      <td>₹{payroll.total_deduction}</td>

                      {/* Net Salary */}
                      <td>₹{payroll.inhand_salary}</td>
                      {/* Payment Date */}
                      <td>{payroll.payment_date ?? "-"}</td>

                      {/* Month */}
                      <td>{payroll.due_date ?? "-"}</td>


                      {/* Status */}
                      <td className="capitalize">{payroll.salary_status}</td>

                      {/* Actions */}
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/payroll/view/${payroll.payroll_id}`)}
                            className="flex items-center justify-center w-10 h-10 rounded border bg-blue-500 hover:bg-blue-600 text-white transition"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() => router.push(`/payroll/edit/${payroll.payroll_id}`)}
                            className="flex items-center justify-center w-10 h-10 rounded border bg-blue-500 hover:bg-blue-600 text-white transition"
                          >
                            <Pencil size={18} />
                          </button>


                          <button
                            onClick={() => handleDelete(payroll.payroll_id)}
                            className="flex items-center justify-center w-10 h-10 rounded border bg-blue-500 hover:bg-blue-600 text-white transition">
                            <Trash2 size={18} />
                          </button>

                          <button className="flex items-center gap-2 px-4 h-10 rounded border bg-blue-500 hover:bg-blue-600 text-white font-medium transition">
                            <Download size={18} />
                            Payroll Slip
                          </button>
                        </div>
                      </td>
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
