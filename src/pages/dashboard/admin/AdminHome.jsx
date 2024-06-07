import { useQuery } from "@tanstack/react-query";
import SellerHome from "../../../roles/seller/SellerHome";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../../../hooks/Auth/useAuth";

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
  
    if (isLoading) return <h1>loading...</h1>;
    if (isError) return <h1>error</h1>;
  
    const currentUser = data.find(
      (currentUser) => currentUser?.email === user?.email
    );
  
    return (
        <div className="">
          {/* {currentUser?.userRole === "admin" && <AdminHome />} */}
          {currentUser?.userRole === "seller" && <SellerHome />}
          {/* {currentUser?.userRole === "user" && <UserMenu />} */}
        </div>
    );
};

export default AdminHome;