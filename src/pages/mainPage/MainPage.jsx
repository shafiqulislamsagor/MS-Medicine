import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/Auth/useAuth";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import { Loader } from './../../components/Loader/Loader';
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const MainPage = () => {
    const {loading} = useAuth()
    const location = useLocation()
    const [path, setPath] = useState('HOME')
    const pathName = location.pathname.replaceAll('/', '').toUpperCase()
    // console.log(loader);
    useEffect(() => {
      if (pathName) {
        setPath(pathName)
      }
      if (!pathName) {
        setPath('HOME')
      }
    }, [pathName])
    // console.log(location)
    if(!loading) return <Loader/>
    const isDashboardRoute = /^\/dashboard($|\/.*$)/.test(location.pathname);
    return (
        <div className="roboto">
             <Helmet>
        <title>SM MEDICINE || {path}</title>
      </Helmet>
            <Navbar/>
            <Outlet/>
            {!isDashboardRoute && <Footer/>}
            
        </div>
    );
};

export default MainPage;