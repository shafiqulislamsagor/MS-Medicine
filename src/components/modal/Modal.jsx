import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

const Modal = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const modalHandler = () => {
    setShowModal(!showModal);
  };
  console.log(product);
  return (
    <div>
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
                  <h3 className="text-3xl font-semibold">{product?.name}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => modalHandler(product?._id)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6">
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <img className="w-full" src={product?.img} alt="" />
                    </div>
                    <div>
                      <h2>
                        <span className="font-bold">Category : </span>
                        {product?.category}
                      </h2>
                      <h2>
                        <span className="font-bold">Company : </span>
                        {product?.company}
                      </h2>
                      <h2>
                        <span className="font-bold">Status : </span>
                        {product?.status}
                      </h2>
                      <h2>
                        <span className="font-bold">Unit : </span>
                        {product?.unit}
                      </h2>
                      <h2>
                        <span className="font-bold">Discount : </span>
                        {product?.discount} %
                      </h2>
                      <h2>
                        <span className="font-bold">Price : </span>
                        {product?.price}
                      </h2>
                      <h2>
                        <span className="font-bold">Generic : </span>
                        {product?.generic}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="mx-10">
                    <h2 className="text-lg font-bold">Description:</h2>
                  <p className="flex-1 my-2 text-blueGray-500 text-sm leading-relaxed">
                    {product?.description}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => modalHandler(product?._id)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Modal;
