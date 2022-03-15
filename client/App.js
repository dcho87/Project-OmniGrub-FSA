import React from "react";
import Yelp from "./APICalls/yelp";

import HomeYelp from "./Home/HomeYelp";

import Counter from "./exampleComponent/Counter.js";

export const App = () => {
  return (
    <div>
      <h1>Welcome to OmniGrub!</h1>
      <Yelp />
      <HomeYelp />
    </div>
  );
};
