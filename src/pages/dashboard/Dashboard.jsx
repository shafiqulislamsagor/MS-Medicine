import { Outlet } from "react-router-dom";
import AdminMenu from "./admin/AdminMenu";
import DashboardWork from "./DashboardWork";
import useAuth from "../../hooks/Auth/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import UserMenu from "./user/UserMenu";
import SellerMenu from "./seller/SellerMenu";

const Dashboard = () => {
  const { user } = useAuth();
  // console.log(user)
  const axiosSecure = useAxiosSecure()

  const {data , isLoading , isError } = useQuery({
    queryKey:['user'],
    queryFn:async()=>{
      const {data} =await axiosSecure.get('/users')
      return data
    }
  })

  if(isLoading) return <h1>loading...</h1>
  if(isError) return <h1>error</h1>


  const currentUser = data.find(currentUser => currentUser?.email === user?.email )


  // console.log(currentUser)

  return (
    <div className="flex">
      <div className="bg-[#f3644a] sticky top-[72px] w-1/4 h-[calc(100vh-72px)]">
        {currentUser?.userRole === "admin" && <AdminMenu />}
        {currentUser?.userRole === "seller" && <SellerMenu />}
        {currentUser?.userRole === "user" && <UserMenu />}
      </div>
      <div className="flex-1">
        <DashboardWork role={currentUser?.userRole} />
        <div className="px-10 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
