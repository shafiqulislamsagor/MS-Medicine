import { useQuery } from "@tanstack/react-query";
import CardComponents from "../../components/cardComponents/CardComponents";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";

const Card = () => {
    const axiosSecure = useAxiosSecure()
    const {data:BuyProduct,isLoading , isError} = useQuery({
        queryKey:['BuyProduct'],
        queryFn: async () => {
            const response = await axiosSecure.get('/buy-products')
            return response.data
        }
    })
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error</div>
  return (
    <div className="w-full md:w-5/6 mx-auto my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {
             BuyProduct.map((item) => <CardComponents key={item._id} item={item} />)
         }
      </div>
    </div>
  );
};

export default Card;
