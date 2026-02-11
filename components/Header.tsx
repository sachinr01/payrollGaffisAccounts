"use client";

import { useLogout } from "@/lib/logout";
import Image from "next/image";

export default function Header() {
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
              {/* <!-- Light Logo icon --> */}
              {/* <Image
                height={60}
                width={120}
                src="/logo-light-icon.png"
                alt="homepage"
                className="light-logo"
              /> */}
            </b>
            {/* <!--End Logo icon -->
              <!-- Logo text --> */}

            {/* <span className="logo-text"> */}
            {/* <!-- dark Logo text --> */}
            {/* <Image
                height={60}
                width={120}
                src="/logo-text.png"
                alt="homepage"
                className="dark-logo"
              /> */}
            {/* <!-- Light Logo text --> */}
            {/* <Image
                height={60}
                width={120}
                src="/logo-light-text.png"
                className="light-logo"
                alt="homepage"
              /> */}
            {/* </span> */}
          </a>
          {/* <!-- -------------------------------------------------------------- -->
            <!-- End Logo -->
            <!-- -------------------------------------------------------------- -->
            <!-- -------------------------------------------------------------- -->
            <!-- Toggle which is visible on mobile only -->
            <!-- -------------------------------------------------------------- --> */}
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
            {/* <li className="nav-item dropdown mega-dropdown">
              <a
                className="nav-link dropdown-toggle waves-effect waves-dark"
                role="button"
                href="#"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-none d-md-block">
                  Mega{" "}
                  <i data-feather="chevron-down" className="feather-sm"></i>
                </span>
                <span className="d-block d-md-none">
                  <i className="ri-keyboard-line"></i>
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-animate-up">
                <div className="mega-dropdown-menu row">
                  <div className="col-lg-3 col-xl-2 mb-4">
                    <h4 className="mb-3">Carousel</h4>
                    <div
                      id="carouselExampleControls"
                      className="carousel carousel-dark slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <Image
                            height={60}
                            width={120}
                            className="d-block img-fluid"
                            src="/big/img1.jpg"
                            alt="First slide"
                          />
                        </div>
                        <div className="carousel-item">
                          <Image
                            height={60}
                            width={120}
                            className="d-block img-fluid"
                            src="/big/img2.jpg"
                            alt="Second slide"
                          />
                        </div>
                        <div className="carousel-item">
                          <Image
                            height={60}
                            width={120}
                            className="d-block img-fluid"
                            src="/big/img3.jpg"
                            alt="Third slide"
                          />
                        </div>
                      </div>
                      <a
                        className="carousel-control-prev"
                        href="#carouselExampleControls"
                        role="button"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#carouselExampleControls"
                        role="button"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 mb-4">
                    <h4 className="mb-3">Accordian</h4>
                    <div
                      className="accordion accordion-flush"
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            Accordion Item #1
                          </button>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo"
                            aria-expanded="false"
                            aria-controls="flush-collapseTwo"
                          >
                            Accordion Item #2
                          </button>
                        </h2>
                        <div
                          id="flush-collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingTwo"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id="flush-headingThree"
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseThree"
                            aria-expanded="false"
                            aria-controls="flush-collapseThree"
                          >
                            Accordion Item #3
                          </button>
                        </h2>
                        <div
                          id="flush-collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="flush-headingThree"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <div className="accordion-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 mb-4">
                    <h4 className="mb-3">Contact Us</h4>
                    <form>
                      <div className="mb-3 form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputname1"
                          placeholder="Enter Name"
                        />
                        <label>Enter Name</label>
                      </div>
                      <div className="mb-3 form-floating">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                        />
                        <label>Enter Email address</label>
                      </div>
                      <div className="mb-3 form-floating">
                        <textarea
                          className="form-control"
                          id="exampleTextarea"
                          rows={3}
                          placeholder="Message"
                        ></textarea>
                        <label>Enter Message</label>
                      </div>
                      <button
                        type="submit"
                        className="btn px-4 rounded-pill btn-info"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="col-lg-3 col-xlg-4 mb-4">
                    <h4 className="mb-3">List style</h4>
                    <ul className="list-style-none">
                      <li>
                        <a href="#">
                          <i
                            data-feather="check-circle"
                            className="feather-sm text-success me-2"
                          ></i>
                          You can give link
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i
                            data-feather="check-circle"
                            className="feather-sm text-success me-2"
                          ></i>
                          Give link
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i
                            data-feather="check-circle"
                            className="feather-sm text-success me-2"
                          ></i>
                          Another Give link
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i
                            data-feather="check-circle"
                            className="feather-sm text-success me-2"
                          ></i>
                          Forth link
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i
                            data-feather="check-circle"
                            className="feather-sm text-success me-2"
                          ></i>
                          Another fifth link
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-none d-md-block">
                  Create New{" "}
                  <i data-feather="chevron-down" className="feather-sm"></i>
                </span>
                <span className="d-block d-md-none">
                  <i data-feather="plus" className="feather-sm"></i>
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-animate-up"
                aria-labelledby="navbarDropdown"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className="nav-item search-box">
              <a
                className="nav-link waves-effect waves-dark"
                href="javascript:void(0)"
              >
                <i data-feather="search" className="feather-sm"></i>
              </a>
              <form className="app-search position-absolute">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search &amp; enter"
                />
                <a className="srh-btn">
                  <i data-feather="x" className="feather-sm"></i>
                </a>
              </form>
            </li> */}
          </ul>
          {/*  Right side toggle and nav items */}
          <ul className="navbar-nav">
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown2"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="flag-icon flag-icon-us"></i>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right dropdown-menu-animate-up"
                aria-labelledby="navbarDropdown2"
              >
                <a className="dropdown-item" href="#">
                  <i className="me-2 flag-icon flag-icon-us"></i> English
                </a>
                <a className="dropdown-item" href="#">
                  <i className="me-2 flag-icon flag-icon-fr"></i> French
                </a>
                <a className="dropdown-item" href="#">
                  <i className="me-2 flag-icon flag-icon-es"></i> Spanish
                </a>
                <a className="dropdown-item" href="#">
                  <i className="me-2 flag-icon flag-icon-de"></i> German
                </a>
              </div>
            </li> */}
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
                    <h4 className="mb-0">Steave Jobs</h4>
                    <p className="mb-0">varun@gmail.com</p>
                  </div>
                </div>
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
