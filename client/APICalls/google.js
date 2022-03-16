import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGoogleRestaurant, reverseGeocode } from "../store";

const Google = () => {
  const dispatch = useDispatch();
  const [zipcode, setZipcode] = useState("");

  function getPosition() {
    return new Promise((success) =>
      navigator.geolocation.getCurrentPosition(success)
    );
  }

  useEffect(async () => {
    const p = await getPosition();
    dispatch(reverseGeocode(p.coords.latitude, p.coords.longitude));
  }, []);

  const onChange = (ev) => {
    setZipcode(ev.target.value);
    console.log(latitude, longitude);
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
