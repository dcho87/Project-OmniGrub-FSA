import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRest } from "../store";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAllRest());
  }, []);
  return (
    <div>
      <h2>Something</h2>
    </div>
  );
};

export default Home;
