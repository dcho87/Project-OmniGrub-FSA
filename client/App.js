import React from "react";
import Yelp from "./APICalls/yelp";

import Home from "./Home/Home";

import Counter from "./exampleComponent/Counter.js";
import Yelp1 from "./APICalls/yelp1.js";


export const App = () => {
  return (
    <div>

      <h1>Welcome to OmniGrub!</h1>
      <Yelp />
      <Counter />
      <Yelp1 />
      <Home />
    </div>
  );
};
