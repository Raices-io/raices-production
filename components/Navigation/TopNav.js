import React, { useState, Fragment, useEffect } from "react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../util/auth.js";

const TopNav = ({ inbox = false, fixed = false }) => {
  const router = useRouter();
  const auth = useAuth();
  const user = auth.user;
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Fragment>
      <header
        className={`px-4 top-0 left-0 w-screen bg-white flex-shrink-0  sm:flex sm:items-center sm:justify-between h-20 ${
          fixed ? "fixed" : "block"
        }`}
      >
        <div className="flex justify-between py-2 xl:w-72">
          <Link href="/">
            <div className="cursor-pointer">
              <h2 className="text-2xl">Raíces</h2>
            </div>
          </Link>
          {/* The hamburger/close icon to open the menu. Hidden on screens larger than small*/}
          <div className="flex sm:hidden">
            <button
              type="button"
              className="px-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:text-grey-900"
              onClick={() => setNavOpen((p) => !navOpen)}
            >
              {navOpen ? (
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              )}
            </button>
          </div>
          {/* EnD Hamburger Close Icon */}
        </div>
        {/* The search box */}
        <nav
          className={`${
            navOpen ? "block" : "hidden"
          } sm:flex sm:items-center px-4 md:px-0 ls:flex-1 lg:justify-between `}
        >
          <div className={`sm:flex sm:items-center `}>
            <div
              className={`${inbox ? "lg:hidden" : ""} hidden md:ml-6 md:flex`}
            >
              <Link href="/explorar">
                <a
                  href="#"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                    router.pathname == "/"
                      ? "border-indigo-500"
                      : "border-transparent"
                  } hover:border-gray-300 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`}
                >
                  Explorar
                </a>
              </Link>
              <Link href="/inbox">
                <a
                  href="#"
                  className={`ml-8 inline-flex items-center px-1 pt-1 border-b-2 ${
                    router.pathname == "/inbox"
                      ? "border-indigo-500"
                      : "border-transparent"
                  } hover:border-gray-300 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`}
                >
                  Correo
                </a>
              </Link>
              <Link href="/add-home">
                <a
                  href="#"
                  className={`ml-8 mr-8 inline-flex items-center px-1 pt-1 border-b-2 ${
                    router.pathname == "/add-home"
                      ? "border-indigo-500"
                      : "border-transparent"
                  } hover:border-gray-300 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`}
                >
                  Agregar casa
                </a>
              </Link>
              {auth.isAgent && (
                <Link href="/agent/property-list">
                  <a
                    href="#"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                      router.pathname == "/agent/property-list"
                        ? "border-indigo-500"
                        : "border-transparent"
                    } hover:border-gray-300 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out`}
                  >
                    Mis propiedades
                  </a>
                </Link>
              )}
            </div>
            <div className="relative px-5 py-5 sm:py-0 sm:ml-4 sm:px-0">
              <div className="flex items-center sm:hidden">
                <img
                  className="h-10 w-10 object-cover rounded-full border-2 border-gray-600"
                  src="https://res.cloudinary.com/dvqw5uhrr/image/upload/v1586384636/Raices/Scottie%27s%20Photos/Scottie.png"
                  alt=""
                />
                <span className="ml-4 font-semibold text-gray-200 sm:hidden">
                  {/* {displayName} */}
                </span>
              </div>
              <div className="mt-5 sm:hidden">
                <a
                  href="#account"
                  className="block text-gray-400 hover:text-white"
                >
                  Ajustes
                </a>
                <a
                  href="#support"
                  className="mt-3 block text-gray-400 hover:text-white"
                >
                  Apoyo
                </a>
                <a
                  href="#sign-out"
                  className="mt-3 block text-gray-400 hover:text-white"
                >
                  Desconectar
                </a>
              </div>
            </div>
            {/* Dropdown */}
            <ProfileDropdownMenu
              user={user}
              className="hidden sm:ml-6 sm:block"
            />
            {/* Dropdown */}
          </div>
        </nav>
      </header>

      {/* END Filters Form */}
    </Fragment>
  );
};

export default TopNav;
