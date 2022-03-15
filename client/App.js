import React from "react";
import Yelp from "./APICalls/yelp";
import Google from "./APICalls/google";

import Home from "./Home/Home";

export const App = () => {
  return (
    <div>
      <h1>Welcome to OmniGrub!</h1>
      <Google />
      <Home />
    </div>
  );
};
