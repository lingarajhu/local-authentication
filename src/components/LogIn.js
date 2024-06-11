import { Button, Form, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { validateEmailAndPassword } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const LogIn = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [signUp, setSignUp] = useState(true);
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(addUser({ uid: uid, displayName: displayName, email: email }));
        navigate("/body");
      } else {
        dispatch(removeUser);
        navigate("/");
      }
    });
  }, []);

  const handelClick = () => {
    const message = validateEmailAndPassword(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    if (message) return;

    if (!signUp) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // profile upadte
              const { uid, displayName, email } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, displayName: displayName, email: email })
              );
            })
            .catch((error) => {
              // handel error;
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const handelClickV2 = () => {
    setSignUp(!signUp);
  };

  return (
    <div className="w-4/12 my-5 right-0 left-0 mx-auto">
      <Card>
        <Card.Body>
          <h2 className="font-bold text-3xl">
            {signUp ? "Sign In" : "Sign Up"}
          </h2>
          <Form onSubmit={(e) => e.preventDefault()}>
            {!signUp && (
              <Form.Group className="my-4">
                <Form.Control
                  ref={name}
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="my-4">
              <Form.Control
                ref={email}
                type="email"
                required
                placeholder="Email Address"
              />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control
                ref={password}
                type="password"
                required
                placeholder="Password"
              />
            </Form.Group>
            <p className="text-red-600 my-3 mx-2">{errorMessage}</p>
            <Button
              onClick={handelClick}
              className="text-lg w-full font-semibold"
              type="submit"
            >
              {signUp ? "Sign In" : "Sign Up"}
            </Button>
          </Form>
          <p className="text-center text-base my-3">
            Don't have an account?{" "}
            <strong
              onClick={handelClickV2}
              className="border-b-black hover:border-b cursor-pointer"
            >
              {!signUp ? "Sign In" : "Sign Up"}
            </strong>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LogIn;
