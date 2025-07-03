import React from "react";
import { X, LocateIcon, Briefcase, LockOpen, Share2Icon, PersonStandingIcon } from "lucide-react";
import { BsCash } from "react-icons/bs";
import { LucideStamp } from "lucide-react";

const JobDetailsModal = ({ selectedJob, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-end z-50">
      <div className="bg-white p-4 rounded-md w-full h-full overflow-y-auto">
        <div className="w-full flex justify-between mb-8">
          <div></div>
          <X
            size={30}
            className="hover:text-red-500 transition-all duration-300 hover:scale-105"
            onClick={closeModal}
          />
        </div>

        <div className="w-full grid grid-cols-1 min-lg:grid-cols-3 px-10 gap-20 overflow-scroll">
          {/* Left */}
          <div className="flex flex-col gap-4 w-full mx-auto min-lg:col-span-2">
            {/* Top, Poster */}
            <div className="pb-8">
              <div className="w-full flex items-center justify-between rounded pb-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={
                      selectedJob.profilePic ||
                      "https://via.placeholder.com/48?text=Logo"
                    }
                    alt={`${selectedJob.postedBy} logo`}
                    className="w-[4.5rem] rounded-full object-cover shadow-sm"
                  />
                  <div className="">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedJob.jobTitle}
                      </h2>
                    </div>
                    <p className="text-slate-900 capitalize text-sm">
                      Posted by {selectedJob.postedBy}
                    </p>
                    <p className="text-[10px] font-thin">
                      Posted on{" "}
                      {selectedJob.postedDate
                        ? new Date(selectedJob.postedDate).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="text-stone-200" />
            </div>
            <div className="flex flex-col gap-10">
              {/* Middle, Job Details */}
              <div className="flex flex-col gap-4">
                <h1 className="capitalize font-bold">job description</h1>
                <div className="p-4 border border-stone-300 rounded-lg">
                  <p>{selectedJob.description}</p>
                </div>
              </div>
              {/* Bottom, Job Req */}
              <div className="flex flex-col gap-4">
                <h1 className="capitalize font-bold">job requirements</h1>
                <div className="p-4 border border-stone-300 rounded-lg">
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Experience:</strong> {selectedJob.levelOfExperience}
                    </li>
                    <li>
                      <strong>Preferred Age:</strong> {selectedJob.jobCategory}
                    </li>
                    <li>
                      <strong>Gender Preference:</strong>{" "}
                      {selectedJob.gender.length > 0
                        ? selectedJob.gender.join(", ")
                        : "None"}
                    </li>
                    <li>
                      <strong>CV:</strong> {selectedJob.cvrequirement}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
              <h1 className="capitalize text-lg font-bold">Submit application</h1>
              <div className="p-2 bg-blue-200 text-blue-900 rounded-md w-fit">
                <p className="text-xs font-semibold">
                  Apply Before{" "}
                  {selectedJob.postedDate
                    ? new Date(selectedJob.postedDate).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <div className="bg-blue-400 w-50 text-white px-4 py-2 rounded-md text-center cursor-pointer hover:bg-blue-500 transition-all duration-300 border border-blue-400">
                <p className="">Apply</p>
              </div>
              <div className="border border-stone-300 rounded-md p-2 w-fit cursor-pointer transition-all duration-300 text-stone-500 hover:text-blue-700">
                <Share2Icon />
              </div>
            </div>
            <div className="mt-10">
              <div className="space-y-6">
                <h1 className="capitalize text-lg font-bold">
                  Job Information and Payment
                </h1>
                <div className="border border-stone-300 p-4 rounded-lg min-md:flex gap-5">
                  <div className="space-y-3 w-[50%]">
                    <div className="flex flex-col gap-2">
                      <strong>Location</strong>
                      <p className="border border-stone-300 p-2 py-4 rounded-lg w-full flex items-center gap-4">
                        <LocateIcon />
                        {selectedJob.jobLocation}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <strong>Open Positions</strong>
                      <p className="border border-stone-300 p-2 py-4 rounded-lg w-full flex items-center gap-4">
                        <LockOpen />
                        {selectedJob.openPositions}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <strong>Work Type</strong>
                      <p className="border border-stone-300 p-2 py-4 rounded-lg w-full flex items-center gap-4">
                        <Briefcase />
                        {selectedJob.employmentType}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 w-[50%]">
                    <div className="flex flex-col gap-2">
                      <strong>Remote</strong>
                      <p className="border border-stone-300 p-2 py-4 rounded-lg w-full flex items-center gap-4">
                        <PersonStandingIcon />
                        {selectedJob.remoteWorkOptions}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <strong>Payment</strong>
                      <p className="border border-stone-300 p-2 py-4 rounded-lg w-full flex items-center gap-4">
                        <BsCash />
                        {selectedJob.paymentAmount}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <strong>Job Availability</strong>
                      <p className="border border-stone-300 p-2 py-4 rounded-lg w-full flex items-center gap-4">
                        <LucideStamp />
                        {selectedJob.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;