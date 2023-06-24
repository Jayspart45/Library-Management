import React from "react";

export default function User({ name }) {
  const user = name;
  return (
    <div className="userLogo  lead ">
      <i className="fa-solid fa-user"></i>
      {user}
    </div>
  );
}
