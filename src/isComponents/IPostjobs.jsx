import React, { useState } from "react";
import { Edit, Plus, X, CheckCircle, CheckCircle2, CheckSquare, CheckSquare2, CheckCircle2Icon } from "lucide-react";
import {PF} from '../assets/images'

const IPostjobs = ({ setShowPostJobForm }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    employmentType: "Full time",
    remoteWorkOptions: "No",
    levelOfExperience: "",
    jobLocation: "",
    positionId: "",
    jobCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowPostJobForm(false); // Close the form on submit
  };

  const handleClose = () => {
    setShowPostJobForm(false); // Close the form
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 h-screen">
      <div className=" ark:bg-gray-800 p-6 w-full h-full max-w-[80%] max-lg:max-w-[100%] mx-0 flex flex-col ">
        {/* Header */}

        {/* Tabs */}
        <div className="flex mb-6 space-x-4 border-b border-gray-200 ark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "details"
                ? "border-b-3 border-ArtisansBlue-100 text-ArtisansBlue"
                : "text-gray-500 drk:text-gray-400"
            }`}
            onClick={() => setActiveTab("details")}
          >
            <h1>Details</h1>
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "description"
                ? "border-b-3 border-ArtisansBlue-100 text-ArtisansBlue"
                : "text-gray-500 drk:text-gray-400"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "publish"
                ? "border-b-3 border-ArtisansBlue-100 text-ArtisansBlue"
                : "text-gray-500 drk:text-gray-400"
            }`}
            onClick={() => setActiveTab("publish")}
          >
            Post
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col min-lg:flex-row h-full items-center divide-y-1 min-lg:divide-x-1 divide-stone-300 overflow-y-auto gap-10 min-lg:gap-0">
          {/* Main Form */}
          <div className=" w-full h-full min-h-full">
            {activeTab === "details" && (
              <div className="p-4 flex flex-col justify-between bg-white drk:bg-gray-700 rounded-lg h-full">
                <div>
                  <h3 className="text-lg font-medium drk:text-gray-300">
                    Job Details
                  </h3>
                  <p className="text-sm text-stone-500 drk:text-gray-400 ">
                    This will appear to candidates.
                  </p>
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-stone-800 drk:text-gray-300">
                    Employment type
                  </label>
                  <div className="flex space-x-3 mt-4">
                    {["Full time", "Part time", "Full/Part time"].map(
                      (type) => (
                        <button
                          key={type}
                          className={`px-4 py-2 text-sm rounded-md border border-stone-200 ${
                            formData.employmentType === type
                              ? "bg-blue-200 "
                              : " text-black"
                          }`}
                          onClick={() =>
                            handleChange({
                              target: { name: "employmentType", value: type },
                            })
                          }
                        >
                          {type}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-800 drk:text-gray-300">
                    Remote work options
                  </label>
                  <div className="flex space-x-2 mt-2">
                    {["No", "Hybrid", "Fully remote"].map((option) => (
                      <button
                        key={option}
                        className={`px-4 py-2 text-sm rounded-md border border-stone-200 ${
                          formData.remoteWorkOptions === option
                            ? "bg-blue-200"
                            : " text-black"
                        }`}
                        onClick={() =>
                          handleChange({
                            target: {
                              name: "remoteWorkOptions",
                              value: option,
                            },
                          })
                        }
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-800 drk:text-gray-300">
                      Experience Level
                    </label>
                    <select
                      name="levelOfExperience"
                      value={formData.levelOfExperience}
                      onChange={handleChange}
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    >
                      <option value="">Select level</option>
                      <option value="Junior">1-3 years</option>
                      <option value="Mid">3-5 years</option>
                      <option value="Senior">5 years and above</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Location
                    </label>
                    <input
                      type="text"
                      name="positionId"
                      value={formData.positionId}
                      onChange={handleChange}
                      placeholder="Job Location"
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Position
                    </label>
                    <input
                      type="text"
                      name="positionId"
                      value={formData.positionId}
                      onChange={handleChange}
                      placeholder="Job Position "
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Prefered Age
                    </label>
                    <select
                      name="jobCategory"
                      value={formData.jobCategory}
                      onChange={handleChange}
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    >
                      <option value="">Age</option>
                      <option value="18-20">18-20</option>
                      <option value="20-25">20-25</option>
                      <option value="25-30">25-30</option>
                      <option value="30-40">30-40</option>
                      <option value="40 and Above">40 and Above</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-fit ">
                  <div className="radio flex gap-10 items-center border p-4 rounded-md border-stone-100 bg-blue-50 ">
                    <div className="flex gap-2 items-center">
                      <input type="checkbox" name="Male" id=""/>
                      <label htmlFor="">Male</label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input type="checkbox" name="Female" id="" />
                      <label htmlFor="">Female</label>
                    </div>
                  </div>

                  {/* CV */}
                  <div className="checkbox flex gap-10 items-center border p-4 rounded-md border-stone-100 bg-blue-50">
                    <div className="flex gap-2 items-center">
                      <input type="radio" name="CV" id="CV"/>
                      <label>CV Required</label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input type="radio" name="CVN" id="CVN" />
                      <label>CV Not Required</label>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-fit  px-4 text-white bg-red-500 rounded-md font-semibold transition-colors duration-300 cursor-pointer"
                  >
                    <X />
                  </button>
                  <button
                    onClick={() => setActiveTab("description")}
                    className="w-full bg-ArtisansBlue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {activeTab === "description" && (
              <div className="p-6 drk:bg-gray-700 rounded-lg ">
                <h3 className="text-lg font-medium text-stone-800 drk:text-gray-300">
                  DESCRIPTION
                </h3>
                <p className="text-sm text-stone-700 drk:text-gray-400 mb-6">
                  What candidates will read.
                </p>
                <textarea
                  className="w-full resize-none border border-stone-300 rounded-md p-4 overflow-y-scroll"
                  rows="6"
                  placeholder="Enter job description..."
                />
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setActiveTab("publish")}
                    className="w-full bg-ArtisansBlue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {activeTab === "publish" && (
              <div className="p-6 drk:bg-gray-700 rounded-lg flex flex-col gap-10">
                <div>
                  <h3 className="text-lg font-medium text-stone-800 drk:text-gray-300">
                    Post Job
                  </h3>
                  <p className="text-sm text-stone-700 drk:text-gray-400 ">
                    Double Check To Make Sure Everything Is Good.
                  </p>
                </div>
                <button className="w-fit bg-ArtisansBlue hover:bg-ArtisansBlue-100 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex gap-2">
                  Post <Plus />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Tip */}
          <div className="p-4 flex items-center justify-center w-full h-full self-start">
            <img
              src={PF}
              alt="Job posting illustration"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPostjobs;
