"use client";
import { useState, useEffect } from "react";
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="fixed inset-0  h-10 w-full z-[100] ">
      <div className='h-5 bg-transparent w-full  backdrop-blur-2xl'></div>
      <div className='m-0 sm:px-6 lg:px-8 ' >
        <nav className="max-w-7xl mx-auto p-4 flex items-center justify-between bg-[#9E9E9E]/10 backdrop-blur-2xl filter brightness-90 rounded-xl ">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-[#F7C400]">
              World of Data 2025
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/"
              className={`px-4 py-2 rounded transition ${pathname === "/" && activeSection === "home"
                  ? "bg-[#F7C500]  font-semibold"
                  : "hover:underline"
                }`}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className={`px-4 py-2 rounded transition ${activeSection === "about"
                  ? "bg-[#F7C500]  font-semibold"
                  : "hover:underline"
                }`}
            >
              About
            </Link>
            <Link
              href="/#Activity"
              className={`px-4 py-2 rounded transition ${activeSection === "Activity"
                  ? "bg-[#F7C500]  font-semibold"
                  : "hover:underline"
                }`}
            >
              Activity
            </Link>

            <Link
              href="/Register"
              target="_blank"
              className={`px-4 py-2 rounded transition ${activeSection === "Register" || pathname === "/Register"
                  ? "bg-[#F7C500]  font-semibold"
                  : "hover:underline"
                }`}
            >
              Register
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 rounded-md focus:outline-none focus:ring"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden px-2 pb-4 bg-[#9E9E9E]/10 backdrop-blur-2xl filter brightness-90 rounded-xl 
                  flex flex-col items-center justify-center text-center space-y-3 py-6">
            <Link href="/" className="block px-3 py-2 rounded-md ">
              Home
            </Link>
            <Link
              href="/Register"
              className={`block mt-2 px-3 py-2 rounded-md transition ${pathname === "/Register"
                  ? "bg-[#F7C500]  font-semibold"
                  : "bg-[#9E9E9E]/15 hover:underline"
                }`}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
