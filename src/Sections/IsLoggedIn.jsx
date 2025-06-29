import React, { useState, useEffect } from "react";
import { IHeader, ISideBar, IHome, IFooter, IJobs, IArtisans, IEndSidebar, IPostjobs, ISidebarMobile } from "../isComponents";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IHsetLinks } from "../Constants";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, saveUserToFirestore } from "../firebase";

const IsLoggedIn = () => {
  const [showExpandedJobs, setShowExpandedJobs] = useState(false);
  const [showExpandedArtisans, setShowExpandedArtisans] = useState(false);
  const [showPostJobForm, setShowPostJobForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState(null);
  const [jobCount, setJobCount] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const cachedUser = localStorage.getItem("cachedUser");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setIsLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        const authUser = getAuth().currentUser;
        const [firstName, lastName] = authUser.displayName ? authUser.displayName.split(" ") : [firebaseUser.email.split("@")[0], ""];
        if (userSnap.exists()) {
          const data = userSnap.data();
          const userData = {
            id: firebaseUser.uid,
            firstName: data.firstName || firstName,
            lastName: data.lastName || lastName,
            name: data.name || authUser.displayName || `${firstName} ${lastName}`.trim(),
            gender: data.gender || "unknown",
            profilePic: data.profilePic || firebaseUser.photoURL || "",
            rating: data.rating || 0,
            cvPdf: data.cvPdf || "",
          };
          setUser(userData);
          localStorage.setItem("cachedUser", JSON.stringify(userData));
        } else {
          const newUser = {
            id: firebaseUser.uid,
            firstName,
            lastName,
            name: authUser.displayName || `${firstName} ${lastName}`.trim() || firebaseUser.email.split("@")[0],
            gender: "unknown",
            profilePic: firebaseUser.photoURL || "",
            rating: 0,
            cvPdf: "",
          };
          await saveUserToFirestore(firebaseUser.uid, newUser);
          setUser(newUser);
          localStorage.setItem("cachedUser", JSON.stringify(newUser));
        }
      } else {
        setUser(null);
        localStorage.removeItem("cachedUser");
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleJobsUpdate = (data) => {
    setJobCount(data.jobCount);
    setActiveProjects(data.activeProjects);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="font-ComicNeue text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  if (isOffline && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="font-ComicNeue text-xl text-gray-700">Offline Mode</p>
          <p className="font-ComicNeue text-md text-gray-500">No internet connection. Please reconnect to proceed.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className="p-2 drk:bg-Asphalt min-h-screen flex flex-col gap-2 font-Quicksand">
        <IHeader setShowSettings={setShowSettings} showSettings={showSettings} user={user} />
        <div className="flex max-lg:flex-col min-lg:gap-6">
          <ISideBar
            setShowExpandedJobs={setShowExpandedJobs}
            setShowExpandedArtisans={setShowExpandedArtisans}
            setShowPostJobForm={setShowPostJobForm}
            user={user}
            setShowSettings={setShowSettings}
          />
          {showExpandedJobs ? (
            <IJobs setShowExpandedJobs={setShowExpandedJobs} onJobsUpdate={handleJobsUpdate} />
          ) : showExpandedArtisans ? (
            <IArtisans setShowExpandedArtisans={setShowExpandedArtisans} userId={user.id} />
          ) : showPostJobForm ? (
            <IPostjobs setShowPostJobForm={setShowPostJobForm} />
          ) : (
            <IHome showExpandedJobs={showExpandedJobs} setShowExpandedJobs={setShowExpandedJobs} />
          )}
          <IEndSidebar
            user={user}
            jobCount={jobCount}
            activeProjects={activeProjects}
            userId={user.id}
          />
          <ISidebarMobile
            setShowExpandedJobs={setShowExpandedJobs}
            setShowExpandedArtisans={setShowExpandedArtisans}
            setShowPostJobForm={setShowPostJobForm}
          />
        </div>
        <IFooter />
      </div>
    </BrowserRouter>
  );
};

export default IsLoggedIn;