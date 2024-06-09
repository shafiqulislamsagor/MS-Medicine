import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../hooks/Auth/useAuth";
import Modal from "../modal/Modal";
import { useEffect, useState } from "react";

const ShopTable = () => {
  const [current, setcurrent] = useState(1)
  const [count, setcount] = useState(0)
  const { setRender , user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const parpage = 5
  
  
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products-buy",parpage , current],
    queryFn: async () => {
      const response = await axiosPublic.get(`/products?page=${current}&size=${parpage}`);
      return response.data;
    },
  });
// console.log(products)
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
      discountPrice,
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
      discountPrice,
      status,
      unit,
      company,
      category,
      description,
      generic,
      date:new Date(),
      name,
      seller,
      productId:_id,
      buyer:{name:user.displayName,email:user.email,img:user.photoURL}
    };

    if (selected) {
      try {
        axiosSecure.post("/buy-products", buyProductInfo).then(() => {
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
  useEffect(() => {
    const loaded = async () => {
      const {data} =await axiosPublic.get('/product-counts')
        setcount(data.productcount)
    }
    loaded()
  }, [count])

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  // console.log(products);
  const buttonClick = (value) => {

    setcurrent(value)
}

const pagecount = Math.ceil(count / parpage)
const pages = [...Array(pagecount).keys()].map(page => page + 1)

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
            {products?.slice(0,5).map((product) => (
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
      <div className="mb-5 flex justify-center mt-12">
                    <nav aria-label="Pagination" className="inline-flex -space-x-px rounded-md shadow-sm bg-gray-200 text-gray-800 ">
                        <button disabled={current === 1} onClick={() => buttonClick(current - 1)} type="button" className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md border-gray-300">
                            <span className="sr-only">Previous</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                        {
                            pages.map((button) => <button onClick={() => buttonClick(button)} key={button} type="button" className={`${current === button && 'bg-gray-400 text-white'}inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 hover:bg-gray-400 hover:text-black`}>{button}</button>)
                        }

                        <button onClick={() => buttonClick(current + 1)} disabled={current === pages.length} type="button" className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md border-gray-300">
                            <span className="sr-only">Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </nav>
                </div>
    </div>
  );
};

export default ShopTable;
