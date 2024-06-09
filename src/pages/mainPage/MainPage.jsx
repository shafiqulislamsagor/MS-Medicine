import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import useAuth from "../../hooks/Auth/useAuth";
import Footer from "../../shared/Footer/Footer";

const MainPage = () => {
    const {loading} = useAuth()
    const location = useLocation()
    console.log(location)
    if(!loading) return <h1>Loading...</h1>
    const isDashboardRoute = /^\/dashboard($|\/.*$)/.test(location.pathname);
    return (
        <div className="roboto">
            <Navbar/>
            <Outlet/>
            {!isDashboardRoute && <Footer/>}
            
        </div>
    );
};

export default MainPage;