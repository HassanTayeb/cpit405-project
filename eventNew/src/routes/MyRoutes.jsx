import React, { Suspense, useState } from "react";
import {
  BrowserRouter,
  Switch,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import { CircleSpinner, WaveSpinner } from "react-spinners-kit";

// import pages

import Home from "../pages/home/Home";
import AboutUs from "../pages/about/AboutUs";
import Event from "../pages/event/Event";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/Profile/Profile";

// import component 

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const MyRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route
          path="/"
          exact
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Login/>
            </Suspense>
          }
        />
             <Route
          path="/register"
          exact
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Register/>
            </Suspense>
          }
        />
        <Route
          path="/home"
          exact
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Home/>
              <Footer />
            </Suspense>
          }
        />

         <Route
          path="/about"
          exact
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <AboutUs />
              <Footer />
            </Suspense>
          }
        />

         <Route
          path="/Event"
          exact
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Event/>
              <Footer />
            </Suspense>
          }
        />
         <Route
          path="/profile"
          exact
          element={
            <Suspense
              fallback={
                <div className="grid place-items-center h-screen bg-black">
                  <CircleSpinner size={60} />
                </div>
              }
            >
              <Header />
              <Profile/>
              <Footer />
            </Suspense>
          }
        />
        </Routes>
    </BrowserRouter>
  );
};
export default MyRoutes;