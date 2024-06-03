import { NavLink } from "react-router-dom";

const Seller = () => {
    return (
        <div className="w-full ml-3 " id="navbar-default">
      <ul className="font-medium flex flex-col p-4 gap-8  mt-4 rounded-lg   ">
        <li>
          <NavLink
            to={'seller-home'}
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'seller-management-madicines'}
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
           Manage Medicines
          </NavLink>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            Payment History
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            Ask For Advertisement
          </a>
        </li>
      </ul>
    </div>
    );
};

export default Seller;