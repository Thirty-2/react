import React, { useState, useEffect } from "react";
import { IoLocation } from "react-icons/io5";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const IJobs = ({ setShowExpandedJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "jobs"), (snapshot) => {
      const fetchedJobs = snapshot.docs.map(doc => ({
        id: doc.id,
        position: doc.data().job1 || "Untitled Job",
        poster: doc.data().customerId || "Unknown Customer",
        description: doc.data().description || "No description",
        status: doc.data().status || "unknown",
        createdAt: doc.data().createdAt || new Date(),
        artisanId: doc.data().artisanId || null,
        image: "https://via.placeholder.com/48?text=Logo",
        jobType: doc.data().status === "open" ? "Remote" : null,
        featured: doc.data().status === "open",
      }));
      setJobs(fetchedJobs);
      setLoading(false);
    }, (err) => {
      setError("Failed to load jobs. Please try again later.");
      console.error("Snapshot error:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  if (loading) return <div className="p-6 text-center">Loading jobs...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 w-full rounded-IHome  h-[90vh]">
      <div className="h-full flex flex-col justify-between">
        <div className="space-y-4">
          <div className="grid grid-cols-1 min-lg:grid-cols-2 gap-2">
            {currentJobs.map((job, index) => (
              <div
                key={index}
                className="rounded-lg border border-stone-200 overflow-hidden relative group bg-white shadow-sm"
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
                      <h2 className="text-md font-semibold ">
                        {job.poster}
                      </h2>
                    </div>
                    <h3 className="text-lg font-light  text-gray-800">
                      {job.position}
                    </h3>
                    <p className="text-gray-600 text-xs  font-thin">
                      {job.description}
                    </p>
                  </div>
                  {job.jobType && (
                    <span className="text-xs font-semibold px-2 py-1 flex items-center gap-1 text-slate-800">
                      <IoLocation fill="gray" />
                      {job.jobType}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-opacity-90 flex items-center justify-end gap-2 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white">
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm  transition-colors duration-300 hover:bg-gray-300">
                    View
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm  hover:bg-blue-600 transition-colors duration-300">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 w-fit  rounded-sm text-sm"
            onClick={() => setShowExpandedJobs(false)}
          >
            Close
          </button>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 ${currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} rounded`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IJobs;