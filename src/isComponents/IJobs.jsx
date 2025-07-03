import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { Briefcase, LocateIcon, LockOpen } from "lucide-react";
import { db } from "../firebase";
import { BsCash } from "react-icons/bs";
import {JobDetailsModal} from "../isComponents";

const IJobs = ({ setShowExpandedJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const jobsPerPage = 4;

  useEffect(() => {
    const fetchUserProfilePic = async (postedBy) => {
      try {
        const userDoc = doc(
          db,
          "users",
          postedBy.includes("@") ? postedBy.split("@")[0] : postedBy
        );
        const userSnap = await getDoc(userDoc);
        return userSnap.exists()
          ? userSnap.data().profilePic
          : "https://via.placeholder.com/48?text=Logo";
      } catch (err) {
        console.error("Error fetching profile pic for", postedBy, err);
        return "https://via.placeholder.com/48?text=Logo";
      }
    };

    const unsubscribe = onSnapshot(
      collection(db, "jobs"),
      async (snapshot) => {
        const jobPromises = snapshot.docs.map(async (doc) => {
          const data = doc.data();
          fetchUserProfilePic(data.postedBy);
          return {
            id: doc.id,
            jobTitle: data.jobTitle || "Untitled Job",
            employmentType: data.employmentType || "Unknown",
            openPositions: data.openPositions || 0,
            description: data.description || "No description",
            status: data.status || "unknown",
            jobLocation: data.jobLocation || "Unknown Location",
            postedBy: data.postedBy || "Unknown Customer",
            postedDate: data.postedDate || new Date(),
            remoteWorkOptions: data.remoteWorkOptions || "Unknown",
            levelOfExperience: data.levelOfExperience || "Unknown",
            jobCategory: data.jobCategory || "Unknown",
            position: data.position || "Unknown",
            gender: data.gender || [],
            cvrequirement: data.cvrequirement || "Unknown",
            profilePic:
              data.profilePic || "https://via.placeholder.com/48?text=Logo",
            paymentAmount: data.paymentAmount || "Not specified",
          };
        });
        const fetchedJobs = await Promise.all(jobPromises);
        setJobs(fetchedJobs);
        setLoading(false);
      },
      (err) => {
        setError("Failed to load jobs. Please try again later.");
        console.error("Snapshot error:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  if (loading) return <div className="p-6 text-center">Loading jobs...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 w-full rounded-IHome h-[90vh]">
      <div className="h-full flex flex-col justify-between">
        <div className="space-y-4">
          <div className="grid grid-cols-1 min-md:grid-cols-2 min-lg:grid-cols-2 gap-2">
            {currentJobs.map((job, index) => (
              <div
                key={index}
                className="rounded-lg border border-stone-200 overflow-hidden relative group bg-white shadow-sm cursor-pointer flex flex-col"
                onClick={() => handleJobClick(job)}
              >
                <div className="p-3 flex flex-col gap-4">
                  <div className="w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="w-fit flex items-center gap-4">
                        <img
                          src={
                            job.profilePic||
                            "https://via.placeholder.com/48?text=Logo"
                          }
                          alt={`${job.postedBy} logo`}
                          className="w-15 h-15 rounded-full object-cover shadow-sm"
                        />
                        <div className="flex justify-between">
                          <div className="">
                            <h3 className="text-lg font-black">
                              {job.jobTitle}
                            </h3>
                            <p className="text-gray-600 text-sm font-light">
                              {job.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-md font-semibold text-gray-600 items-start space-y-2 flex gap-10 min-md:gap-15">
                    <div className="flex flex-col gap-2">
                      <span className="flex items-center gap-2">
                        <Briefcase /> {job.employmentType}
                      </span>
                      {job.jobLocation && (
                        <span className="font-semibold flex items-center gap-2 capitalize">
                          <LocateIcon /> {job.jobLocation}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 text-gray-600">
                      <span className="flex items-center gap-2">
                        <LockOpen /> Positions {job.openPositions}
                      </span>
                      <span className="flex items-center gap-2">
                        <BsCash size={20} /> {job.paymentAmount}
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="w-[95%] text-stone-200 m-auto" />
                <div className="w-full flex items-center justify-between rounded p-2.5">
                  <p className="text-[10px] font-thin ml-4">
                    Posted on{" "}
                    {job.postedDate
                      ? new Date(job.postedDate).toLocaleDateString()
                      : ""}
                  </p>
                  <div className="p-2 bg-blue-200 text-blue-900 rounded-md w-fit">
                    <p className="text-xs font-semibold">
                      Apply Before{" "}
                      {job.postedDate
                        ? new Date(job.postedDate).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 w-fit rounded-sm text-sm"
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
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
      {selectedJob && (
        <JobDetailsModal selectedJob={selectedJob} closeModal={closeModal} />
      )}
    </div>
  );
};

export default IJobs;