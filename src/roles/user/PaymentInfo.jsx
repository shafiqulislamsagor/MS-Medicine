import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/Auth/useAuth";
import LoaderLine from "../../components/LineLoading/LoaderLine";
import ErrorPage from "../../pages/Error/Error";

const PaymentInfo = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data:userPaymentInfo , isLoading , isError} = useQuery({
        queryKey:["user-payment-info"],
        queryFn:async()=>{
            const { data } = await axiosSecure.get(`/payments-user-product/${user.email}`);
      return data;
        }
    })

    if(isLoading) return <LoaderLine/>
    if(isError) return <ErrorPage/>

    console.log(userPaymentInfo)

    return (
        <div className="md:w-[85%] mx-auto my-11">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="p-4">
                Product Count
              </th>
              <th scope="col" className="px-6 py-3">
              Transaction Id
              </th>
              <th scope="col" className="px-6 py-3">
                Buyer Name
              </th>
              <th scope="col" className="px-6 py-3">
                
                Status
              </th>
              <th scope="col" className="px-6 py-3">
              Price
              </th>
            </tr>
          </thead>
          <tbody>
            {userPaymentInfo.map((p , count) => (
              <tr key={p._id} className="bg-white border-b ">
                <td className="w-4 p-4">
                {count + 1}
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  {p?.transactionId}
                </th>
                <td className="px-6 py-4">{p?.buyer?.name}</td>
                <td className="px-6 py-4 font-bold text-gray-600">{p?.status}</td>
                <td className="px-6 py-4">{p?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default PaymentInfo;