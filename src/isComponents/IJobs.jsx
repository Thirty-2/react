import React from "react";
import { IoLocation } from "react-icons/io5";

const IJobs = ({ jobs, setShowExpandedJobs }) => {
  return (
    <div className="p-6 w-full rounded-IHome font-ComicNeue h-[90vh]">
      <div className="h-full flex flex-col justify-between">
        <div className="space-y-4">
          <div className="grid grid-cols-1 min-lg:grid-cols-3 gap-3">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="rounded-lg border border-stone-200 overflow-hidden relative group hover:scale-101 transition-all duration-500"
              >
                <div className="p-3 flex items-center gap-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded">
                    <img
                      src={
                        job.image || "https://via.placeholder.com/48?text=Logo"
                      }
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
        </div>
        <button
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 w-fit font-ComicNeue rounded-sm text-sm"
          onClick={() => setShowExpandedJobs(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default IJobs;
