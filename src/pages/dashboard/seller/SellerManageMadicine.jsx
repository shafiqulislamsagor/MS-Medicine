import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/AxiosSecure/useAxiosSecure";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { toast } from "react-toastify";
import useImageUpload from "../../../hooks/uploadImage/useImage";
import useAuth from "../../../hooks/Auth/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SellerManageMadicine = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { uploadImage } = useImageUpload();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {data:category } = useQuery({
    queryKey:['category'],
    queryFn:async()=>{
      const {data} =await axiosSecure.get('category-all')
      return data
    }
  })

  const {
    data: productData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/products/${user.email}`);
      return data;
    },
  });

  const handleChange = async (event) => {
    event.preventDefault();
    const target = event.target;
    const name = target.ItemName.value;
    const generic = target.genericName.value;
    const description = target.shortDescription.value;
    const category = target.category.value;
    const image = target.image.files[0];
    const company = target.company.value;
    const unit = target.unit.value;
    const status = target.status.value;
    const price = target.price.value;
    const discount = target.discount.value;

    const img = await uploadImage(image);

    const product = {
      name,
      generic,
      description,
      category,
      company,
      unit,
      status,
      discountPrice:parseInt(price - price * (discount / 100)),
      img,
      price,
      ad: "Unavailable",
      discount,
      seller: { ...user },
    };
    console.log(product);

    const formCall = async () => {
      try {
        await axiosSecure.post(`/products`, product);
        refetch();
        target.reset();
        toast.success("Product added successfully");
        handleClose();
      } catch (error) {
        toast.error("Try again");
      }
    };

    formCall();
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <p>Error</p>;
  console.log(productData);
  return (
    <div>
      <div className="my-4 flex justify-end mr-4">
        <div>
          <Button
            onClick={handleOpen}
            className="buttonDefaultStyle"
            variant="outlined"
          >
            Add Product
          </Button>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleChange} className="max-w-md mx-auto">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="ItemName"
                    id="Item-name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="Item-name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Product Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="genericName"
                    id="item-generic-name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="item-generic-name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Generic Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="shortDescription"
                    id="floating_short description"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_short description"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Short Description
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6 my-6">
                  <Box sx={{ minWidth: 120 }}>
                    <div>
                      <InputLabel id="demo-simple-select-labele">
                        category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-labele"
                        id="demo-simple-select"
                        label="Age"
                        name="category"
                        className="w-full"
                      >
                        {
                          category?.map(categorys => <MenuItem key={categorys?._id} value={`${categorys?.name}`}>{categorys?.name}</MenuItem>)
                        }
                      </Select>
                    </div>
                  </Box>
                  <Box sx={{ minWidth: 120 }}>
                    <div>
                      <InputLabel id="demo-simple-select-label">
                        company
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        name="company"
                        className="w-full"
                      >
                        <MenuItem value={"Pfizer"}>Pfizer</MenuItem>
                        <MenuItem value={"Sanofi"}>Sanofi</MenuItem>
                        <MenuItem value={"Biogen"}>Biogen</MenuItem>
                      </Select>
                    </div>
                  </Box>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="unit"
                      id="unit"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="unit"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Product Units(mg or ml)
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Product Status
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="status"
                      >
                        <FormControlLabel
                          value="available"
                          control={<Radio />}
                          label="available"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="price"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Price
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      name="discount"
                      id="discount"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="discount"
                      className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Discount percentage
                    </label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <FormControl>
                    <h2 className="text-sm text-gray-700">Product Photo</h2>
                    <input
                      className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                      id="file_input"
                      type="file"
                      name="image"
                    />
                  </FormControl>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Item Name
              </th>
              <th scope="col" className="px-6 py-3">
                Company Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                discount Price
              </th>
              <th scope="col" className="px-6 py-3">
                catagory
              </th>
            </tr>
          </thead>
          <tbody>
            {productData.map((data) => (
              <tr key={data?._id} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <img src={data?.img} className="w-8 h-8" />
                </th>
                <td className="px-6 py-4">{data?.name}</td>
                <td className="px-6 py-4">{data?.company}</td>
                <td className="px-6 py-4">{data?.price}</td>
                <td className="px-6 py-4">{data?.discount}%</td>
                <td className="px-6 py-4">{data?.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerManageMadicine;
