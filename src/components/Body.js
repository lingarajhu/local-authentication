import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Body = () => {
  const userInfo = useSelector((store) => store.user);

  const handelClick = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // alert("signedout sussesfulley");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="w-6/12 flex flex-col-reverse right-0 left-0 mx-auto my-5">
      <Button onClick={handelClick} className="text-lg font-medium">
        Sign Out
      </Button>
      <h1 className="text-5xl my-5 font-semibold text-center">
        You have sucessfulley loged in by the user {userInfo.displayName}
      </h1>
    </div>
  );
};

export default Body;
