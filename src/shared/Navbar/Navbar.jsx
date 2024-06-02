import { useState } from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import { SiShopee } from "react-icons/si";
import Buttons from "../../components/Button/Buttons";
import useAuth from './../../hooks/Auth/useAuth';
import { toast } from "react-toastify";

const Navbar = () => {
  const {user , UserLogout} = useAuth()
  // console.log(user)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logoutHandler = () =>{
    UserLogout()
    .then(()=>{
      toast.success('Logout Success...!')
    })
    .catch(()=>{
      toast.error('Logout Failed...!')
    })
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const menu = (
    <>
      <li>
        <a
          href="#"
          className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 uppercase"
          aria-current="page"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 uppercase"
        >
          Shop
        </a>
      </li>
      <li>
        <a
          href="#"
          className="flex relative gap-2 py-2 px-3  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 uppercase"
        >
          <SiShopee className="text-xl"/> card
          <span className="text-sm absolute -top-0 md:-top-2 left-[85px] md:-right-3 price-color">0</span>
        </a>
      </li>
    </>
  );
  return (
    <>
      <nav className="bg-blue-100 border-gray-200 sticky top-0 z-50 ">
        <div className="max-w-screen-xl flex  items-center justify-between mx-auto py-4 md:p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-1 rtl:space-x-reverse"
          >
            <img src={logo} className="h-10" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Medicine
            </span>
          </NavLink>
          <div className="flex relative gap-0 md:gap-3 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div>
              <Button
              className="buttonDefaultStyle"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Language
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>বাংলা</MenuItem>
                <MenuItem onClick={handleClose}>English</MenuItem>
              </Menu>
            </div>
            {!user ? <Buttons text='join us' link='join-us' style='buttonStyle' /> :
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
              id="user-menu-button"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={user?.photoURL}
                alt="user photo"
              />
            </button>}
            {dropdownOpen && (
              <div
                className="z-50 absolute top-7 right-0 my-4 text-base list-none bg-blue-200 divide-y divide-gray-100 rounded-lg shadow "
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 ">
                    {user?.displayName}
                  </span>
                  <span className="block text-sm text-gray-500 truncate ">
                    {user?.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <NavLink
                      to='/dashboard'
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      Update Profile
                    </a>
                  </li>
                  <li>
                    <span
                      onClick={logoutHandler}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      Log out
                    </span>
                  </li>
                </ul>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-user"
              aria-expanded={navbarOpen}
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              navbarOpen ? "absolute top-10 z-40 w-1/2 right-0" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-blue-100">
              {menu}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
