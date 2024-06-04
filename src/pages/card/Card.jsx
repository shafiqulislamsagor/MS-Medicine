import { useQuery } from "@tanstack/react-query";
import CardComponents from "../../components/cardComponents/CardComponents";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import Buttons from "../../components/Button/Buttons";

const Card = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: BuyProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["BuyProduct"],
    queryFn: async () => {
      const response = await axiosSecure.get("/buy-products");
      return response.data;
    },
  });
  const { data: product } = useQuery({
    queryKey: ["product-check"],
    queryFn: async () => {
      const response = await axiosSecure.get("/products");
      return response.data;
    },
  });
 

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const filteredProductBuy = product.filter((item) => {
    return BuyProduct.some((prodItem) => prodItem.productId === item._id);
  });
  // console.log(filteredProductBuy);
  return (
    <div className="w-full md:w-5/6 mx-auto my-20">
      <div className="my-5">
        <Buttons
          text={`Payment : 200`}
          link="checkout"
          style="buttonDefaultStyle"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProductBuy?.map((item) => (
          <CardComponents key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Card;
