import { IoEyeSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import { useState } from "react";

const ShopTable = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosPublic.get("/products");
      return response.data;
    },
  });

  const selectHandle = (event, id) => {
    console.log(event.target.checked);
    console.log(id);
  };

  const [showModal, setShowModal] = useState(false);
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
                  <button onClick={() => setShowModal(true)}>
                    <IoEyeSharp className="text-xl" />
                  </button>
                  {showModal ? (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                              <h3 className="text-3xl font-semibold">
                                Modal Title
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                I always felt like I could do anything. That’s
                                the main thing people are controlled by!
                                Thoughts- their perception of themselves!
                                 taught you can’t do
                                anything, you won’t do anything. I was taught I
                                could do everything.
                              </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </button>
                              <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
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
