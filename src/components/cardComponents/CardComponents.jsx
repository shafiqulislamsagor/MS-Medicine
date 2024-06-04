import { useQuery } from "@tanstack/react-query";
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

const CardComponents = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    discount,
    price,
    img,
    company,
    name,
  } = item;
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

  const discountAmount = parseInt(price * (discount / 100));

  const {
    data: currentProductData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["checkQuantity"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/buy-products");
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const checkedProduct = currentProductData.filter(produc => produc.productId == _id)

  return (
    <div className="relative">
      <span className="absolute right-5 buttonStyle px-2 bg-blue-200 rounded-full">{checkedProduct.length}</span>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {name.charAt(0)}
            </Avatar>
          }
          title={name}
          subheader={company}
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
            <span className="font-bold">Price:</span> <span className="line-through text-xs">${price * checkedProduct.length}</span> ${price * checkedProduct.length - discountAmount}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <span className="font-bold">Discount:</span> ${discountAmount * checkedProduct.length}({discount}%)
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <span className="font-bold">Par Unit:</span> ${price}
          </Typography>
        </CardContent>
        <CardActions className="flex justify-end">
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardComponents;
