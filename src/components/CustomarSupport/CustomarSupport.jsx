import ServiesModal from "./ServiesModal";
import "./support.css";

const CustomarSupport = () => {
  return (
    <div className="bgImage my-20">
      <div className="text-center md:text-left md:w-4/5 mx-auto py-28">
        <div className="md:w-1/2">
          <h2 className="text-4xl text-[#100f0f] font-semibold">
            Dedicated Support
          </h2>
          <p className="text-gray-700 text-sm my-6">
            The best support services with any problem in our product, quickly
            and friendly. If you don&rsquo;t get your solution in our document
            or video tutorial please feel free to contact us at any time via
            email or forum support!
          </p>
          <ServiesModal />
        </div>
      </div>
    </div>
  );
};

export default CustomarSupport;
