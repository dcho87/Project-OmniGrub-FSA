import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Components/Home/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./Components/Login/LoginPage";
import { me } from "./store";
import WithNav from "./Components/NavToggle/WithNav";
import WithoutNav from "./Components/NavToggle/WithoutNav";
import { SignUp } from "./Components/Login/SignUp";
import { FlashMessage } from "./Components/FlashMessage/FlashMessage";
import { PageNotFound } from "./Components/PageNotFound";
import { Favorite } from "./Components/Favorite/favorites";
import { MyAccount } from "./Components/MyAccount/MyAccount";
import { Footer } from "./Components/Footer";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(me());
  }, []);
  const user = useSelector((state) => state.auth);

  return (
    <div>
      <BrowserRouter>
        <FlashMessage />
        <Routes>
          <Route element={<WithNav />}>
            <Route path="/" element={<Home />} />
          </Route>
          {/* <Route element={<WithNav />}>
            <Route path="/yelpTest" element={<HomeTest />} />
          </Route> */}
          {/* <Route element={<WithNav />}>
            <Route path="/homeyelp" element={<HomeYelp />} />
          </Route> */}
          <Route element={<WithNav />}>
            <Route path="/favorites" element={<Favorite />} />
          </Route>
          {/* <Route element={<WithNav />}>
            <Route path="/" element={<HomeYelp />} />
          </Route> */}
          <Route element={<WithoutNav />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route element={<WithoutNav />}>
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/account" element={<MyAccount />}/>
          </Route>
          <Route element={<WithoutNav />}>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};
