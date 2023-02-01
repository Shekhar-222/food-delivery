import React, {lazy, Suspense, useState, useEffect, useContext} from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import UserContextProvider from "./utils/UserContext";

import * as MainHeader from "./components/Header"; /* Imported using import * as namespace  */ 
import Body from "./components/Body"; /* Imported using default export */
import { Footer as MainFooter } from "./components/Footer"; /* Imported using Named Import Map */
/* import About from "./components/About"; */
import Profile from "./components/Profile";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Login from "./components/Login";
import Shimmer from "./components/Shimmer";
/* import Instamart from "./components/Instamart";  

On Demand loading

*/

const Instamart = lazy(() => import("./components/Instamart"));
const About = lazy(() => import("./components/About"));
const Help = lazy(() => import("./components/Help"));

const App = () => {
  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
    
  )
}

const AppLayout = () => {
  useEffect(()=>{
    window.onbeforeunload = function() {
      window.localStorage.removeItem("fav");
      return '';
    };  
  },[]);
  
  return (
    <>
      
        <MainHeader.Header />
        <Outlet />
        <MainFooter />
    </>
  );
};

const appRouter = createBrowserRouter([
  { path         : "/",
    element      : <App />,
    errorElement : <Error />,
    children : [
    { path       : "/",
      element      : <AppLayout />,
      errorElement : <Error />,
      children     : [
        {
          path     : "/about",
          element  : (<Suspense fallback={<div className="container"><h1>Loading...</h1></div>}> <About /></Suspense> ),
          children : [{
            path    : "profile",
            element : <Profile />
          }]
        },
        {
          path     : "/contact",
          element  : <Contact />
        },
        {
          path     : "/",
          element  : <Body />
        },
        {
          path     : "/restaurant/:resId",
          element  : <RestaurantMenu />
        },
        {
          path     : "/instamart",
          element  : (<Suspense fallback={<Shimmer />}> <Instamart /></Suspense> )
        },
        {
          path     : "/help",
          element  : (<Suspense fallback={<div className="container"><h1>Loading...</h1></div>}> <Help /></Suspense> )
        }
      ]
    },
    ,
    {
      path : '/login',
      element      : <Login /> ,
      errorElement : <Error />,
    }]
}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
