"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ViewPayroll() {
    const { id } = useParams();
    const router = useRouter();

    const [payroll, setPayroll] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchPayroll = async () => {
            try {
                const res = await fetch(
                    `https://gaffis.net/pulse/public/api/payroll/${id}`,
                    { cache: "no-store" }
                );

                const json = await res.json();
                console.log("Fetched payroll:", json);

                if (json.success) {
                    setPayroll(json.data); // ✅ FIX IS HERE
                } else {
                    setPayroll(null);
                }
            } catch (e) {
                console.error("Failed to load payroll", e);
                setPayroll(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPayroll();
    }, [id]);

    if (loading) return <p className="p-6">Loading...</p>;
    if (!payroll) return <p className="p-6">Payroll not found</p>;

    return (
        <div className="page-wrapper-new">
            <div className="pt-4 pr-5 pl-5">
                <div className="row">
                    <div className="col-5 align-self-center">
                        <h4 className="page-title">View Payroll</h4>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">Payroll</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        View
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="col-7 align-self-center">
                        <div className="d-flex no-block justify-content-end align-items-center">
                            <button
                                onClick={() => router.push("/payroll")}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white "
                            >
                                Back
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mx-lg-3 mx-auto bg-white shadow-lg border rounded-lg">
                {/* Header */}
                <div className="border-b px-6 py-4 text-center">
                    <p className="text-sm text-gray-500">
                        Payment Date: {payroll.payment_date}
                    </p>
                </div>

                {/* Employee Info */}
                <div className="px-6 py-4 grid grid-cols-2 gap-4 text-sm">
                    <p><b>Employee Name:</b> {payroll.user?.name}</p>
                    <p><b>Status:</b> {payroll.salary_status}</p>

                    <p><b>Gross Salary:</b> ₹{payroll.gross_salary}</p>
                    <p><b>In-hand Salary:</b> ₹{payroll.inhand_salary}</p>

                    <p><b>Due Date:</b> {payroll.due_date}</p>
                    <p><b>Payroll ID:</b> #{payroll.payroll_id}</p>
                    <p><b>Payment Month:</b>  {payroll.payment_month
                            ? new Date(payroll.payment_month + "-01").toLocaleString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                            : "-"}</p>
                </div>

                {/* Earnings & Deductions */}
                <div className="grid grid-cols-2 gap-6 px-6 py-4 border-t">
                    {/* Earnings */}
                    <div>
                        <h4 className="font-semibold mb-2 border-b pb-1">Earnings</h4>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>Basic Pay</span>
                                <span>₹{payroll.basic_pay}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>HRA</span>
                                <span>₹{payroll.hr_allowance}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Conveyance</span>
                                <span>₹{payroll.conveyence_allowance}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Other Allowance</span>
                                <span>₹{payroll.other_allowance}</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t pt-1">
                                <span>Total Salary</span>
                                <span>₹{payroll.salary}</span>
                            </div>
                        </div>
                    </div>

                    {/* Deductions */}
                    <div>
                        <h4 className="font-semibold mb-2 border-b pb-1">Deductions</h4>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>TDS</span>
                                <span>₹{payroll.tds_deduction}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>PT</span>
                                <span>₹{payroll.pt_deduction}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Other Deduction</span>
                                <span>₹{payroll.other_deduction}</span>
                            </div>
                            <div className="flex justify-between font-semibold border-t pt-1">
                                <span>Total Deduction</span>
                                <span>₹{payroll.total_deduction}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t text-sm">
                    <p><b>Comment:</b> {payroll.comment || "-"}</p>
                </div>
            </div>



        </div>
    );
}
