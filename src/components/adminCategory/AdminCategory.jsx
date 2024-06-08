import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import useImageUpload from "../../hooks/uploadImage/useImage";

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

const AdminCategory = ({ product, refetch }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { uploadImage } = useImageUpload();
  const axiosSecure = useAxiosSecure();
  const {
    data: allProduct,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/products");
      return data;
    },
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async ({ id }) => {
      // console.log(id)
      const { data } = await axiosSecure.delete(`/category-all/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Category delete successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete category");
    },
  });
  const { mutate: updateCategory } = useMutation({
    mutationFn: async ({ id , categoryProduct}) => {
      const { data } = await axiosSecure.patch(`/category-all/${id}`, {categoryProduct});
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("category added successfully");
      handleClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete category");
    },
  });

  const deleteHandler = (id) => {
    deleteProduct({ id });
  };

  if (isError) return <h2>eror</h2>;
  if (isLoading) return <h2>loading</h2>;

  const categoryFilteredProducts = allProduct?.filter(
    (products) => products.category.toLowerCase() === product.name.toLowerCase()
  );

  const handleChange = async (event, id) => {
    event.preventDefault();
    const target = event.target;
    const name = target.ItemName.value;
    const image = target.image.files[0];
    const img = await uploadImage(image);

    const categoryProduct = {
      name,
      img,
    };

    console.log(categoryProduct);

    const formCall = async () => {
      try {
        updateCategory({ id, categoryProduct });
        target.reset();
      } catch (error) {
        toast.error("Try again");
      }
    };

    formCall();
  };

  console.log(categoryFilteredProducts);
  return (
    <tr key={product?._id} className="bg-white border-b ">
      <td className="px-6 py-4">
        <img
          className="w-28 h-24 rounded-md"
          src={product?.img}
          alt="Jese image"
        />
      </td>
      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap ">
        {product?.name}
      </th>
      <td className="px-6 py-4">{categoryFilteredProducts?.length}</td>
      <td className="px-6 py-4">
        <div className="flex gap-4">
          <button
            // onClick={() => updateHandler(product?._id)}
            onClick={handleOpen}
            className="border text-2xl p-2 rounded-full bg-green-500 text-white border-white"
          >
            <RiEdit2Line />
          </button>
          <button
            onClick={() => deleteHandler(product?._id)}
            className="border text-2xl p-2 rounded-full bg-red-500 text-white border-white"
          >
            <MdDeleteForever />
          </button>
        </div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <form
              onSubmit={(event) => handleChange(event, product._id)}
              className="max-w-md mx-auto"
            >
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
                  Category Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <h2 className="text-sm text-gray-700">Category Photo</h2>
                <input
                  className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                  id="file_input"
                  type="file"
                  name="image"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Update
              </button>
            </form>
          </Box>
        </Modal>
      </td>
    </tr>
  );
};

export default AdminCategory;
