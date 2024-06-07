import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { toast } from 'react-toastify';

const PaymentManageTable = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: sellerProduct,
    isError,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["admin-payment-check"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/payments-products`
      );
      console.log(data);
      return data;
    },
  });

  const { mutate: statusChanged } = useMutation({
    mutationFn: async ({ id, paid }) => {
      console.log(id,paid)
      const { data } = await axiosSecure.patch(`/payments-products/${id}`, { paid });
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("paid successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to paid");
    },
  });

  if (isLoading) return <h3>Loading </h3>;
  if (isError) return <h3>Error </h3>;
  const status = sellerProduct.map(status => status.status)
//   console.log(status)
  
//   console.log(products);
  const firstProductBuyerName = sellerProduct.map((buyer) => buyer.buyer);
//   console.log(firstProductBuyerName);

  const newProduct = sellerProduct.map((product, index) => ({
    ...product,
    buyer: firstProductBuyerName[index],
    status: status[index]
  }));
  console.log(newProduct)

  const paidHandle = (id) =>{
    const paid = 'paid'
    console.log(id , paid)
    statusChanged({id ,paid})
  }

  return (
    <div className="md:w-[85%] mx-auto my-11">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
            <th scope="col" className="p-4">
                No.
              </th>
              
              <th scope="col" className="px-6 py-3">
                Buyer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Buying Product
              </th>
              <th scope="col" className="px-6 py-3">
                
                Status
              </th>
              <th scope="col" className="px-6 py-3">
              Price
              </th>
              <th scope="col" className="px-6 py-3">
              Action
              </th>
            </tr>
          </thead>
          <tbody>
          {newProduct.map((p , count) => (
              <tr key={p._id} className="bg-white border-b ">
                <td className="w-4 p-4">
                {count + 1}
                </td>
                <td className="px-6 py-4">{p?.buyer?.name}</td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  Products ({p?.product.length})
                </th>
                
                <td className="px-6 py-4">{p?.status}</td>
                <td className="px-6 py-4">{p?.price}</td>
                <td className="px-6 py-4">
                  <button disabled={p?.status === 'paid'} onClick={()=>paidHandle(p?._id)} className={p?.status === 'panding'? 'border px-2 py-2 rounded-full bg-blue-300 text-gray-800 border-gray-800': 'border px-2 py-2 rounded-full bg-blue-300 text-green-800 border-green-800'}><BsClipboard2CheckFill/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManageTable;
