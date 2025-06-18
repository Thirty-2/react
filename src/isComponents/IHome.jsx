import React, { useState } from "react";
import { BsStar, BsStarFill, BsStarHalf, BsViewList } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { WW, MW } from "../assets/images";

const IHome = ({ showExpandedJobs, setShowExpandedJobs }) => {
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

  const [user, setUser] = useState({
    name: "Peter",
    gender: "male",
    profilePic: null,
  });

  const userImage = user.gender === "male" ? MW : WW;

  const [jobCount, setJobCount] = useState(21);
  const rating = 4.5;
  const userProfilePic = "https://via.placeholder.com/80";
  const artisanAvatars = [
    "https://via.placeholder.com/60?text=A1",
    "https://via.placeholder.com/60?text=A2",
    "https://via.placeholder.com/60?text=A3",
    "https://via.placeholder.com/60?text=A4",
  ];

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<BsStarFill key={i} className="text-yellow-300" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<BsStarHalf key={i} className="text-yellow-300" />);
    } else {
      stars.push(<BsStar key={i} className="text-yellow-300" />);
    }
  }

  const [activeProjects, setActiveProjects] = useState(3);

  return (
    <div className="min-md:pt-10 rounded-md font-ComicNeue max-h-[90vh]  relative">
      <div className="grid grid-cols-1 h-full min-lg:grid-cols-5 gap-4">
        {/* First Column */}
        <div className="flex flex-col ">
          <div className="flex flex-col justify-between h-full gap-6">
            <div className="text-center">
              <h1 className="text-xl lg:text-2xl font-semibold">
                Hello <span>{user.name}</span>!
              </h1>
              <h1 className="font-ComicNeue">Welcome Back...</h1>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-fit p-1">
                <img
                  src={userProfilePic}
                  alt="Peter's profile picture"
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="text-center">
                <h1 className="text-md font-ComicNeue">Current Job Count</h1>
                <span className="text-xl lg:text-2xl font-bold font-ComicNeue">
                  {jobCount}
                </span>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-md lg:text-lg font-semibold font-ComicNeue">
                Keep Pushing!
              </h1>
            </div>

            <div className="text-center">
              <h1 className="text-md font-ComicNeue">My Rating</h1>
              <div className="flex justify-center text-2xl">{stars}</div>
            </div>

            <div className="rounded-lg p-4 space-y-3">
              <h1 className="font-semibold font-ComicNeue">Top Rated</h1>
              <p className="font-thin font-ComicNeue">The best of the best</p>
              <div className="flex justify-between">
                {artisanAvatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="w-fit bg-stone-200 rounded-full shadow-md"
                  >
                    <img
                      src={avatar}
                      alt={`Top artisan ${index + 1} avatar`}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="bg-stone-50 p-6 rounded-lg min-lg:col-span-3 flex flex-col gap-4 h-full w-full">
          <div>
            <h1 className="text-xl font-semibold font-ComicNeue mb-4">
              Recent Job Posts
            </h1>
          </div>
          {jobs.map((job, index) => (
            <div
              key={index}
              className="rounded-lg border border-stone-200 overflow-hidden relative group hover:scale-101 transition-all duration-500"
            >
              <div className="p-3 flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center rounded">
                  <img
                    src={job.image || "https://via.placeholder.com/48?text=Logo"}
                    alt={`${job.poster} logo`}
                    className="w-12 h-12 rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-md font-semibold font-ComicNeue">
                      {job.poster}
                    </h2>
                  </div>
                  <h3 className="text-lg font-light font-ComicNeue text-gray-800">
                    {job.position}
                  </h3>
                  <p className="text-gray-600 text-xs font-ComicNeue font-thin">
                    {job.location}
                  </p>
                </div>
                {job.jobType && (
                  <span className="text-xs font-semibold px-2 py-1 flex items-center gap-1 text-slate-800">
                    <IoLocation fill="gray" />
                    Remote
                  </span>
                )}
                {job.featured && (
                  <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-4 py-1 rounded-md border border-blue-300">
                    Featured
                  </span>
                )}
              </div>
              <div className="absolute inset-0  bg-opacity-90 flex items-center justify-end gap-2 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-ComicNeue transition-colors duration-300 hover:bg-gray-300">
                  View job
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-ComicNeue hover:bg-blue-600 transition-colors duration-300">
                  Apply now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Third Column */}
        <div className="bg-Asphalt rounded-lg p-3 text-white flex flex-col gap-6 justify-between h-full ">
          <div className= " p-4 rounded-lg flex flex-col gap-6">
            <div>
              <h1 className="text-xl font-semibold font-ComicNeue text-ArtisansBlue-100">
                My Performance
              </h1>
              <p className="font-thin font-ComicNeue">Performance Overview</p>
            </div>
            <div className="flex flex-col gap-1.5">
              
              <p className="font-ComicNeue">
                My Rating: <span className="font-bold">{rating}/5</span>
                <span className="text-green-400 ml-2">(+0.2 this month)</span>
              </p>
              <p className="font-ComicNeue">
                Active Jobs: <span className="font-bold">{activeProjects}</span>
              </p>
              <p className="font-ComicNeue">
                Completion Rate: <span className="font-bold">85%</span>
                <span className="text-blue-400 ml-2">of 100%</span>
              </p>
            </div>
          </div>
          <div className="bg-stone-100 p-2 rounded-lg flex justify-center shadow-md w-fit">
            <img src={userImage} alt="" />
          </div>
          <div className="flex flex-col gap-1 text-center p-2">
            <p className="font-thin font-ComicNeue text-sm">
              Updated: {new Date().toLocaleDateString()}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-ComicNeue text-sm transition-colors duration-300 flex gap-2 items-center justify-center w-full">
              <BsViewList />Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IHome;