import { Outlet } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import useAuth from "../../hooks/Auth/useAuth";

const MainPage = () => {
    const {loading} = useAuth()
    if(!loading) return <h1>Loading...</h1>
    return (
        <div className="roboto">
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default MainPage;