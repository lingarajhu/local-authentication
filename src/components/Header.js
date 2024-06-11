import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(addUser({ uid: uid, displayName: displayName, email: email }));
        navigate("/body");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

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
    <div>
      <Button onClick={handelClick} className="text-lg font-medium">
        Sign Out
      </Button>
    </div>
  );
};

export default Header;
