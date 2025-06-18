import React, { useState } from "react";
import { IHeader, ISideBar, IHome, IFooter, IJobs, IArtisans } from "../isComponents";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IHsetLinks } from "../Constants";

const IsLoggedIn = () => {
  const [showExpandedJobs, setShowExpandedJobs] = useState(false);
  const [showExpandedArtisans, setShowExpandedArtisans] = useState(false);
  const [showPostJobForm, setShowPostJobForm] = useState(false);
  const [jobs, setJobs] = useState([
    {
      image: "https://via.placeholder.com/48?text=Bakery",
      poster: "Bakery",
      position: "Senior Graphic Designer",
      location: "Austin, TX",
      featured: true,
      jobType: true,
    },
    {
      image: "https://via.placeholder.com/48?text=TechCo",
      poster: "TechCo",
      position: "Software Engineer",
      location: "San Francisco, CA",
      featured: false,
      jobType: true,
    },
  ]);
  const [artisans, setArtisans] = useState([
    {
      name: "Peter Osagie",
      gender: "male",
      profilePic: null,
      age: 21,
      rating: 3.5,
      profession: "Baker",
    },
    {
      name: "Mark Mathews",
      gender: "male",
      profilePic: null,
      age: 51,
      rating: 4.5,
      profession: "Handy Man",
    },
  ]);

  return (
    <BrowserRouter>
      <div className="py-4  ark:bg-Asphalt min-h-screen flex flex-col gap-2">
        <IHeader />
        <div className="flex min-lg:gap-6">
          <ISideBar
            setShowExpandedJobs={setShowExpandedJobs}
            setShowExpandedArtisans={setShowExpandedArtisans}
            setShowPostJobForm={setShowPostJobForm}
          />
          {showExpandedJobs ? (
            <IJobs jobs={jobs} setShowExpandedJobs={setShowExpandedJobs} />
          ) : showExpandedArtisans ? (
            <IArtisans artisans={artisans} setShowExpandedArtisans={setShowExpandedArtisans} />
          ) : showPostJobForm ? (
            <div>Post Job Form Placeholder</div>
          ) : (
            <IHome
              showExpandedJobs={showExpandedJobs}
              setShowExpandedJobs={setShowExpandedJobs}
              jobs={jobs}
              setJobs={setJobs}
            />
          )}
        </div>
        <main className="flex-1">
          <Routes>
            {IHsetLinks.map((item) => (
              <Route
                key={item.href}
                path={item.href}
                element={item.component}
              />
            ))}
          </Routes>
        </main>
        <IFooter />
      </div>
    </BrowserRouter>
  );
};

export default IsLoggedIn;