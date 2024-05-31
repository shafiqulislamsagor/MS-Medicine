import { Outlet } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";

const MainPage = () => {
    return (
        <div className="roboto">
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default MainPage;