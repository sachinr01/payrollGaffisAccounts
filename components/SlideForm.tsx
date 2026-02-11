"use client";

// import { useState } from "react";
import { X } from "lucide-react";

export default function SlideForm({
  open,
  setOpenAction,
}: {
  open: boolean;
  setOpenAction: (v: boolean) => void;
}) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpenAction(false)}
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-1/2 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add User</h2>
          <button onClick={() => setOpenAction(false)}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form className="p-6 space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Name" />
          <input className="w-full border p-2 rounded" placeholder="Email" />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}