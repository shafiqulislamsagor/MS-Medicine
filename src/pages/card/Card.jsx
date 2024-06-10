import { useMutation, useQuery } from "@tanstack/react-query";
import CardComponents from "../../components/cardComponents/CardComponents";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import Buttons from "../../components/Button/Buttons";
import { useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import useAuth from "../../hooks/Auth/useAuth";
import LoaderLine from "../../components/LineLoading/LoaderLine";
import ErrorPage from "../Error/Error";

const Card = () => {
  const [cardRender, setCardRender] = useState(false);
  const { setRender , user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: BuyProduct,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["newCard"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/buy-products/${user.email}`);
      return response.data;
    },
  });
  console.log(BuyProduct)

  const { data: product } = useQuery({
    queryKey: ["product-check"],
    queryFn: async () => {
      const response = await axiosSecure.get("/products");
      return response.data;
    },
  });

  const { mutate: deleteAllProducts } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.delete(`/buy-product/delete`);
      return data;
    },
    onSuccess: () => {
      setRender(true);
      refetch();
      toast.success("All products deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete products");
    },
  });

  const deleteAll = () => {
    deleteAllProducts();
  };

  const rerender = () => {
    if (cardRender) {
      refetch();
      setCardRender(false);
    }
  };

  console.log(user)

  if (cardRender) return rerender();

  if (isLoading) return <LoaderLine/>
  if (isError) return <ErrorPage/>

  const filteredProductBuy = product?.filter((item) => {
    return BuyProduct?.some((prodItem) => prodItem?.productId === item?._id);
  });

  if (filteredProductBuy === undefined) return;
  console.log(BuyProduct)
  const totalSum = BuyProduct.reduce(
    (sum, currentValue) =>
      sum + currentValue.discountPrice,
    0
  );
  console.log(totalSum)


  return (
    <div className="w-full md:w-5/6 mx-auto my-20">
      <div className="my-5 flex justify-between items-center">
        <Buttons
          text={`Payment : $ ${totalSum}`}
          link="checkout"
          style="buttonDefaultStyle"
        />
        <Button onClick={deleteAll} className="buttonDefaultStyle">
          Delete All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProductBuy?.map((item) => (
          <CardComponents
            key={item._id}
            item={item}
            setCardRender={setCardRender}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
