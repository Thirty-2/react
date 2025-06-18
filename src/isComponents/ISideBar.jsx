import React, { useState } from "react";
import {
  Menu,
  Plus,
  PersonStanding,
  BriefcaseBusinessIcon,
  MoreVertical,
} from "lucide-react";
import { MdClose } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ISideBar = ({ setShowExpandedJobs, setShowExpandedArtisans }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showPostJobForm, setShowPostJobForm] = useState(false);
  const [startDate, setStartDate] = useState(null); // State for date picker

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handlePostJobClick = () => {
    setShowPostJobForm(true);
    toggleMobileSidebar(); // Close the sidebar on mobile
  };

  return (
    <div className="relative font-ComicNeue">
      {/* Desktop Sidebar */}
      <div className="px-6 py-2 max-lg:hidden min-h-[90vh] w-fit flex flex-col items-center justify-between border-r border-stone-200">
        <div className="w-fit">
          <img src="" alt="" className="w-13 h-13 rounded-full" />
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="hover:bg-stone-950 transition-colors duration-500 ease-in-out rounded-full p-1 w-fit gap-4 cursor-pointer group"
            onClick={() => {
              setShowExpandedJobs(true);
              setShowExpandedArtisans(false);
            }}
          >
            <div className="bg-black rounded-full p-3 w-fit group-hover:bg-white">
              <BriefcaseBusinessIcon
                size={20}
                className="text-white group-hover:text-black"
              />
            </div>
          </div>
          <div
            className="hover:bg-stone-950 transition-colors duration-500 ease-in-out rounded-full p-1 w-fit gap-4 cursor-pointer group"
            onClick={() => {
              setShowExpandedJobs(false);
              setShowExpandedArtisans(true);
            }}
          >
            <div className="bg-black rounded-full p-3 w-fit group-hover:bg-white">
              <PersonStanding
                size={20}
                className="text-white group-hover:text-black"
              />
            </div>
          </div>

          <div
            className="hover:bg-stone-950 transition-colors duration-500 ease-in-out rounded-full p-1 w-fit gap-4 cursor-pointer group"
            onClick={handlePostJobClick}
          >
            <div className="bg-black rounded-full p-3 w-fit group-hover:bg-white">
              <Plus size={20} className="text-white group-hover:text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="min-lg:hidden">
        {/* Toggle */}
        <button
          onClick={toggleMobileSidebar}
          className="w-10 h-10 bg-stone-100 rounded-full shadow-md flex fixed right-2 top-20 items-center justify-center transition-all hover:bg-stone-200 group hover:scale-110"
          aria-label="Toggle Menu"
        >
          <Menu className="group-hover:scale-110" />
        </button>

        {/* Mobile Sidebar Panel */}
        {isMobileOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-start justify-end z-50 p-4 pt-20">
            <div className="min-h-fit w-full bg-ArtisansAsh-300 text-white rounded-2xl shadow-md p-6">
              <button
                onClick={toggleMobileSidebar}
                className="self-end transition-all hover:scale-115 mb-4"
                aria-label="Close Menu"
              >
                <MdClose size={30} />
              </button>
              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={toggleMobileSidebar}
                  className="hover:text-stone-800 transition-colors"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setShowExpandedJobs(true);
                    toggleMobileSidebar();
                  }}
                  className="hover:text-stone-800 transition-colors"
                >
                  Find Job
                </button>
                <button
                  onClick={() => {
                    setShowExpandedArtisans(true);
                    toggleMobileSidebar();
                  }}
                  className="hover:text-stone-800 transition-colors"
                >
                  Find Artisans
                </button>
                <button
                  onClick={handlePostJobClick}
                  className="hover:text-stone-800 transition-colors"
                >
                  Post Job
                </button>
                <button
                  onClick={toggleMobileSidebar}
                  className="hover:text-stone-800 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Job Form (Overlay) */}
      {showPostJobForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold font-ComicNeue text-gray-800">
                Post A Job
              </h2>
              
            </div>
            <form className="space-y-4">
              {/* Traveler Acceptance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you accept a traveler? <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input type="radio" name="traveler" className="mr-2" />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="traveler" className="mr-2" />
                    No
                  </label>
                </div>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specify Job Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Full-time
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Part-time
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Temporary
                  </label>
                </div>
              </div>

              {/* Work Environments*/}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specify Working Environment
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" className="mr-2" /> Physical / In-Person
                  </label>
                  <label className="flex items-center">
                    <input type="radio" className="mr-2" /> Remote
                  </label>
                  <label className="flex items-center">
                    <input type="radio" className="mr-2" /> Hybrid (Remote and Physical)
                  </label>
                  <label className="flex items-center">
                    <input type="radio" className="mr-2" /> Virtual Office (Zoom,...)
                  </label>
                  {/* <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Freelance
                  </label> */}
                </div>
              </div>


              {/* Preferred Starting Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Starting date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Select Date"
                  className="w-full p-2 border rounded-lg focus:outline-none "
                  calendarClassName="font-ComicNeue"
                />
                <label className="flex items-center mt-2">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  Immediately start
                </label>
              </div>

              {/* Save Button */}
              <div className="flex gap-2">
                <button
                type="submit"
                className="w-full bg-ArtisansBlue text-white rounded-md px-4 py-2 font-ComicNeue hover:bg-ArtisansBlue-100 transition-colors mt-4"
              >
                Post
              </button>
              <button
                onClick={() => setShowPostJobForm(false)}
                className="w-fit bg-red-500 text-white px-4 py-2 font-ComicNeue rounded-md hover:bg-red-600 transition-colors mt-4"
              >
                Cancle
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ISideBar;