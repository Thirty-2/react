import React, { useState, useEffect } from "react";
import { BsStar, BsStarFill, BsStarHalf, BsViewList } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // Import db from firebase.js

const IHome = ({ showExpandedJobs, setShowExpandedJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const displayLimit = 3; // Limit to 3 jobs, no pagination

  // Utility function to trim text
  const trimText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "jobs"), (snapshot) => {
      const fetchedJobs = snapshot.docs.map(doc => ({
        id: doc.id,
        position: doc.data().job1 || "Untitled Job", // Map job1 to position
        poster: doc.data().customerId || "Unknown Customer", // Map customerId to poster
        description: doc.data().description || "No description", // Add description
        status: doc.data().status || "unknown",
        createdAt: doc.data().createdAt || new Date(),
        artisanId: doc.data().artisanId || null,
        // Placeholder fields (remove if not needed)
        image: "https://via.placeholder.com/48?text=Logo",
        jobType: doc.data().status === "open" ? "Remote" : null, // Example mapping
        featured: doc.data().status === "open", // Example mapping
      }));
      setJobs(fetchedJobs);
      setLoading(false);
    }, (err) => {
      setError("Failed to load jobs. Please try again later.");
      console.error("Snapshot error:", err);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  if (loading) return <div className="p-4 text-center">Loading jobs...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="min-md:pt-1 rounded-md  relative overflow-y-auto w-full h-screen">
      <div className="gap-4">
        {/* Second Column (Spanning 3 columns on lg screens) */}
        <div className="rounded-lg flex flex-col gap-2 h-full w-full">
          <div>
            <h1 className="text-xl font-semibold  mb-4">
              Recent Job Posts
            </h1>
          </div>
          {jobs.slice(0, displayLimit).map((job, index) => (
            <div
              key={index}
              className="rounded-lg bg-white border border-stone-200 overflow-hidden relative group shadow-sm"
            >
              <div className="py-1 px-4 flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center rounded ">
                  <img
                    src={job.image || "https://via.placeholder.com/48?text=Logo"}
                    alt={`${job.poster} logo`}
                    className="w-12 h-12 rounded"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-md font-semibold ">
                      {job.poster}
                    </h2>
                  </div>
                  <h3 className=" max-lg:hidden text-lg font-light  text-gray-800">
                    {job.position} {/* Full text on larger screens */}
                  </h3>
                  {/* MIN - Trimmed text on smaller screens */}
                  <h3 className="min-lg:hidden text-lg font-light  text-gray-800">
                    {trimText(job.position, 15)} 
                  </h3>
                  <p className="text-gray-600 text-xs  font-thin">
                    {trimText(job.description, 20)} 
                  </p>
                </div>
                {job.jobType && (
                  <span className="text-xs font-semibold px-2 py-1 flex items-center gap-1 text-slate-800">
                    <IoLocation fill="gray" />
                    {job.jobType}
                  </span>
                )}
              </div>
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-end gap-2 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-gray-200 text-gray-800 px-4 py-1 rounded-md text-sm  transition-colors duration-300 hover:bg-gray-300">
                  View
                </button>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm  hover:bg-blue-600 transition-colors duration-300">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IHome;