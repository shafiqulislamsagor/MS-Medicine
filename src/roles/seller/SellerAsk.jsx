import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/Auth/useAuth";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";
import LoaderLine from "../../components/LineLoading/LoaderLine";
import ErrorPage from "../../pages/Error/Error";

const SellerAsk = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: productData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["ask"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/products/${user.email}`);
      return data;
    },
  });
  const { mutate: addrequest } = useMutation({
    mutationFn: async ({id , ad}) => {
        console.log(ad)
      const { data } = await axiosSecure.patch(`/products-request/${id}`,{ad});
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Ad request successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Ad request failed");
    },
  });
  if (isLoading) return <LoaderLine/>
  if (isError) return <ErrorPage/>
  const requestHandle = (id) =>{
    const ad = 'requested'
    addrequest({id , ad})
  }
  console.log(productData)
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
                Discount
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
            {productData.map((p, count) => (
              <tr key={count} className="bg-white border-b ">
                <td className="w-4 p-4">{count + 1}</td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  {p?.name}
                </th>
                <td className="px-6 py-4">{p?.discount}%</td>
                <td className="px-6 py-4">{p?.advirtise && 'Accepted' || p?.ad}</td>
                <td className="px-6 py-4">
                  <div>
                    <button disabled={p?.ad === 'requested'} onClick={()=>requestHandle(p?._id)} className={p?.ad === 'requested' ? 'bg-green-700 text-gray-100 px-2 py-1 rounded-lg font-medium line-through' : 'bg-green-500 text-black px-2 py-1 rounded-lg font-medium'}>
                      requsted
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerAsk;
