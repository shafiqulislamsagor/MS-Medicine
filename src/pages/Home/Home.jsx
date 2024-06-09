import SliderDiscount from "../../components/SliderDiscount/SliderDiscount";
import Category from "../../components/catagory/Category";
import SliderBanner from "../../components/slider/Slider";


const Home = () => {
    return (
        <div>
           <SliderBanner/>
           <Category/>
           <SliderDiscount/>
        </div>
    );
};

export default Home;