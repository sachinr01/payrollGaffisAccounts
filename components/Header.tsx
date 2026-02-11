"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useLogout } from "@/lib/logout";
import Image from "next/image";

export default function Header() {
  const { user, isAdmin, loadingData } = useAuth();
  const logout = useLogout();
  return (
    <header className="topbar">
      <nav className="navbar top-navbar navbar-expand-md navbar-dark">
        <div className="navbar-header">
          {/* <!-- This is for the sidebar toggle which is visible on mobile only --> */}
          <a
            className="nav-toggler waves-effect waves-light d-block d-md-none"
            href="javascript:void(0)"
          >
            <i className="ri-close-line fs-6 ri-menu-2-line"></i>
          </a>
          {/* <!-- -------------------------------------------------------------- -->
            <!-- Logo -->
            <!-- -------------------------------------------------------------- --> */}
          <a className="navbar-brand" href="#">
            {/* <!-- Logo icon --> */}
            <b className="logo-icon mx-auto">
              {/* <!--You can put here icon as well // <i className="wi wi-sunset"></i> //-->
                <!-- Dark Logo icon --> */}
              <Image
                height={60}
                width={70}
                src="/logo-icon.png"
                alt="homepage"
                className="dark-logo"
              />

            </b>

          </a>

          <a
            className="topbartoggler d-block d-md-none waves-effect waves-light"
            href="javascript:void(0)"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="ri-more-line fs-6"></i>
          </a>
        </div>
        {/*  End Logo  */}
        <div className="navbar-collapse" id="navbarSupportedContent">
          {/*  toggle and nav items */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item d-none d-md-block">
              <a
                className="nav-link sidebartoggler waves-effect waves-light"
                href="javascript:void(0)"
                data-sidebartype="mini-sidebar"
              >
                <i data-feather="menu" className="feather-sm"></i>
              </a>
            </li>

          </ul>
          {/*  Right side toggle and nav items */}
          <ul className="navbar-nav">

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle waves-effect waves-dark"
                href=""
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i data-feather="bell" className="feather-sm"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-end mailbox dropdown-menu-animate-up">
                <span className="with-arrow">
                  <span className="bg-primary"></span>
                </span>
                <ul className="list-style-none">
                  <li>
                    <div className="drop-title bg-primary text-white">
                      <h4 className="mb-0 mt-1">4 New</h4>
                      <span className="fw-light">Notifications</span>
                    </div>
                  </li>
                  <li>
                    <div className="message-center notifications">
                      <a href="#" className="message-item">
                        <span className="btn btn-light-danger text-danger btn-circle">
                          <i
                            data-feather="link"
                            className="feather-sm fill-white"
                          ></i>
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">Luanch Admin</h5>
                          <span className="mail-desc">
                            Just see the my new admin!
                          </span>
                          <span className="time">9:30 AM</span>
                        </div>
                      </a>
                      <a href="#" className="message-item">
                        <span className="btn btn-light-success text-success btn-circle">
                          <i
                            data-feather="calendar"
                            className="feather-sm fill-white"
                          ></i>
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">Event today</h5>
                          <span className="mail-desc">
                            Just a reminder that you have event
                          </span>
                          <span className="time">9:10 AM</span>
                        </div>
                      </a>
                      <a href="#" className="message-item">
                        <span className="btn btn-light-info text-info btn-circle">
                          <i
                            data-feather="settings"
                            className="feather-sm fill-white"
                          ></i>
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">Settings</h5>
                          <span className="mail-desc">
                            You can customize this template as you want
                          </span>
                          <span className="time">9:08 AM</span>
                        </div>
                      </a>
                      <a href="#" className="message-item">
                        <span className="btn btn-light-primary text-primary btn-circle">
                          <i
                            data-feather="users"
                            className="feather-sm fill-white"
                          ></i>
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">Pavan kumar</h5>
                          <span className="mail-desc">
                            Just see the my admin!
                          </span>
                          <span className="time">9:02 AM</span>
                        </div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <a className="nav-link text-center mb-1 text-dark" href="#">
                      <strong>Check all notifications</strong>
                      <i
                        data-feather="chevron-right"
                        className="feather-sm"
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle waves-effect waves-dark"
                href=""
                id="2"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i data-feather="message-square" className="feather-sm"></i>
              </a>
              <div
                className="dropdown-menu dropdown-menu-end mailbox dropdown-menu-animate-up"
                aria-labelledby="2"
              >
                <span className="with-arrow">
                  <span className="bg-danger"></span>
                </span>
                <ul className="list-style-none">
                  <li>
                    <div className="drop-title text-white bg-danger">
                      <h4 className="mb-0 mt-1">5 New</h4>
                      <span className="fw-light">Messages</span>
                    </div>
                  </li>
                  <li>
                    <div className="message-center message-body">
                      <a href="#" className="message-item">
                        <span className="user-img">
                          <Image
                            height={60}
                            width={120}
                            src="/users/1.jpg"
                            alt="user"
                            className="rounded-circle"
                          />
                          <span className="profile-status online pull-right"></span>
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">Pavan kumar</h5>
                          <span className="mail-desc">
                            Just see the my admin!
                          </span>
                          <span className="time">9:30 AM</span>
                        </div>
                      </a>
                      <a href="#" className="message-item">
                        <span className="user-img">
                          <Image
                            height={60}
                            width={120}
                            src="/users/2.jpg"
                            alt="user"
                            className="rounded-circle"
                          />
                          <span className="profile-status busy pull-right"></span>
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">Sonu Nigam</h5>
                          <span className="mail-desc">
                            I have sung a song! See you at
                          </span>
                          <span className="time">9:10 AM</span>
                        </div>
                      </a>
                      <a href="#" className="message-item">
                        <span className="user-img">
                          <Image
                            height={60}
                            width={120}
                            src="/users/3.jpg"
                            alt="user"
                            className="rounded-circle"
                          />
                          <span className="profile-status away pull-right"></span>
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">Arijit Sinh</h5>
                          <span className="mail-desc">I am a singer!</span>
                          <span className="time">9:08 AM</span>
                        </div>
                      </a>
                      <a href="#" className="message-item">
                        <span className="user-img">
                          <Image
                            height={60}
                            width={120}
                            src="/users/4.jpg"
                            alt="user"
                            className="rounded-circle"
                          />
                          <span className="profile-status offline pull-right"></span>
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">Pavan kumar</h5>
                          <span className="mail-desc">
                            Just see the my admin!
                          </span>
                          <span className="time">9:02 AM</span>
                        </div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <a className="nav-link text-center link text-dark" href="#">
                      <b>See all e-Mails</b>
                      <i
                        data-feather="chevron-right"
                        className="feather-sm"
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                href=""
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Image
                  height={60}
                  width={31}
                  src="/users/1.jpg"
                  alt="user"
                  className="rounded-circle"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-end user-dd animated flipInY">
                <span className="with-arrow">
                  <span className="bg-primary"></span>
                </span>
                <div className="d-flex no-block align-items-center p-3 bg-primary text-white mb-2">
                  <div className="">
                    <Image
                      height={60}
                      width={60}
                      src="/users/1.jpg"
                      alt="user"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="ms-2">
                    <h4 className="mb-0">{user?.name}</h4>
                    <p className="mb-0">{user?.email}</p>
                  </div>
                </div>
                <div className="sidebar-sub-parent-div">
                  <a className="dropdown-item" href="#">
                    <i
                      data-feather="user"
                      className="feather-sm text-info me-1 ms-1"
                    ></i>{" "}
                    My Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i
                      data-feather="credit-card"
                      className="feather-sm text-primary me-1 ms-1"
                    ></i>{" "}
                    My Balance
                  </a>
                  <a className="dropdown-item" href="#">
                    <i
                      data-feather="mail"
                      className="feather-sm text-success me-1 ms-1"
                    ></i>{" "}
                    Inbox
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    <i
                      data-feather="settings"
                      className="feather-sm text-warning me-1 ms-1"
                    ></i>
                    Account Setting
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#" onClick={logout}>
                    <i
                      data-feather="log-out"
                      className="feather-sm text-danger me-1 ms-1"
                    ></i>
                    Logout
                  </a>
                </div>
                <div className="dropdown-divider"></div>
                <div className="pl-4 p-2">
                  <a
                    href="#"
                    className="btn d-block w-100 btn-primary rounded-pill"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
