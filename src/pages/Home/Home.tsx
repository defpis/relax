import React from "react";
import "./Home.scss";
import Button from "@material-ui/core/Button";

export const Home: React.FC<{}> = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Button variant="contained" color="primary">
        Click
      </Button>
    </div>
  );
};
