import React from "react";
import Yelp from "./APICalls/yelp";

export const App = () => {
  return (
    <div>
      <h1>Welcome to OmniGrub!</h1>
      <Yelp />
    </div>
  );
};
