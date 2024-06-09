// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";
import { toast } from "react-toastify";
import useAuth from "../../hooks/Auth/useAuth";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";

const SliderDiscount = () => {
  const axiosPublic = useAxiosPublic();
  const { setRender } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: discountProduct,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["discountProduct"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/products");
      return data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  // console.log(discountProduct)
  const discount = discountProduct.filter((data) => data.discount > 0);
  console.log(discount);
  const selectHandle = (id) => {
    console.log(id);
    const currentProduct = discountProduct.find(
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
      seller,
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
      productId: _id,
    };

    if (buyProductInfo) {
      try {
        axiosSecure.post("/buy-products", buyProductInfo).then(() => {
          toast.success("add card succesfully");
          setRender(true);
          refetch();
        });
      } catch (error) {
        toast.error("try again");
      }
      console.log(currentProduct);
    }
  };
  return (
    <div className="my-11">
      <h2 className="text-4xl md:text-5xl price-color font-bold text-center mt-9 mb-14">
        Discount Product View
      </h2>
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {discount.map((card) => (
          <SwiperSlide key={card?._id}>
            <div className="max-w-sm mx-auto h-[520px] relative rounded overflow-hidden pb-4 shadow-lg">
              <img
                className="w-full"
                src={card?.img}
                alt="Sunset in the mountains"
              />
              <div className="absolute top-0 right-0 some-background w-14 py-2 text-white text-center font-semibold rounded-lg">
                {card?.discount}%
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{card?.name}</div>
                <p className="text-gray-700 text-base">
                  <span className="font-bold">Price : </span>${card?.price}
                </p>
                <p className="text-gray-700 text-base">
                  <span className="font-bold">Grand Price : </span>$
                  {parseInt(card?.price - card?.price * (card.discount / 100))}{" "}
                  (saving ${parseInt(card?.price * (card.discount / 100))} )
                </p>
                <p className="text-gray-700 text-base">
                  <span className="font-bold">Company : </span>
                  {card?.company}
                </p>
                <p className="text-gray-700 text-base">
                  <span className="font-bold">Unit : </span>
                  {card?.unit}
                </p>
              </div>
              <div className="px-6 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {card?.category}
                </span>
              </div>
              <button
                onClick={() => selectHandle(card?._id)}
                className="px-2 py-1 border ml-6 rounded-lg text-sm font-bold buttonStyle hover:bg-[#e4573d] hover:!text-white "
              >
                Add Card
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderDiscount;
