import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/mainPage/MainPage";
import Home from "../pages/Home/Home";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
      children: [
        {
          path: "/",
          element: <Home/>
        }
      ]
    },
  ]);