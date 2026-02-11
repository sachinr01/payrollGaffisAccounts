"use client";

import { useLogout } from "@/lib/logout";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const logout = useLogout();
  return (
    <aside className="left-sidebar">
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            {/* <br />
            <br /> */}
            <li>
              <div className="user-profile d-flex no-block dropdown mt-3">
                <div className="user-pic">
                  <Image
                    src="/users/1.jpg"
                    alt="users"
                    className="rounded-circle"
                    width={40}
                    height={100}
                  />
                </div>
                <div className="user-content hide-menu ms-2">
                  <a
                    href="#"
                    className=""
                    id="Userdd"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <h5 className="mb-0 user-name font-medium d-flex">
                      Steave Jobs
                      <i data-feather="chevron-down" className="feather-sm"></i>
                    </h5>
                    <span className="op-5 user-email">varun@gmail.com</span>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="Userdd"
                  >
                    <a className="dropdown-item" href="#">
                      <i
                        data-feather="user"
                        className="feather-sm text-info me-1"
                      ></i>{" "}
                      My Profile
                    </a>
                    <a className="dropdown-item" href="#">
                      <i
                        data-feather="credit-card"
                        className="feather-sm text-primary me-1"
                      ></i>{" "}
                      My Balance
                    </a>
                    <a className="dropdown-item" href="#">
                      <i
                        data-feather="mail"
                        className="feather-sm text-success me-1"
                      ></i>{" "}
                      Inbox
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <i
                        data-feather="settings"
                        className="feather-sm text-warning me-1"
                      ></i>
                      Account Setting
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={logout}>
                      <i
                        data-feather="log-out"
                        className="feather-sm text-danger me-1"
                      ></i>
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </li>
            {/* <li className="p-3 mt-2">
              <a
                href="#"
                className="btn btn-block create-btn text-white no-block d-flex align-items-center"
              >
                <i data-feather="plus-square" className="feather-sm"></i>
                <span className="hide-menu ms-1">Create New</span>
              </a>
            </li> */}
            {/* <li className="nav-small-cap">
              <i className="mdi mdi-dots-horizontal"></i>
              <span className="hide-menu">Personal</span>
            </li> */}
            {/* sidebar tab - dashboard  */}
            <li className="sidebar-item">
              <a
                className="sidebar-link waves-effect waves-dark"
                href="/dashboard"
                aria-expanded="false"
              >
                <i data-feather="home" className="feather-icon"></i>
                <span className="hide-menu"> Dashboard </span>
              </a>
              {/* <ul className="collapse first-level">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    <i className="mdi mdi-adjust"></i>
                    <span className="hide-menu"> Classic </span>
                  </a>
                </li>
              </ul> */}
            </li>
            {/* sidebar tab - sidebar type */}
            <li className="sidebar-item">
              <a
                className="sidebar-link has-arrow waves-effect waves-dark"
                href="#"
                aria-expanded="false"
              >
                <i data-feather="sidebar" className="feather-icon"></i>
                <span className="hide-menu"> Payroll </span>
              </a>
              <ul className="collapse first-level">
                <li className="visible sidebar-item">
                  <a href="/payroll" className="sidebar-link">
                    {/* <i className="mdi mdi-view-quilt"></i> */}
                    <span className="hide-menu ps-8">Payroll </span>
                  </a>
                  {/* <Link href="/payroll" className="sidebar-link">
                    <span className="hide-menu ps-8">Payroll </span>
                  </Link> */}
                </li>
              </ul>
            </li>
            <li></li>
            {/* sidebar tab - logout  */}
            <li className="sidebar-item">
              <a
                className="sidebar-link waves-effect waves-dark sidebar-link"
                href="#"
                aria-expanded="false"
                onClick={logout}
              >
                <i data-feather="log-out" className="feather-icon"></i>
                <span className="hide-menu">Log Out</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
