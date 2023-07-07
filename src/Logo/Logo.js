import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import brain from "./images/brain.png";

const Logo = () => {
  return (
    <div className="ma4 mt3">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pointer pa3">
          <img style={{ paddingTop: "5px" }} src={brain} alt="brain logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
