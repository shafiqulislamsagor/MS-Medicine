import { Outlet } from "react-router-dom";
import AdminMenu from "./admin/AdminMenu";
import DashboardWork from "./DashboardWork";
// import UserMenu from "./user/UserMenu";
// import Seller from "./sellerMenu/Seller";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="bg-[#f3644a] sticky top-[72px]  w-1/4 h-[calc(100vh-72px)]">
        <AdminMenu />
        {/* <Seller/> */}
        {/* <UserMenu/> */}
      </div>
      <div className=" flex-1">
        <DashboardWork />
        <div className="px-10 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
