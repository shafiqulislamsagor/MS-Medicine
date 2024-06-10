import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import CountUp from "react-countup";
import useAuth from "../../hooks/Auth/useAuth";
import LoaderLine from "../../components/LineLoading/LoaderLine";
import ErrorPage from "../../pages/Error/Error";

const UserHome = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const {
    data: sellerProduct,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user-home"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments-user-product/${user.email}`);
      return data;
    },
  });
  if (isLoading) return <LoaderLine/>
  if (isError) return <ErrorPage/>
  //   console.log(status)

  const panding = sellerProduct.filter((pro) => pro.status === "pending");
  const paid = sellerProduct.filter((pro) => pro.status === "paid");


  const pandingPrice = panding.reduce(
    (sum, currentValue) => sum + parseInt(currentValue.price),
    0
  );
  const paidPrice = paid.reduce(
    (sum, currentValue) => sum + parseInt(currentValue.price),
    0
  );
  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-center gap-10">
        <div className="block md:w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            Pending Total
          </h5>
          <p className="font-normal text-gray-700 text-xl">
            $ <CountUp delay={2} end={pandingPrice} />
          </p>
        </div>
        <div className="block md:w-2/5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            Paid Total
          </h5>
          <p className="font-normal text-gray-700 text-xl">
            $ <CountUp delay={2} end={paidPrice} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
