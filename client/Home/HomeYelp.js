import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllRest,
  findNearby,
  findNearbyFour,
  getGoogleRestaurant,
} from "../store";
import StarRatingComponent from "react-star-rating-component";

export const HomeYelp = () => {
  const dispatch = useDispatch();
  //State from store
  const state = useSelector((state) => state);

  const [zip, setZip] = useState("");

  //This section indicates the code used for sorting the cards
  const [sort, setSort] = useState("");
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  //Form input
  const onChange = (ev) => {
    setZip({ ...zip, zip: ev.target.value });
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    try {
      dispatch(findNearby(zip.zip));
      dispatch(getGoogleRestaurant(zip.zip));

      dispatch(findNearbyFour(zip.zip));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getAllRest());
  }, []);

  let currentSpots = [];
  //Loads Yelp array first while waiting for Google array to load
  if (state.yelpSlice[0])
    currentSpots = state.yelpSlice[0].businesses
      .map((e) => {
        return {
          name: e.name,
          yRating: e.rating,
          yLat: e.coordinates.latitude,
          image: e.image_url,
          yTotal: e.review_count,
        };
      })
      .sort((a, b) => (a.name > b.name ? 1 : -1));

  //Loads both once Google array is loaded
  if (state.yelpSlice[0] && state.googleStore.gRest && state.fourSlice) {
    const yelpArray = state.yelpSlice[0].businesses;
    const googArray = state.googleStore.gRest;
    //Grab attributes you want from yelp here
    const cleanYelp = yelpArray.map((e) => {
      return {
        name: e.name,
        yRating: e.rating,
        yLat: e.coordinates.latitude,
        image: e.image_url,
        yTotal: e.review_count,
        yURL: e.url,
      };
    });
    //Grab attributes you want from Google here
    const cleanGoogle = googArray.map((e) => {
      return {
        name: e.name,
        Googlerating: e.rating,
        lat: e.geometry.location.lat,
        lng: e.geometry.location.lng,
        gTotal: e.user_ratings_total,
        gId: e.place_id,
      };
    });
    //Merge the two arrays together
    const combined = cleanYelp.map((e) => {
      cleanGoogle.forEach((x) => {
        if (x.name === e.name) {
          e.gRating = x.Googlerating;
          e.gLat = x.lat;
          e.gLng = x.lng;
          e.gTotal = x.gTotal;
          e.gId = x.gId;
        } else {
          e.gRating = e.gRating > 0 ? e.gRating : 0;
          e.gTotal = e.gTotal > 0 ? e.gTotal : 0;
        }
      });
      return e;
    });

    const combined2 = combined
      .map((e) => {
        state.fourSlice[0].forEach((x) => {
          if (x.name === e.name) {
            e.fRating = x.rating;
            e.fTotal = x.hasOwnProperty("stats") ? x.stats.total_ratings : 0;
            e.fWeb = x.hasOwnProperty("website") ? x.website : "/";
          } else {
            e.fRating = e.fRating ? e.fRating : 0;
            e.fTotal = e.fTotal > 0 ? e.fTotal : 0;
            e.fWeb = e.fWeb ? e.fWeb : "/";
          }
        });
        return e;
      })
      .sort((a, b) => b.gRating - a.gRating);
    // .sort((a, b) => (a.name > b.name ? 1 : -1));
    currentSpots = combined2;
  }
  console.log(currentSpots, "currentSpots");
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} placeholder="Where are you?" name="zip" />
        <button type="submit"> Send </button>
      </form>
      <label>
        Sort By:
        <select value={sort} onChange={handleChange}>
          <option value="maxGoogle">Google Reviews</option>
          <option value="maxYelp">Yelp Reviews</option>
          <option value="alpha">Name</option>
        </select>
      </label>

      {currentSpots.length === 0 ? (
        <img id="loading" style={{ width: "25%" }} src="/pictures/snail.gif" />
      ) : (
        <></>
      )}

      <ul>
        <div id="resList">
          {currentSpots.map((e) => (
            <div
              id="resBox"
              key={e.id}
              onClick={() => console.log("You clicked me!")}
            >
              <img id="cardPic" src={e.image} />


              <table id="cardTable">
                <tbody>
                  <tr>
                    <td colSpan={3}>
                      <h3>{e.name}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>Yelp</td>
                    <td>({e.yTotal})</td>

                    <td>
                      <img src={`/pictures/small_${e.yRating}.png`} />
                    </td>
                  </tr>
                  <tr>
                    <td>Google</td>
                    <td>({e.gTotal})</td>

                    <td>
                      <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={e.gRating}
                      />

                    </td>
                  </tr>
                  <tr>
                    <td>FourSquare</td>
                    <td>({e.fTotal})</td>
                    <td>
                      <StarRatingComponent
                        name="rate1"
                        starCount={10}
                        value={e.fRating}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};