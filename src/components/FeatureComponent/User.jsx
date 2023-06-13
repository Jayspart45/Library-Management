import React from "react";

export default function User({ name }) {
  return (
    <div className="userLogo  lead ">
      <i className="fa-solid fa-user"></i>
      {name}
    </div>
  );
}
