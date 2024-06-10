import { useQuery } from "@tanstack/react-query";
import SellerHome from "../../../roles/seller/SellerHome";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../../../hooks/Auth/useAuth";
import AdminDash from "../../../roles/admin/AdminHome";
import UserHome from "../../../roles/user/UserHome";
import ErrorPage from "../../Error/Error";
import LoaderLine from "../../../components/LineLoading/LoaderLine";

const AdminHome = () => {
    const { user } = useAuth();
    // console.log(user)
    const axiosSecure = useAxiosSecure();
  
    const { data, isLoading, isError } = useQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const { data } = await axiosSecure.get("/users");
        return data;
      },
    });
  
    if (isLoading) return <LoaderLine/>
    if (isError) return <ErrorPage/>
  
    const currentUser = data.find(
      (currentUser) => currentUser?.email === user?.email
    );
  
    return (
        <div className="">
          {currentUser?.userRole === "admin" && <AdminDash />}
          {currentUser?.userRole === "seller" && <SellerHome />}
          {currentUser?.userRole === "user" && <UserHome/>}
        </div>
    );
};

export default AdminHome;