import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../hooks/Auth/useAuth";
import Modal from "../modal/Modal";

const ShopTable = () => {
  const { setRender } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products-buy"],
    queryFn: async () => {
      const response = await axiosPublic.get("/products");
      return response.data;
    },
  });

  const selectHandle = (event, id) => {
    const selected = event.target.checked;
    // console.log(selected);
    const currentProduct = products.find(
      (findProduct) => findProduct?._id === id
    );
    const {
      _id,
      discount,
      price,
      img,
      status,
      unit,
      company,
      category,
      description,
      generic,
      name,
      seller
    } = currentProduct;
    const buyProductInfo = {
      discount,
      price,
      img,
      status,
      unit,
      company,
      category,
      description,
      generic,
      name,
      seller,
      productId:_id
    };

    if (selected) {
      try {
        axiosSecure.post("buy-products", buyProductInfo).then(() => {
          toast.success("Product selected");
          setRender(true);
          refetch();
        });
      } catch (error) {
        toast.error("try again");
      }
      console.log(currentProduct);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(products);
  return (
    <div className="md:w-4/5 mx-auto my-11">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="p-4">
                Select
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                generic Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                show
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product?._id} className="bg-white border-b ">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      onChange={(event) => selectHandle(event, product?._id)}
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={product?.img}
                    alt="Jese image"
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {product?.name}
                    </div>
                    <div className="font-normal text-gray-500">
                      {product?.company}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{product?.generic}</td>
                <td className="px-6 py-4">{product?.price}</td>
                <td className="px-6 py-4">
                  <Modal product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopTable;
