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


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path:'/shop',
          element:<Shop/>
        },
        {
          path:'/card',
          element:<Card/>
        },
        {
          path:'/category-details/:category',
          element:<DetailsCategory/>
        },
        {
          path:'/dashboard',
          element:<Dashboard/> ,
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
            }
          ]
        }
      ]
    },
    {path:'/join-us',element: <Login/>},
    {path:'/registration',element: <Registration/>},
    {path:'/checkout',element: <Checkout/>},
    {path:'/invoide/:id',element: <Invoide/>},
  ]);