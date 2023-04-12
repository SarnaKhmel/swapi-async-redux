import React from "react";

const Planet = ({ name, rotation_period, diameter, climate }) => {
  return (
    <>
      <div className="navbar">name, rotation, climate, diameter</div>
      <div>
        <li>{name}</li>
        <li>{rotation_period}</li>
        <li>{diameter}</li>
        <li>{climate}</li>
      </div>
    </>
  );
};

export default Planet;
