import React from "react";
import Header from "./Header";

const Body = () => {
  return (
    <div className="w-6/12 right-0 left-0 mx-auto my-5">
      <Header />
      <h1 className="text-5xl my-5 font-semibold text-center">
        You have sucessfulley loged in by the user.
      </h1>
    </div>
  );
};

export default Body;
