import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/mainPage/MainPage";
import Home from "../pages/Home/Home";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";
import Dashboard from "../pages/dashboard/Dashboard";
import AdminHome from "../pages/dashboard/admin/AdminHome";
import AdminManageUser from "../pages/dashboard/admin/AdminManageUser";
import ManageCatagory from "../pages/dashboard/admin/ManageCatagory";
import PaymentManage from "../pages/dashboard/admin/PaymentManage";
import Report from "../pages/dashboard/admin/Report";
import Advirtisment from "../pages/dashboard/admin/Advirtisment";
import SellerManageMadicine from "../pages/dashboard/seller/SellerManageMadicine";
import Shop from "../pages/shop/Shop";
import Card from "../pages/card/Card";
import Checkout from "../pages/checkout/Checkout";
import Invoide from "../pages/invoide/Invoide";
import SellerPaymentHistory from "../roles/seller/SellerPaymentHistory";
import SellerAsk from "../roles/seller/SellerAsk";
import DetailsCategory from "../pages/DetailsCategory/DetailsCategory";
import PaymentInfo from "../roles/user/PaymentInfo";
import PrivetRoutes from "../privetRoutes/PrivetRoutes";
import ErrorPage from "../pages/Error/Error";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
      errorElement:<ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path:"/update-profile",
          element:<UpdateProfile/>
        },
        {
          path:'/shop',
          element:<PrivetRoutes><Shop/></PrivetRoutes>
        },
        {
          path:'/card',
          element:<PrivetRoutes><Card/></PrivetRoutes>
        },
        {
          path:'/category-details/:category',
          element:<PrivetRoutes><DetailsCategory/></PrivetRoutes>
        },
        {
          path:'/dashboard',
          element:<PrivetRoutes><Dashboard/></PrivetRoutes> ,
          children:[
            {
              path:'',
              element:<AdminHome/>
            },
            {
              path:'admin-management-users',
              element:<AdminManageUser/>
            },
            {
              path:'admin-categories',
              element:<ManageCatagory/>
            },
            {
              path:'admin-payment-manage',
              element:<PaymentManage/>
            },
            {
              path:'admin-reports-manage',
              element:<Report/>
            },
            {
              path:'admin-advertise',
              element: <Advirtisment/>
            },
            {
              path:'seller-management-madicines',
              element:<SellerManageMadicine/>
            },
            {
              path:'seller-payment-history',
              element:<SellerPaymentHistory/>
            },
            {
              path:'seller-advirties',
              element:<SellerAsk/>
            },
            {
              path:'user-paymentInfo',
              element:<PaymentInfo/>
            }
          ]
        }
      ]
    },
    {path:'/join-us',element: <Login/>},
    {path:'/registration',element: <Registration/>},
    {path:'/checkout',element: <PrivetRoutes><Checkout/></PrivetRoutes>},
    {path:'/invoide/:id',element:<PrivetRoutes> <Invoide/></PrivetRoutes>},
  ]);