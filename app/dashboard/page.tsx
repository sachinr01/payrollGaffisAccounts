"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";

export default function Home() {
  const router = useRouter();

  // imp
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="page-wrapper-new">
      {/* Bread crumb and right sidebar toggle  */}
      {/* <div className="pt-4 pr-5 pl-5">
        <div className="row">
          <div className="col-5 align-self-center">
            <h4 className="page-title">Dashboard</h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-7 align-self-center">
            <div className="d-flex no-block justify-content-end align-items-center">
              <div className="me-2">
                <div className="lastmonth"></div>
              </div>
              <div className="">
                <small>LAST MONTH</small>
                <h4 className="text-info mb-0 font-medium">$58,256</h4>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="pr-5 pl-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-md-flex align-items-center">
                  <div>
                    <h4 className="card-title">Sales Summary</h4>
                    <h5 className="card-subtitle">Overview of Latest Month</h5>
                  </div>
                  <div className="ms-auto d-flex no-block align-items-center">
                    <ul className="list-inline fs-2 dl me-3 mb-0">
                      <li className="list-inline-item text-info">
                        <i className="ri-checkbox-blank-circle-fill align-middle fs-3"></i>
                        Iphone
                      </li>
                      <li className="list-inline-item text-primary">
                        <i className="ri-checkbox-blank-circle-fill align-middle fs-3"></i>
                        Ipad
                      </li>
                    </ul>
                    <div className="dl">
                      
                      <select className="form-select" defaultValue="0">
                        <option value="0">Monthly</option>
                        <option value="1">Daily</option>
                        <option value="2">Weekly</option>
                        <option value="3">Yearly</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 d-md-flex d-lg-block justify-content-between">
                    <div>
                      <h1 className="mb-0 mt-4">$6,890.68</h1>
                      <h6 className="fw-light text-muted">
                        Current Month Earnings
                      </h6>
                    </div>
                    <div>
                      <h3 className="mt-4 mb-0">1,540</h3>
                      <h6 className="fw-light text-muted mb-md-0 mt-md-2 mt-lg-0 mt-0">
                        Current Month Sales
                      </h6>
                    </div>
                    <a
                      className="btn btn-info mt-3 p-3 pl-4 pr-4 mb-3"
                      href="javascript:void(0)"
                    >
                      Last Month Summary
                    </a>
                  </div>

                  <div className="col-lg-8">
                    <div className="sales-summery"></div>
                  </div>
                </div>
              </div>

              <div className="card-body border-top">
                <div className="row mb-0">
                  <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <span className="text-orange display-5">
                          <i className="ri-wallet-2-fill"></i>
                        </span>
                      </div>
                      <div>
                        <span>Wallet Balance</span>
                        <h3 className="font-medium mb-0">$3,567.53</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <span className="text-cyan display-5">
                          <i className="ri-money-cny-circle-fill"></i>
                        </span>
                      </div>
                      <div>
                        <span>Referral Earnings</span>
                        <h3 className="font-medium mb-0">$769.08</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <span className="text-info display-5">
                          <i className="ri-shopping-bag-fill"></i>
                        </span>
                      </div>
                      <div>
                        <span>Estimate Sales</span>
                        <h3 className="font-medium mb-0">5489</h3>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <span className="text-primary display-5">
                          <i data-feather="dollar-sign"></i>
                        </span>
                      </div>
                      <div>
                        <span>Earnings</span>
                        <h3 className="font-medium mb-0">$23,568.90</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <footer className="footer text-center">
          All Rights Reserved by Xtreme admin. Designed and Developed by
          <a href="https://www.wrappixel.com">WrapPixel</a>.
        </footer> */}
    </div>
  );
}
