import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import useAuth from "../../hooks/Auth/useAuth";
import LoaderLine from "../LineLoading/LoaderLine";
import ErrorPage from "../../pages/Error/Error";

const CardComponents = ({ item, setCardRender }) => {
  const { setRender , user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { _id, discount, discountPrice , price, img, company, name , seller } = item;
  // const {
  //   _id,
  //   discount,
  //   productId,
  //   price,
  //   img,
  //   status,
  //   unit,
  //   company,
  //   category,
  //   description,
  //   generic,
  //   name,
  // } = item;

  // const discountAmount = parseInt(price * (discount / 100));

  const {
    data: currentProductData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["checkQuantity"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/buy-products/${user.email}`);
      return data;
    },
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosSecure.delete(`/buy-products/${id}`);
      return data;
    },
    onSuccess: () => {
     
      refetch();
      toast.success("selecte product delete successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete product");
    },
  });


  const deletedOne = (id) => {
    deleteProduct({ id });
    setCardRender(true);
    setRender(true);
  };

  if (isLoading) return <LoaderLine/>
  if (error) return <ErrorPage/>

  const checkedProduct = currentProductData.filter(
    (produc) => produc.productId == _id
  );

  // console.log(item)

  return (
    <div className="relative">
      <span className="absolute right-5 buttonStyle px-2 bg-blue-200 rounded-full">
        {checkedProduct.length}
      </span>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <img src={seller?.photoURL} alt="" /> 
            </Avatar>
          }
          title={`Seller: ${seller?.displayName}`}
          subheader={seller?.email}
        />
        <CardMedia sx={{ height: 140 }} image={img} title={name} />
        <CardContent className="space-y-2">
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <span className="font-bold">Company:</span> {company}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <span className="font-bold">Price:</span>{" "}
            <span className="line-through text-xs">
              ${price * checkedProduct.length}
            </span>{" "}
            ${discountPrice * checkedProduct.length}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <span className="font-bold">Discount:</span> $
            {price * checkedProduct.length - discountPrice * checkedProduct.length}({discount}%)
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <span className="font-bold">Par Unit:</span> ${price}
          </Typography>
        </CardContent>
        <CardActions className="flex justify-end">
          <Button onClick={() => deletedOne(_id)} size="small">
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardComponents;
