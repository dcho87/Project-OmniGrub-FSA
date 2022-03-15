import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getGoogleRestaurant } from "../store";

const Google = () => {
  const dispatch = useDispatch();
  const [zipcode, setZipcode] = useState("");

  const onChange = (ev) => {
    setZipcode(ev.target.value);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    try {
      dispatch(getGoogleRestaurant(zipcode));
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div>
      <h1>Testing Google API</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} name="zipcode"></input>
      </form>
    </div>
  );
};

export default Google;
