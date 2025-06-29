import React, { useState, useEffect } from "react";
import { IsntLoggedIn, IsLoggedIn } from "../Sections";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import {SignupModal} from "../isntComponents";

const Main = () => {
  const [user, setUser] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ 
          id: user.uid, 
          name: user.displayName || user.email.split("@")[0], 
          gender: "unknown", 
          profilePic: user.photoURL 
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpenSignupModal = () => {
    setShowSignupModal(true);
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  return (
    <div className="">
      {user ? (
        <IsLoggedIn userId={user.id} /> // Pass userId to IsLoggedIn
      ) : (
        <>
          <IsntLoggedIn onOpenSignup={handleOpenSignupModal} />
          {showSignupModal && <SignupModal onClose={handleCloseSignupModal} setUser={setUser} />}
        </>
      )}
    </div>
  );
};

export default Main;