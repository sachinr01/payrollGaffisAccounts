"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://gaffis.net/pulse/public/api/accounts/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ Login success
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isLoggedIn", "true");

     window.location.href = "/dashboard";

    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="main-wrapper">
      {/* PRELOADER */}
      {loading && (
        <div className="preloader">
          <svg
            className="tea lds-ripple"
            width="37"
            height="48"
            viewBox="0 0 37 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.0819 17H3.02508C1.91076 17 1.01376 17.9059 1.0485 19.0197C1.15761 22.5177 1.49703 29.7374 2.5 34C4.07125 40.6778 7.18553 44.8868 8.44856 46.3845C8.79051 46.79 9.29799 47 9.82843 47H20.0218C20.639 47 21.2193 46.7159 21.5659 46.2052C22.6765 44.5687 25.2312 40.4282 27.5 34C28.9757 29.8188 29.084 22.4043 29.0441 18.9156C29.0319 17.8436 28.1539 17 27.0819 17Z"
              stroke="#2962FF"
              strokeWidth="2"
            />
            <path
              d="M29 23.5C29 23.5 34.5 20.5 35.5 25.4999C36.0986 28.4926 34.2033 31.5383 32 32.8713C29.4555 34.4108 28 34 28 34"
              stroke="#2962FF"
              strokeWidth="2"
            />
            <path
              fill="#2962FF"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 25V17H14V25H12C10.3431 25 9 26.3431 9 28V34C9 35.6569 10.3431 37 12 37H18C19.6569 37 21 35.6569 21 34V28C21 26.3431 19.6569 25 18 25H16ZM11 28C11 27.4477 11.4477 27 12 27H18C18.5523 27 19 27.4477 19 28V34C19 34.5523 18.5523 35 18 35H12C11.4477 35 11 34.5523 11 34V28Z"
            />
            <path
              d="M17 1C17 1 17 4.5 14 6.5C11 8.5 11 12 11 12"
              stroke="#2962FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 6C21 6 21 8.22727 19 9.5C17 10.7727 17 13 17 13"
              stroke="#2962FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* LOGIN SECTION */}
      <div
        className="auth-wrapper d-flex no-block justify-content-center align-items-center"
        style={{
          background:
            "url(https://gaffis.com/images/sectionimages/bg/section_bg3.jpg) no-repeat center center", ///big/auth-bg.jpg
        }}
      >
        <div className="auth-box">
          <div className="logo text-center">
            <Image
              src="/logo-icon.png"
              alt="logo"
              className="mx-auto"
              width={100}
              height={100}
            />
            <h5 className="font-medium mb-3">Sign In to Admin</h5>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="form-horizontal mt-3">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="ri-user-fill"></i>
              </span>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="ri-lock-fill"></i>
              </span>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-check mb-3 d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label ms-2" htmlFor="rememberMe">
                Remember me
              </label>
              <a href="#" className="ms-auto text-dark">
                Forgot pwd?
              </a>
            </div>

            <div className="mb-3 text-center">
              <button
                className="btn d-block w-100 btn-lg btn-info"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>

            <div className="text-center mt-3">
              Don&apos;t have an account?
              <a href="#" className="text-info ms-1">
                <b>Sign Up</b>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
