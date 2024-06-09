import CustomarSupport from "../../components/CustomarSupport/CustomarSupport";
import ProductServes from "../../components/ProductServies/ProductServes";
import SliderDiscount from "../../components/SliderDiscount/SliderDiscount";
import Category from "../../components/catagory/Category";
import SliderBanner from "../../components/slider/Slider";


const Home = () => {
    return (
        <div>
           <SliderBanner/>
           <Category/>
           <SliderDiscount/>
           <ProductServes/>
           <CustomarSupport/>
        </div>
    );
};

export default Home;