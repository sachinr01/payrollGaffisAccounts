"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddPayrollUserPage() {
  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [errors, setErrors] = useState({
    user_id: false,
    salary: false,
    payment_date: false,
  });

  const userRef = useRef<HTMLSelectElement>(null);
  const salaryRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors = {
      user_id: !form.user_id,
      salary: !form.salary,
      payment_date: !form.payment_date,
    };

    setErrors(newErrors);

    // Scroll to first error
    if (newErrors.user_id && userRef.current) {
      userRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      userRef.current.focus();
      return false;
    }

    if (newErrors.salary && salaryRef.current) {
      salaryRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      salaryRef.current.focus();
      return false;
    }

    if (newErrors.payment_date && dateRef.current) {
      dateRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      dateRef.current.focus();
      return false;
    }

    return true;
  };


  const onSaveClick = () => {
    if (!validateForm()) return;
    handleSubmit();
  };




  const [form, setForm] = useState({
    user_id: "",
    salary: "",
    basic_pay: "",
    hr_allowance: "",
    conveyence_allowance: "",
    other_allowance: "",
    tds_deduction: "0",
    pt_deduction: "200",
    other_deduction: "0",
    total_deduction: "",
    gross_salary: "",
    inhand_salary: "",
    comment: "",
    payment_date: "",
    due_date: "",
    salary_status: "pending",
  });

  /* 🔹 Fetch users */
  useEffect(() => {
    fetch("https://gaffis.net/pulse/public/api/teams/active-users")
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : data.data || []))
      .catch((err) => console.error(err));
  }, []);

  /* 🔹 Set due date = 10th */
  useEffect(() => {
    const d = new Date();
    const due = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-10`;
    setForm((prev) => ({ ...prev, due_date: due }));
  }, []);

  /* 🔹 Auto calculations */
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let updated = { ...form, [name]: value };

    if (name === "user_id") {
      const user = users.find((u) => String(u.user_id) === String(value));
      updated.pt_deduction =
        user?.gender?.toLowerCase() === "female" ? "0" : "200";
    }

    const salary = parseFloat(updated.salary) || 0;
    const tds = parseFloat(updated.tds_deduction) || 0;
    const pt = parseFloat(updated.pt_deduction) || 0;
    const otherDed = parseFloat(updated.other_deduction) || 0;

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

  /* 🔹 Submit */
  const handleSubmit = async () => {
    setSuccessMessage("");
    setErrorMessages([]);

    const payload = {
      ...form,
      user_id: Number(form.user_id),
      salary: Number(form.salary) || 0,
      basic_pay: Number(form.basic_pay) || 0,
      hr_allowance: Number(form.hr_allowance) || 0,
      conveyence_allowance: Number(form.conveyence_allowance) || 0,
      other_allowance: Number(form.other_allowance) || 0,
      tds_deduction: Number(form.tds_deduction) || 0,
      pt_deduction: Number(form.pt_deduction) || 0,
      other_deduction: Number(form.other_deduction) || 0,
      total_deduction: Number(form.total_deduction) || 0,
      gross_salary: Number(form.gross_salary) || 0,
      inhand_salary: Number(form.inhand_salary) || 0,
    };

    try {
      const res = await fetch(
        "https://gaffis.net/pulse/public/api/payroll/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );


      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        setErrorMessages(["Server returned non-JSON response"]);
        return;
      }

      if (!res.ok) {
        if (data.errors) {
          const errors = Object.values(data.errors)
            .flat()
            .map((err) => String(err));

          setErrorMessages(errors);

        } else {
          setErrorMessages([data.message || "Server error"]);
        }
        return;
      }


      setSuccessMessage("Payroll added successfully ✅");

      setTimeout(() => {
        toast.success("Payroll saved successfully");
        router.push("/payroll");
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMessages(["Network or server error"]);
    }
  };


  return (
    <div className="mb-2 px-2 page-wrapper-new">

      <div className="pt-4 pr-5 pl-5">
        <div className="row">
          <div className="col-5 align-self-center">
            <h4 className="page-title">Add Payroll</h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Payroll</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Create
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Success Message */}
      {successMessage && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {successMessage}
          <button
            type="button"
            className="close"
            onClick={() => setSuccessMessage("")}
          >
            <span>&times;</span>
          </button>
        </div>
      )}

      {/* Error Messages */}
      {errorMessages.length > 0 && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <ul className="mb-0">
            {errorMessages.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
          <button
            type="button"
            className="close"
            onClick={() => setErrorMessages([])}
          >
            <span>&times;</span>
          </button>
        </div>
      )}

      <div className="col-sm-12">
        <form
          method="POST"
          id="save-payroll-data-form"
          encType="multipart/form-data"
          autoComplete="off"
        >
          <div className="bg-white rounded px-4 py-2">
            <div className="row">
              {/* Employee Name */}
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="user_id">
                    Employee Name <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <div className="form-group mb-0">
                    <select
                      ref={userRef}
                      name="user_id"
                      id="user_id"
                      className={`form-control select-picker ${errors.user_id ? 'border-danger' : ''}`}
                      value={form.user_id}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Employee --</option>

                      {users.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.name} ({user.designation_name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="salary">
                    Total Salary <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    ref={salaryRef}
                    type="number"
                    className={`form-control height-35 f-14 ${errors.salary ? 'border-danger' : ''}`}
                    placeholder=""
                    name="salary"
                    id="salary"
                    value={form.salary}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="basic_pay">
                    Basic Pay <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="number"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="basic_pay"
                    id="basic_pay"
                    autoComplete="off"
                    value={form.basic_pay}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="hr_allowance">
                    HR Allowance <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="number"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="hr_allowance"
                    id="hr_allowance"
                    autoComplete="off"
                    value={form.hr_allowance}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="conveyence_allowance">
                    Conveyance Allowance{" "}
                    <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="number"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="conveyence_allowance"
                    id="conveyence_allowance"
                    autoComplete="off"
                    value={form.conveyence_allowance}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="other_allowance">
                    Other Allowance{" "}
                    <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="number"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="other_allowance"
                    id="other_allowance"
                    autoComplete="off"
                    value={form.other_allowance}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="tds_deduction">
                    TDS Deduction <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="number"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="tds_deduction"
                    id="tds_deduction"
                    autoComplete="off"
                    value={form.tds_deduction}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="pt_deduction">
                    PT Deduction <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="number"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="pt_deduction"
                    id="pt_deduction"
                    autoComplete="off"
                    value={form.pt_deduction}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="other_deduction">
                    Other Deduction{" "}
                    <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="number"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="other_deduction"
                    id="other_deduction"
                    autoComplete="off"
                    value={form.other_deduction}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="total_deduction">
                    Total Deduction{" "}
                    <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="number"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="total_deduction"
                    id="total_deduction"
                    autoComplete="off"
                    value={form.total_deduction}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="gross_salary">
                    Gross Salary <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="number"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="gross_salary"
                    id="gross_salary"
                    autoComplete="off"
                    value={form.gross_salary}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="inhand_salary">
                    In Hand Salary{" "}
                    <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="number"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="inhand_salary"
                    id="inhand_salary"
                    autoComplete="off"
                    value={form.inhand_salary}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="payment_date">
                    Payment Date <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    ref={dateRef}
                    type="date"
                    className={`form-control height-35 f-14 ${errors.payment_date ? 'border-danger' : ''}`}
                    placeholder=""
                    name="payment_date"
                    id="payment_date"
                    autoComplete="off"
                    value={form.payment_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="due_date">
                    Due Date <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <input
                    type="date"
                    className="form-control height-35 f-14"
                    placeholder=""
                    name="due_date"
                    id="due_date"
                    autoComplete="off"
                    value={form.due_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="salary_status">
                    Salary Status <sup className="f-14 mr-1 text-danger">*</sup>
                  </label>

                  <select
                    name="salary_status"
                    value={form.salary_status}
                    onChange={handleChange}
                    className="border p-2 w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="cancel">Cancel</option>
                  </select>
                </div>
              </div>

              {/* Certification Details */}
              <div className="col-md-12">
                <div className="form-group my-3">
                  <label className="mb-3" htmlFor="comment">
                    Comment
                  </label>

                  <textarea
                    className="form-control f-14 pt-2"
                    rows={3}
                    placeholder="Enter comment"
                    name="comment"
                    id="comment"
                    value={form.comment}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="w-100 border-top-grey d-flex justify-content-end px-4 py-3 gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSaveClick}
                className="btn btn-primary rounded f-14 p-2"
                id="save-payroll-form"
              >
                ✔ Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
