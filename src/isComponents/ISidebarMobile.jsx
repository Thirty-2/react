import React from "react";
import {
  Menu,
  Plus,
  PersonStanding,
  BriefcaseBusinessIcon,
  MoreVertical,
} from "lucide-react";

const ISidebarMobile = ({ setShowExpandedJobs, setShowExpandedArtisans, setShowPostJobForm  }) => {
  return (
    <div className="fixed p-1 bg-Paper bottom-10 m-4  min-lg:hidden rounded-full shadow-xl  right-0">
      <div className="">

        <div className="flex flex-col gap-4">
          
            <div className="bg-black rounded-full p-3 w-fit hover:bg-white group transition-colors duration-300 shadow-lg"
            onClick={() => {
              setShowExpandedJobs(true);
              setShowExpandedArtisans(false);
              setShowPostJobForm(false);
            }}
            >
              <BriefcaseBusinessIcon
                size={20}
                className="text-white group-hover:text-black"
              />
          </div>
          
            <div className="bg-black rounded-full p-3 w-fit group hover:bg-white transition-colors duration-300 shadow-lg"
            onClick={() => {
              setShowExpandedJobs(false);
              setShowExpandedArtisans(true);
              setShowPostJobForm(false);
            }}
            >
              <PersonStanding
                size={20}
                className="text-white group-hover:text-black"
              />
          </div>

            <div className="bg-black rounded-full p-3 w-fit hover:bg-white group transition-colors duration-300 shadow-lg"
            onClick={() => {
              setShowExpandedJobs(false);
              setShowExpandedArtisans(false);
              setShowPostJobForm(true);
            }}
            >
              <Plus size={20} className="text-white group-hover:text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ISidebarMobile;
