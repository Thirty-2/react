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

const ISideBar = ({ setShowExpandedJobs, setShowExpandedArtisans, setShowPostJobForm, user, setShowSettings }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handlePostJobClick = () => {
    setShowPostJobForm(true);
    toggleMobileSidebar(); // Close the sidebar on mobile
  };

  return (
    <div className="relative ">
      {/* Desktop Sidebar */}
      <div className="p-2 max-lg:hidden min-h-[91vh] w-20 flex flex-col items-center justify-between border-r border-stone-200">
        <div className="w-full cursor-pointer" onClick={() => setShowSettings(true)}>
          <img
            src={user?.profilePic || "https://via.placeholder.com/52"}
            alt={`${user?.name || "User"}'s profile picture`}
            className="w-15 h-15 rounded-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="hover:bg-stone-950 transition-colors duration-500 ease-in-out rounded-full p-1 w-fit gap-4 cursor-pointer group"
            onClick={() => {
              setShowExpandedJobs(true);
              setShowExpandedArtisans(false);
              setShowPostJobForm(false);
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
              setShowPostJobForm(false);
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
            onClick={() => {
              setShowExpandedJobs(false);
              setShowExpandedArtisans(false);
              setShowPostJobForm(true);
            }}
          >
            <div className="bg-black rounded-full p-3 w-fit group-hover:bg-white">
              <Plus size={20} className="text-white group-hover:text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ISideBar;