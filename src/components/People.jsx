import React from "react";

const People = ({ name, birth_year, eye_color, skin_color }) => {
  return (
    <>
      <div className="navbar">name, birth_year, eye_color, skin_color</div>
      <div>
        <li>{name}</li>
        <li>{birth_year}</li>
        <li>{eye_color}</li>
        <li>{skin_color}</li>
      </div>
    </>
  );
};

export default People;
