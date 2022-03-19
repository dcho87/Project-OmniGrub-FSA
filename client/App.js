import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Google from "./APICalls/google";
import { HomeYelp } from "./Home/HomeYelp";
import HomeTest from "./Home/HomeTest";
import { NavBar } from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./Components/Login/LoginPage";
import { me } from "./store";
import WithNav from "./Components/NavToggle/WithNav";
import WithoutNav from "./Components/NavToggle/WithoutNav";
import { SignUp } from "./Components/Login/SignUp";
import { FlashMessage } from "./Components/FlashMessage/FlashMessage";


export const App = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(me());
  }, []);
  const user = useSelector((state) => state.auth);

  return (
    <div>
      <BrowserRouter>
        <FlashMessage/>
        <Routes>
          <Route element={<WithNav />}>
            <Route path="/yelpTest" element={<HomeTest />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/homeyelp" element={<HomeYelp />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/" element={<HomeYelp />} />
          </Route>
          <Route element={<WithoutNav />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route element={<WithoutNav />}>
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="/google" element={<Google />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
