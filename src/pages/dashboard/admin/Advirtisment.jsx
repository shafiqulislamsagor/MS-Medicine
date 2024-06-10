import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import Toggle from 'react-toggle'
import "react-toggle/style.css" 
import { toast } from "react-toastify";
import LoaderLine from "../../../components/LineLoading/LoaderLine";
import ErrorPage from "../../Error/Error";

const Advirtisment = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: adRequestProduct,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["adRequestProduct"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/products-adrequest");
      return data;
    },
  });
  const {mutate:toogleChange} = useMutation({
    mutationFn: async ({id,toogleValue}) => {
      const { data } = await axiosSecure.patch(`/products-adrequest/${id}`,{toogleValue});
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success('Advirtisment accepted successfully')
    },
    onError: () => {
      toast.error('Advirtisment not successfully')
    },
  })

  if (isLoading) return <LoaderLine/>
  if (isError) return <ErrorPage/>
  const adHandler = (id , event) =>{
    const toogleValue = event.target.checked;
    toogleChange({id , toogleValue})
  }
  console.log(adRequestProduct)
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
                Product Image
              </th>
              <th scope="col" className="px-6 py-3">
                Seller Email
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {adRequestProduct.map((ad, index) => (
              <tr key={ad?._id} className="bg-white border-b ">
                <td className="w-4 p-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img className="h-10 w-16 rounded-lg" src={ad?.img} alt="" />
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  {ad?.seller?.email}
                </th>

                <td className="px-6 py-4">{ad?.name}</td>
                <td className="px-6 py-4">{ad?.description}</td>
                <td className="px-6 py-4">
                  <Toggle
                    id="cheese-status"
                    defaultChecked={ad?.advirtise === 'true'}
                    onChange={(event)=>adHandler(ad?._id , event)}
                    name="accept"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Advirtisment;
