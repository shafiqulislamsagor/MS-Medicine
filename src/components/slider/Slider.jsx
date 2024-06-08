import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";

const SliderBanner = () => {
  const axiosPublic = useAxiosPublic()
  const { data: dynamic, isLoading, isError } = useQuery({
    queryKey: ['banner-slider'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/dynamic-banner');
      return data;
    }
  });

  if (isLoading) return <h2>loading</h2>;
  if (isError) return <h2>error</h2>;
  
  // Map over dynamic directly to extract img values
  const img = dynamic.map((item) => item.img);
  
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <a>
          <img
            src={img[i]}
            alt={`Thumbnail ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </a>
      );
    },
  };
  return (
    <div>
      <div className="max-w-screen-xl my-5 lg:my-10  rounded-lg">
        <Slider {...settings}>
          {dynamic.map((product, index) => (
            <div key={index} className="relative  rounded-lg">
              <div className="lg:w-5/6 mx-auto h-80 lg:h-96  rounded-lg">
                <img
                  className="w-full mx-auto h-full  rounded-lg"
                  src={product?.img}
                  alt={`Slide ${index + 1}`}
                />
                <div className="absolute z-50 top-0 bg-black bg-opacity-30 lg:w-5/6 mx-auto h-80 lg:h-96">
                  <h2 className="text-5xl font-bold text-center mt-24 text-white">
                    <span className="text-6xl text-yellow-400">
                      {product?.discount}%
                    </span>{" "}
                    Discount
                  </h2>
                  <div className="flex gap-3 justify-center items-center text-white mt-5">
                    <h2 className="text-sm line-through">{product?.price} TK</h2>
                    <h3 className="text-xl">{parseInt(product?.price - (product?.price * (product?.discount / 100)))} TK</h3>

                  </div>
                  <h2 className="text-center text-white text-3xl font-bold my-9">{product?.name}</h2>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderBanner;
