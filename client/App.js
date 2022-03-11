import React from "react";
import { YelpSeeder } from "./APICalls/yelp";

export const App = () => {
  return (
    <div>
      <h1>Welcome to OmniGrub!</h1>
      <YelpSeeder />
    </div>
  );
};
