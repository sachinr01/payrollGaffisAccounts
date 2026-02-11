"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditPayrollPage() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState<any>({
        user_id: "",
        salary: "",
        basic_pay: "",
        hr_allowance: "",
        conveyence_allowance: "",
        other_allowance: "",
        tds_deduction: "",
        pt_deduction: "",
        other_deduction: "",
        total_deduction: "",
        gross_salary: "",
        inhand_salary: "",
        payment_month: "",
        payment_date: "",
        due_date: "",
        salary_status: "",
        comment: "",
    });

    /* 🔹 Load payroll data */
    useEffect(() => {
        if (!id) return;

        const loadPayroll = async () => {
            try {
                const res = await fetch(
                    `https://gaffis.net/pulse/public/api/payroll/${id}`,
                    { cache: "no-store" }
                );

                const json = await res.json();

                if (!json || !json.data) {
                    toast.error("Payroll not found");
                    router.push("/payroll");
                    return;
                }

                setForm({
                    ...json.data,
                    user_id: String(json.data.user_id),
                    salary: String(json.data.salary),
                });
            } catch (e) {
                console.error(e);
                toast.error("Failed to load payroll");
            } finally {
                setLoading(false);
            }
        };

        loadPayroll();
    }, [id, router]);

    /* 🔹 Auto calculations (same as Add page) */
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        let updated = { ...form, [name]: value };

        const salary = parseFloat(updated.salary) || 0;
        const tds = parseFloat(updated.tds_deduction) || 0;
        const otherDed = parseFloat(updated.other_deduction) || 0;

        // 🔹 PT logic (based on existing value)
        let pt = parseFloat(updated.pt_deduction) || 0;

        // If PT was previously 0 or 200, auto adjust based on salary rule
        if (pt === 0 || pt === 200) {
            // If salary < 25000 → 0
            // If salary >= 25000 → 200
            pt = salary >= 25000 ? 200 : 0;
        }

        updated.pt_deduction = pt.toFixed(2);

        // 🔹 Salary breakdown
        updated.basic_pay = (salary * 0.4).toFixed(2);
        updated.hr_allowance = (salary * 0.2).toFixed(2);
        updated.conveyence_allowance = (salary * 0.25).toFixed(2);
        updated.other_allowance = (salary * 0.15).toFixed(2);

        const totalDed = tds + pt + otherDed;

        updated.total_deduction = totalDed.toFixed(2);
        updated.gross_salary = salary.toFixed(2);
        updated.inhand_salary = (salary - totalDed).toFixed(2);

        setForm(updated);
    };


    /* 🔹 Update payroll */
    const handleSubmit = async () => {
        setSaving(true);

        try {
            const res = await fetch(
                `https://gaffis.net/pulse/public/api/payroll/update/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        salary: Number(form.salary),
                        basic_pay: Number(form.basic_pay),
                        hr_allowance: Number(form.hr_allowance),
                        conveyence_allowance: Number(form.conveyence_allowance),
                        other_allowance: Number(form.other_allowance),
                        tds_deduction: Number(form.tds_deduction),
                        pt_deduction: Number(form.pt_deduction),
                        other_deduction: Number(form.other_deduction),
                        total_deduction: Number(form.total_deduction),
                        gross_salary: Number(form.gross_salary),
                        inhand_salary: Number(form.inhand_salary),
                        payment_month: form.payment_month,
                        payment_date: form.payment_date,
                        due_date: form.due_date,
                        salary_status: form.salary_status,
                        comment: form.comment,
                    }),
                }
            );

            const json = await res.json();

            if (!res.ok) {
                toast.error(json.message || "Update failed");
                return;
            }

            toast.success("Payroll updated successfully ✅");
            router.push("/payroll");

        } catch (e) {
            console.error(e);
            toast.error("Server error");
        } finally {
            setSaving(false);
        }
    };


    if (loading) return <p className="p-4">Loading payroll...</p>;

    return (
        <div className="px-4 page-wrapper-new">

            <div className="pt-4 pr-5 pl-5">
                <div className="row">
                    <div className="col-5 align-self-center">
                        <h4 className="page-title">Edit Payroll</h4>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">Payroll</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Edit
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-white rounded px-4 py-3">

                <div className="row">

                    {[
                        ["salary", "Total Salary"],
                        ["basic_pay", "Basic Pay"],
                        ["hr_allowance", "HR Allowance"],
                        ["conveyence_allowance", "Conveyance"],
                        ["other_allowance", "Other Allowance"],
                        ["tds_deduction", "TDS Deduction"],
                        ["pt_deduction", "PT Deduction"],
                        ["other_deduction", "Other Deduction"],
                        ["total_deduction", "Total Deduction"],
                        ["gross_salary", "Gross Salary"],
                        ["inhand_salary", "In-hand Salary"],
                    ].map(([name, label]) => (
                        <div className="col-md-4" key={name}>
                            <div className="form-group my-3">
                                <label>{label}</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    ))}

                    <div className="col-md-4">
                        <div className="form-group my-3">
                            <label>Payment Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="payment_date"
                                value={form.payment_date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group my-3">
                            <label>Payment Month</label>
                            <input
                                type="month"
                                className="form-control"
                                name="payment_month"
                                value={form.payment_month}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group my-3">
                            <label>Due Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="due_date"
                                value={form.due_date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group my-3">
                            <label>Status</label>
                            <select
                                className="form-control"
                                name="salary_status"
                                value={form.salary_status}
                                onChange={handleChange}
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="cancel">Cancel</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group my-3">
                            <label>Comment</label>
                            <textarea
                                className="form-control"
                                rows={3}
                                name="comment"
                                value={form.comment}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2 border-top pt-3">
                    <button
                        onClick={() => router.back()}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="btn btn-primary"
                    >
                        {saving ? "Updating..." : "Update Payroll"}
                    </button>
                </div>

            </div>
        </div>
    );
}
