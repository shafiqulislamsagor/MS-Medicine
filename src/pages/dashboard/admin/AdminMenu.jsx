import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="w-full ml-3 " id="navbar-default">
      <ul className="font-medium flex flex-col p-4 gap-8  mt-4 rounded-lg   ">
        <li>
          <NavLink to='' className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">
            Admin Home
          </NavLink>
        </li>
        <li>
          <NavLink to={'admin-management-users'}
            href="#"
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to={'admin-categories'}
            href="#"
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            Manage Category
          </NavLink>
        </li>
        <li>
          <NavLink
          to={'admin-payment-manage'}
            href="#"
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            Payment management
          </NavLink>
        </li>
        <li>
          <NavLink
          to={'admin-reports-manage'}
            href="#"
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            Sales Report
          </NavLink>
        </li>
        <li>
          <NavLink to={'admin-advertise'}
            href="#"
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            Manage banner Advertise
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
