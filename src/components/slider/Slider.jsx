import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banner = [
  {img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",discount:50 , Price:500 , discountsPrice:400},
  {img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",discount:50 , Price:500 , discountsPrice:400},
  {img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",discount:50 , Price:500 , discountsPrice:400},
  {img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",discount:50 , Price:500 , discountsPrice:400},
];


const img = banner.map(imge => imge.img);
const SliderBanner = () => {
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
      <div className="max-w-screen-xl my-5 lg:my-10">
        <Slider {...settings}>
          {banner.map((product, index) => (
            <div key={index} className="relative">
              <div className="lg:w-5/6 mx-auto h-80 lg:h-96">
                <img
                  className="w-full mx-auto h-full"
                  src={product.img}
                  alt={`Slide ${index + 1}`}
                />
                <div className="absolute z-50 top-0 bg-black bg-opacity-30 lg:w-5/6 mx-auto h-80 lg:h-96">
        <h2 className="text-5xl font-bold text-center mt-24">{product.discount}% Discount</h2>
                  <div className="flex gap-3 justify-center">
                    <h2>{product.Price} TK</h2>
                    <h3>{product.discountsPrice} TK</h3>
                  </div>
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
