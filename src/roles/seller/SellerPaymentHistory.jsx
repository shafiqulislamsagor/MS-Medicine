import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/Auth/useAuth";

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
      console.log(data);
      return data;
    },
  });
  if (isLoading) return <h3>Loading </h3>;
  if (isError) return <h3>Error </h3>;
  const status = sellerProduct.map(status => status.status)
//   console.log(status)
  const sellerProductView = sellerProduct
    .filter((seller) =>
      seller.product.some((product) => product.seller.email === user.email)
    )
    .map((seller) => seller.product)
    .flat();
//   console.log(products);
  const firstProductBuyerName = sellerProduct.map((buyer) => buyer.buyer);
//   console.log(firstProductBuyerName);

  const newProduct = sellerProductView.map((product, index) => ({
    ...product,
    buyer: firstProductBuyerName[index],
    status: status[index]
  }));


//   console.log(newProduct)

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
            {newProduct.map((p , count) => (
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
                <td className="px-6 py-4">{p?.status}</td>
                <td className="px-6 py-4">{p?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerPaymentHistory;
