import React, { useState, useEffect, useRef } from "react";
import {
  StockpotNF,
  CarpenterNF,
  HandymanNF,
  DryCleaningNF,
  Settings,
  NotificationNF,
  CleaningNF,
} from "../assets/icons";
import { LogoB } from "../assets/images";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

const IHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const notificationRef = useRef(null);
  const settingsRef = useRef(null);

  const handleSearchBarBg = () => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.style.background = "white";
  };

  useEffect(() => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.style.background = "stone-100";
  }, []);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className=" p-2 pt-0 pb-4 flex justify-between items-center font-ComicNeue relative border-b border-stone-200 ">
      {/* Left Section: Logo or Brand */}
      <div className="font-black text-2xl max-md:text-lg cursor-pointer text-stone-600 hover:text-stone-900 transition-colors duration-200 ease-in-out flex items-center gap-4">
        <div className="flex w-fit gap-2">
            <img src={CarpenterNF} alt="Carpenter" />
            <img src={StockpotNF} alt="Cook" />
            <img src={DryCleaningNF} alt="Dry Cleaning" />
            <img src={HandymanNF} alt="Handyman" />
            <img src={CleaningNF} alt="Cleaning" />
          </div>
      </div>

      {/* Right Section: Search and Settings */}
      <div className="flex gap-5 items-center">
        {/* Mobile Search Icon */}
        <MdSearch
          size={25}
          className="min-md:hidden cursor-pointer"
          onClick={toggleSearch}
        />

        {/* Search Bar (Mobile Panel) */}
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-transform duration-300 ease-in-out ${
            isSearchOpen ? "translate-x-0" : "translate-x-full"
          } min-md:hidden`}
        >
          <div className="p-6 rounded-IHome w-full max-w-md self-start mt-12">
            <div className="flex items-center justify-center w-fit mx-auto rounded-full shadow-md bg-stone-100 p-1 hover:bg-white transition-colors duration-500 ease-in-out">
              <input
                type="text"
                id="searchInput"
                placeholder="Search for services, artisans, etc."
                className="px-4 rounded-l-full outline-none placeholder:text-stone-500 bg-transparent w-64"
                onChange={handleSearchBarBg}
              />
              <button
                className="p-2 rounded-full bg-ArtisansBlue-100 hover:bg-ArtisansBlue-200 transition-colors duration-200 ease-in-out cursor-pointer"
                onClick={() => alert("Search initiated")}
              >
                <MdSearch size={20} className="text-white" />
              </button>
            </div>
            <button
              className="mt-4 text-red-500 px-4 py-2 rounded-full font-semibold font-ComicNeue text-sm"
              onClick={toggleSearch}
            >
              Close
            </button>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="max-md:hidden">
          <div className="flex items-center justify-center w-fit mx-auto rounded-full shadow-sm bg-stone-100 p-1 hover:bg-white transition-colors duration-500 ease-in-out">
            <input
              type="text"
              id="searchInput"
              placeholder="Search for services, artisans, etc."
              className="px-4 rounded-l-full outline-none placeholder:text-stone-500 bg-transparent w-64"
              onChange={handleSearchBarBg}
            />
            <button
              className="p-2 rounded-full bg-ArtisansBlue-100 hover:bg-ArtisansBlue-200 transition-colors duration-200 ease-in-out cursor-pointer"
              onClick={() => alert("Search initiated")}
            >
              <MdSearch size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Notification Dropdown */}
        <div className="relative group" ref={notificationRef}>
          <img
            src={NotificationNF}
            alt="Notifications"
            className="cursor-pointer transition-transform"
            onClick={toggleNotifications}
          />
          <div
            className={`absolute bg-gradient-to-br from-stone-100 to-gray-50 dark:from-stone-800 dark:to-gray-900 shadow-lg rounded-lg bottom-[-11.7rem] right-0 p-4 z-20 w-64 ${
              isNotificationsOpen ? "block" : "hidden"
            } animate-fadeIn`}
          >
            <ul className="space-y-3 font-ComicNeue text-sm text-gray-800 dark:text-gray-200">
              <li>
                <button
                  className="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between"
                  onClick={() => {
                    console.log("Open New Job Alert");
                    setIsNotificationsOpen(false);
                  }}
                >
                  <span>New Job Alert</span>
                  <span className="text-xs text-blue-500">Just now</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between"
                  onClick={() => {
                    console.log("Open Artisan Application");
                    setIsNotificationsOpen(false);
                  }}
                >
                  <span>Artisan Application</span>
                  <span className="text-xs text-green-500">2h ago</span>
                </button>
              </li>
              <li className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <button
                  className="w-full text-left text-blue-600 hover:text-blue-700 font-semibold px-3 py-2 rounded-lg transition-colors"
                  onClick={() => {
                    console.log("View All Notifications");
                    setIsNotificationsOpen(false);
                  }}
                >
                  View All
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Settings Dropdown */}
        <div className="relative group" ref={settingsRef}>
          <img
            src={Settings}
            alt="Settings"
            className="cursor-pointer transition-transform"
            onClick={toggleSettings}
          />
          <div
            className={`absolute bg-gradient-to-br from-stone-100 to-gray-50 dark:from-stone-800 dark:to-gray-900 shadow-lg rounded-lg bottom-[-11.7rem] right-0 p-4 z-20 w-64 ${
              isSettingsOpen ? "block" : "hidden"
            } animate-fadeIn`}
          >
            <ul className="space-y-3 font-ComicNeue text-sm text-gray-800 dark:text-gray-200">
              <li>
                <button
                  className="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between"
                  onClick={() => {
                    console.log("Open Notification Settings");
                    setIsSettingsOpen(false);
                  }}
                >
                  Notification Settings
                  <span className="text-xs text-gray-500">Manage alerts</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between"
                  onClick={() => {
                    console.log("Open Privacy Settings");
                    setIsSettingsOpen(false);
                  }}
                >
                  Privacy Settings
                  <span className="text-xs text-gray-500">Control data</span>
                </button>
              </li>
              <li className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <button
                  className="w-full text-left text-red-600 hover:text-red-700 font-semibold px-3 py-2 rounded-lg transition-colors"
                  onClick={() => {
                    console.log("Logout");
                    setIsSettingsOpen(false);
                  }}
                >
                  LOG OUT
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default IHeader;