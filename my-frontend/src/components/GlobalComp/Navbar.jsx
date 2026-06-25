import React, { useState } from "react";
import { Menu, X, Search, ChevronDown, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "../../store/auth-slice";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Destinations", href: "/destinations" },
  { name: "Trips/Tours", href: "" },
  { name: "Blog", href: "/Blog" },
  { name: "Contact", href: "/Contact" },
  { name: "More", href: "" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="flex responsivewidth justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/assets/logo1.png"
            alt="Logo"
            className="size-[100px]"
            width={12}
            height={12}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 text-gray-700">
          {navLinks.map((item, index) => {
            if (item.name === "Trips/Tours") {
              return (
                <div key={index} className="relative">
                  <div
                    onMouseEnter={() => setIsPackageOpen(true)}
                    onMouseLeave={() => setIsPackageOpen(false)}
                    className="relative"
                  >
                    <button className="hover:text-primary transition-all flex items-center gap-1">
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {isPackageOpen && (
                      <div className="absolute top-full bg-white shadow-md rounded-md p-2 w-48 z-50">
                        <Link to="/spiritualTours" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                          Spiritual Tours
                        </Link>
                        <Link to="/StudentTours" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                          Student Tours
                        </Link>
                        <Link to="/biketour" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                          Bike Tours
                        </Link>
                        <Link to="/corporateTour" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                          Corporate Tours
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            if (item.name === "More") {
              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <button className="hover:text-primary transition-all flex items-center gap-1">
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isMoreOpen && (
                    <div className="absolute top-full bg-white shadow-md rounded-md p-2 w-48 z-50">
                      <Link to="/Cycling" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                        Cycling
                      </Link>
                      <Link to="/trekking" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                        Trekking
                      </Link>
                      <Link to="/Transport" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                        Transport
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                to={item.href}
                className="hover:text-primary transition-all"
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-gray-600 cursor-pointer" />

          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <button
                  className="bg-white text-teal-700 border border-teal-600 px-4 py-2 rounded-full hover:bg-teal-50 transition-all"
                  onClick={() => navigate("/Dashboard/users")}
                >
                  Admin Dashboard
                </button>
              )}
              {user?.role !== "admin" && (
                <button
                  className="hidden sm:flex items-center gap-2 bg-white text-teal-700 border border-teal-600 px-4 py-2 rounded-full hover:bg-teal-50 transition-all"
                  onClick={() => navigate("/user-dashboard")}
                >
                  <UserCircle className="h-4 w-4" />
                  Dashboard
                </button>
              )}
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-all"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-all"
              onClick={() => navigate("/Login")}
            >
              Login
            </button>
          )}

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md mt-2 px-4 py-2 space-y-2">
          {navLinks.map((item, index) => {
            if (item.name === "Trips/Tours") {
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() => setIsPackageOpen(!isPackageOpen)}
                    className="w-full text-left flex items-center justify-between py-2"
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isPackageOpen && (
                    <div className="pl-4">
                      <Link to="/spiritualTours" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                        Spiritual Tours
                      </Link>
                      <Link to="/StudentTours" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                        Student Tours
                      </Link>
                      <Link to="/biketour" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                        Bike Tours
                      </Link>
                      <Link to="/corporateTour" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                        Corporate Tours
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            if (item.name === "More") {
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className="w-full text-left flex items-center justify-between py-2"
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isMoreOpen && (
                    <div className="pl-4">
                      <Link to="/Cycling" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                        Cycling
                      </Link>
                      <Link to="/trekking" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                        Trekking
                      </Link>
                      <Link to="/Transport" className="block px-4 py-2 hover:bg-gray-100 transition-all">
                        Transport
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={index} to={item.href} className="block py-2">
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
