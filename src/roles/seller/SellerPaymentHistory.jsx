import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/Auth/useAuth";
import LoaderLine from "../../components/LineLoading/LoaderLine";
import ErrorPage from "../../pages/Error/Error";

const SellerPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: sellerProduct,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/payment-see-seller/${user.email}`
      );
      // console.log(data);
      return data;
    },
  });
  if (isLoading) return <LoaderLine/>
  if (isError) return <ErrorPage/>
  // const status = sellerProduct.map(status => status.status)
//   console.log(status)
  const sellerProductView = sellerProduct
    .filter((seller) =>
      seller.product.some((product) => product.seller.email === user.email) && seller.status === 'paid'
    )
    .map((seller) => seller.product)
    .flat();
// console.log(sellerProduct)

const sellerProductViewPending = sellerProduct.filter((seller) => seller.product.some((product) => product.seller.email === user.email) && seller.status === 'pending').map((seller) => seller.product).flat();


console.log(sellerProductView)

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
                Product Name
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
            {sellerProductView.map((p , count) => (
              <tr key={p._id} className="bg-white border-b ">
                <td className="w-4 p-4">
                {count + 1}
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  {p?.name}
                </th>
                <td className="px-6 py-4">{p?.buyer?.name}</td>
                <td className="px-6 py-4 font-bold text-gray-600">paid</td>
                <td className="px-6 py-4">{parseInt(p?.price - p?.price * (p?.discount / 100))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="p-4">
                Product Count
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
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
            {sellerProductViewPending.map((p , count) => (
              <tr key={p._id} className="bg-white border-b ">
                <td className="w-4 p-4">
                {count + 1}
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  {p?.name}
                </th>
                <td className="px-6 py-4">{p?.buyer?.name}</td>
                <td className="px-6 py-4 font-bold text-gray-600">pending</td>
                <td className="px-6 py-4">{parseInt(p?.price - p?.price * (p?.discount / 100))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerPaymentHistory;
