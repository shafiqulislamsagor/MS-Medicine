import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { CiLock } from "react-icons/ci";

const ProductServes = () => {
  return (
    <div className="w-[90%] lg:w-4/5 mx-auto">
        <h2 className="text-4xl md:text-5xl price-color font-bold text-center mt-16">
        Our Servies
      </h2>
      <div className=" flex flex-col md:flex-row justify-center  gap-6">
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white hover:bg-[#4e97fd4e]  shadow-md bg-clip-border rounded-xl max-w-[350px] mx-auto transition-all duration-75 ease-in hover:scale-105">
          <div className="p-6">
            <RiMoneyDollarCircleLine className="w-12 h-12 mb-4 text-gray-900" />

            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Money Trusted
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              Shop confidently with our Money Back Guarantee on equipment.
            </p>
          </div>
        </div>
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white hover:bg-[#4e97fd4e] shadow-md bg-clip-border rounded-xl max-w-[350px] mx-auto transition-all duration-75 ease-in hover:scale-105">
          <div className="p-6">
            <TbTruckDelivery className="w-12 h-12 mb-4 text-gray-900" />

            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Free Shipping
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              Enjoy the added benefit of free shipping on all medical
            </p>
          </div>
        </div>
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white hover:bg-[#4e97fd4e] shadow-md bg-clip-border rounded-xl max-w-[350px] mx-auto transition-all duration-75 ease-in hover:scale-105">
          <div className="p-6">
            <CiLock className="w-12 h-12 mb-4 text-gray-900" />

            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              100% Secure
            </h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              Experience peace of mind with our 100% Secure equipment purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductServes;
