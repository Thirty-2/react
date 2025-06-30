import React, { useState, useEffect } from "react";
import { BsStar, BsStarFill, BsStarHalf, BsViewList } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { X, LocateIcon, Briefcase } from "lucide-react";
import { PlusCircle, EyeIcon, LockOpen } from "lucide-react";
import { BsCash } from "react-icons/bs";

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
        // Assuming postedBy might be an email or display name; adjust if it's a uid
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
        // Filter jobs posted within the last 5 days and with status "open"
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
                          <p className="text-gray-600 text-sm font-light">{job.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="border border-stone-400 rounded-md px-2 py-1.5 w-full text-center"
                        onClick={() => handleJobClick(job)}
                      >
                        View <EyeIcon className="inline-block ml-2" size={13} />
                      </button>
                      <button
                        className="bg-black text-white transition-all duration-300 ease-in-out rounded-md px-2 w-fit flex items-center"
                        onClick={() => handleJobClick(job)}
                      >
                        Apply <PlusCircle className="inline-block ml-2" size={13} />
                      </button>
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
                <div className="flex gap-4 items-center">
                  <img
                    src={job.profilePic || "https://via.placeholder.com/48?text=Logo"}
                    alt={`${job.postedBy} logo`}
                    className="w-8 h-8 rounded-full object-cover shadow-sm"
                  />
                  <div className="">
                    <p className="font-semibold text-slate-900 capitalize">{job.postedBy}</p>
                    <p className="text-[10px] font-thin">
                      Posted on{" "}
                      {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : ""}
                    </p>
                  </div>
                </div>
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
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-end z-50">
          <div className="bg-white p-6 rounded-md w-full h-[95%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold mb-4">Job Details</h2>
              <div className="hover:text-red-500" onClick={closeModal}>
                <X />
              </div>
            </div>
            <div className="space-y-4">
              <p>
                <strong>Job Title:</strong> {selectedJob.jobTitle}
              </p>
              <p>
                <strong>Position:</strong> {selectedJob.position}
              </p>
              <p>
                <strong>Employment Type:</strong> {selectedJob.employmentType}
              </p>
              <p>
                <strong>Remote Work Options:</strong> {selectedJob.remoteWorkOptions}
              </p>
              <p>
                <strong>Level of Experience:</strong> {selectedJob.levelOfExperience}
              </p>
              <p>
                <strong>Age Preferred:</strong> {selectedJob.jobCategory}
              </p>
              <p>
                <strong>Open Positions:</strong> {selectedJob.openPositions}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.description}
              </p>
              <p>
                <strong>Location:</strong> {selectedJob.jobLocation}
              </p>
              <p>
                <strong>Posted By:</strong> {selectedJob.postedBy}
              </p>
              <p>
                <strong>Posted Date:</strong> {new Date(selectedJob.postedDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedJob.status}
              </p>
              <p>
                <strong>Gender Preference:</strong> {selectedJob.gender.length > 0 ? selectedJob.gender.join(", ") : "None"}
              </p>
              <p>
                <strong>CV Requirement:</strong> {selectedJob.cvrequirement}
              </p>
              <p>
                <strong>Payment Amount:</strong> {selectedJob.paymentAmount}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IHome;