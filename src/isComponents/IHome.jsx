import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { LocateIcon, Briefcase, LockOpen } from "lucide-react";
import { BsCash } from "react-icons/bs";
import {JobDetailsModal} from "../isComponents";

const IHome = ({ showExpandedJobs, setShowExpandedJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const displayLimit = 6;

  const trimText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    const fetchUserProfilePic = async (postedBy) => {
      try {
        const userDoc = doc(db, "users", postedBy.includes("@") ? postedBy.split("@")[0] : postedBy);
        const userSnap = await getDoc(userDoc);
        return userSnap.exists() ? userSnap.data().profilePic : "https://via.placeholder.com/48?text=Logo";
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
          const profilePic = await fetchUserProfilePic(data.postedBy);
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
            profilePic: data.profilePic || "https://via.placeholder.com/48?text=Logo",
            paymentAmount: data.paymentAmount || "Not specified",
          };
        });
        const fetchedJobs = await Promise.all(jobPromises);
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
        const filteredJobs = fetchedJobs.filter((job) => {
          const jobDate = new Date(job.postedDate);
          return job.status === "open" && jobDate >= fiveDaysAgo;
        });
        setJobs(filteredJobs);
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

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  if (loading) return <div className="p-4 text-center">Loading jobs...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="min-md:pt-1 rounded-md relative overflow-y-auto w-full h-screen">
      <div className="gap-4">
        <div>
          <h1 className="text-xl font-semibold mb-4">Recent Job Posts</h1>
        </div>
        <div className="grid grid-cols-1 min-md:grid-cols-2 min-lg:grid-cols-2 gap-2">
          {jobs.slice(0, displayLimit).map((job, index) => (
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
                        src={job.profilePic || "https://via.placeholder.com/48?text=Logo"}
                        alt={`${job.postedBy} logo`}
                        className="w-15 h-15 rounded-full object-cover shadow-sm"
                      />
                      <div className="flex justify-between">
                        <div className="">
                          <h3 className="text-lg font-black">{job.jobTitle}</h3>
                          <p className="text-gray-600 text-sm font-light">
                            {trimText(job.description, 100)}
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
                  {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : ""}
                </p>
                <div className="p-2 bg-blue-200 text-blue-900 rounded-md w-fit">
                  <p className="text-xs font-semibold">
                    Apply Before{" "}
                    {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedJob && (
        <JobDetailsModal selectedJob={selectedJob} closeModal={closeModal} />
      )}
    </div>
  );
};

export default IHome;