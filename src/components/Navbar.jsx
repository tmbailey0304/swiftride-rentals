import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [navBar, setNavBar] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("token");
          setLoggedIn(false);
          setUserRole(null);
        } else {
          setLoggedIn(true);
          setUserRole(decoded.role);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setUserRole(null);
      }
    } else {
      setLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserRole(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <div className="flex flex-row justify-between lg:justify-evenly py-6 px-8 items-center relative">
      <div>
        <h1 className="text-2xl font-bold">Swiftride Rentals</h1>
      </div>

      <ul className="hidden md:flex flex-row gap-8 font-bold">
        <a href="/">
          <li className="hover:scale-105 duration-500 cursor-pointer">Home</li>
        </a>
        <Link to="rent" spy={true} smooth={true} offset={0} duration={500}>
          <li className="hover:scale-105 duration-500 cursor-pointer">Rent</li>
        </Link>
        <li className="hover:scale-105 duration-500 cursor-pointer">Contact</li>
        <li className="hover:scale-105 duration-500 cursor-pointer">Reviews</li>
      </ul>

      <div className="md:hidden z-50">
        {navBar ? (
          <FaTimes onClick={() => setNavBar(!navBar)} size={30} />
        ) : (
          <FaBars onClick={() => setNavBar(!navBar)} size={30} />
        )}
      </div>

      {navBar && (
        <ul className="md:hidden flex flex-col gap-8 fixed top-0 left-0 w-full h-screen items-center justify-center text-3xl z-40 bg-white">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#rent">Rent</a>
          </li>
          <li>Contact</li>
          <li>Reviews</li>
          {!loggedIn ? (
            <>
              <li>
                <a href="/login">Sign In</a>
              </li>
              <li>
                <a href="/signup">Register</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/rentals">My Rentals</a>
              </li>
              <li>
                <a href="/settings">Settings</a>
              </li>
              {userRole === "admin" && (
                <li>
                  <a href="/admin">Admin</a>
                </li>
              )}
              <li>
                <button onClick={handleSignOut} className="text-red-600">
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>
      )}

      <div className="hidden md:flex gap-4 font-bold items-center relative">
        {!loggedIn ? (
          <>
            <a href="/login" className="hover:scale-105 duration-500">
              Sign In
            </a>
            <a
              href="/signup"
              className="px-4 py-2 bg-orange-600 text-white shadow-md shadow-orange-500 hover:shadow-lg hover:shadow-orange-500 duration-500 hover:scale-105 rounded-md"
            >
              Register
            </a>
          </>
        ) : (
          <>
            {userRole === "admin" && (
              <a
                href="/admin"
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Admin
              </a>
            )}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Account ▾
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-lg z-50">
                  <a
                    href="/rentals"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Rentals
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
