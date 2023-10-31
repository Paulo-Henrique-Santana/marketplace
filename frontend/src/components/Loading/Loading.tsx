import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem"}}>
      <MoonLoader color="#8758ff" />
    </div>
  );
};

export default Loading;
