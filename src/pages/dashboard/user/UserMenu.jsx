
const UserMenu = () => {
  return (
    <div className="w-full ml-3 " id="navbar-default">
      <ul className="font-medium flex flex-col p-4 gap-8  mt-4 rounded-lg   ">
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
          >
            Payment history
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
