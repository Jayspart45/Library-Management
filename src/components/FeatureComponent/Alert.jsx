import React from "react";

export default function Alert({title,type}) {
  return (
    <div className={`alert alert-${type} mt-2`} role="alert">
      {title}
    </div>
  );
}
