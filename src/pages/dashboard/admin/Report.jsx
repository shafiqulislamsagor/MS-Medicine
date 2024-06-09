import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import { format } from 'date-fns';

const Report = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: newProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["salesReport"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments-products");
      return data;
    },
  });
  if (isLoading) return <h2>Loading</h2>;
  if (isError) return <h2>Error</h2>;

  const sellerProductViewAll = newProduct.map(seller => seller.product).flat();

  console.log(sellerProductViewAll);
  return (
    <div className="md:w-[95%] mx-auto my-11">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="p-4">
                No.
              </th>

              <th scope="col" className="px-6 py-3">
               Product Name
              </th>
              <th scope="col" className="px-6 py-3">
              Buyer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Seller Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Grand Price
              </th>
            </tr>
          </thead>
          <tbody>
            {sellerProductViewAll.map((p , count) => (
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
                
                <td className="px-6 py-4">{p?.seller?.email}</td>
                <td className="px-6 py-4">{p?.buyer?.email}</td>
                <td className="px-6 py-4">{format(new Date(p?.date), 'MM/dd/yyyy HH:mm')}</td>
                <td className="px-6 py-4">
                  $ {p?.discountPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
