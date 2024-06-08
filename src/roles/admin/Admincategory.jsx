import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { Box, Button, FormControl, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import useImageUpload from "../../hooks/uploadImage/useImage";
import AdminCategory from "../../components/adminCategory/AdminCategory";

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

const Admincategory = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { uploadImage } = useImageUpload();
  const axiosSecure = useAxiosSecure();

 

  const {
    data: categoryProduct,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categoryProduct"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/category-all");
      return data;
    },
  });
  const handleChange = async (event) => {
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
        await axiosSecure.post(`/category-all`, categoryProduct);
        refetch();
        target.reset();
        toast.success("category added successfully");
        handleClose();
      } catch (error) {
        toast.error("Try again");
      }
    };

    formCall();
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  
  return (
    <div>
      <div className="my-4 flex justify-end mr-4">
        <div>
          <Button
            onClick={handleOpen}
            className="buttonDefaultStyle"
            variant="outlined"
          >
            Add Category
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
                    Category Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <FormControl>
                    <h2 className="text-sm text-gray-700">Category Photo</h2>
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="p-4 py-3">
              category Image
            </th>
            <th scope="col" className="px-6 py-3">
              category name
            </th>
            <th scope="col" className="px-6 py-3">
              product
            </th>
            <th scope="col" className="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {categoryProduct.map((product) => <AdminCategory key={product._id} product={product} refetch={refetch}/> )}
        </tbody>
      </table>
    </div>
  );
};

export default Admincategory;
