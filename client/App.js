import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Yelp from "./APICalls/yelp";
import Google from "./APICalls/google";
import { HomeYelp } from "./Home/HomeYelp";
import { NavBar } from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./Components/Login/LoginPage";
import { me } from "./store";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(me());
  }, []);
  const user = useSelector((state) => state.auth);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/homeyelp" element={<HomeYelp />} />
          <Route path="/" element={<HomeYelp />} />
          <Route path="yelp" element={<Yelp />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/google" element={<Google />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
