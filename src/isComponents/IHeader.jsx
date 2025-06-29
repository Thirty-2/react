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
import { MdSearch } from "react-icons/md";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, onSnapshot, collection } from "firebase/firestore";
import SettingsPage from "./SettingsPage";
import INotifications from "./INotifications";

const IHeader = ({ setShowSettings, showSettings, user }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [profileComplete, setProfileComplete] = useState(true);
  const [profileData, setProfileData] = useState({
    gender: "",
    phone: "",
    age: "",
    regionalAddress: "",
    dateOfBirth: "",
    profession: "",
    profilePic: "",
    firstName: "",
    lastName: "",
    cvPdf: "",
  });
  const [notifications, setNotifications] = useState([]);

  const notificationRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    const checkProfile = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const [firstName, lastName] = data.name ? data.name.split(" ") : ["", ""];
          const isComplete =
            data.gender &&
            data.phone &&
            data.age &&
            data.regionalAddress &&
            data.dateOfBirth &&
            data.profession;
          setProfileComplete(isComplete);
          setProfileData({
            gender: data.gender || "",
            phone: data.phone || "",
            age: data.age || "",
            regionalAddress: data.regionalAddress || "",
            dateOfBirth: data.dateOfBirth || "",
            profession: data.profession || "",
            profilePic: data.profilePic || currentUser.photoURL || "",
            firstName: firstName || "",
            lastName: lastName || "",
            cvPdf: data.cvPdf || "",
            id: data.id || user.email.split("@")[0], // Initialize id from existing data or email name
          });
        } else {
          setProfileComplete(false);
        }
      }
    };
    checkProfile();

    const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const userNotifications = snapshot.docs
        .filter((doc) => doc.data().toUserId === user?.id)
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(userNotifications);
    }, (err) => console.error("Notification error:", err));

    return () => unsubscribe();
  }, [user?.id]);

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

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        if (!/^\+?\d{10,15}$/.test(profileData.phone)) {
          alert("Invalid phone number (10-15 digits required).");
          return;
        }
        if (profileData.age < 18 || profileData.age > 100) {
          alert("Age must be between 18 and 100.");
          return;
        }
        const dob = new Date(profileData.dateOfBirth);
        const today = new Date();
        if (dob >= today) {
          alert("Date of birth must be in the past.");
          return;
        }
        if (profileData.profession.length < 2) {
          alert("Profession must be at least 2 characters long.");
          return;
        }

        const userDoc = doc(db, "users", currentUser.uid);
        const updatedId = profileData.firstName && profileData.lastName
          ? `${profileData.firstName} ${profileData.lastName}`.trim()
          : user.email.split("@")[0]; // Default to email name
        await setDoc(userDoc, {
          ...profileData,
          id: updatedId,
          name: `${profileData.firstName} ${profileData.lastName}`.trim() || user.email.split("@")[0],
          role: profileData.profession ? "artisan" : "customer",
          rating: profileData.rating || 0,
        }, { merge: true });

        const isComplete =
          profileData.gender &&
          profileData.phone &&
          profileData.age &&
          profileData.regionalAddress &&
          profileData.dateOfBirth &&
          profileData.profession;
        setProfileComplete(isComplete);
        setShowSettings(false);
        alert("Profile updated successfully! GET IN JOOR!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange({
          target: { name: "profilePic", value: reader.result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="p-2 pt-0 pb-4 flex justify-between items-center relative border-b border-stone-200">
      <div className="font-black text-2xl max-md:text-lg cursor-pointer text-stone-600 hover:text-stone-900 transition-colors duration-200 ease-in-out flex items-center gap-4">
        <div className="flex w-fit gap-2">
          <img src={CarpenterNF} alt="Carpenter" />
          <img src={StockpotNF} alt="Cook" />
          <img src={DryCleaningNF} alt="Dry Cleaning" />
          <img src={HandymanNF} alt="Handyman" className="max-md:hidden" />
          <img src={CleaningNF} alt="Cleaning" className="max-md:hidden" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <MdSearch
          size={25}
          className="min-md:hidden cursor-pointer"
          onClick={toggleSearch}
        />
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
              className="mt-4 text-red-500 px-4 py-2 rounded-full font-semibold  text-sm"
              onClick={toggleSearch}
            >
              Close
            </button>
          </div>
        </div>
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
              <MdSearch size={18} className="text-white" />
            </button>
          </div>
        </div>
        <div className="relative group" ref={notificationRef}>
          <img
            src={NotificationNF}
            alt="Notifications"
            className="cursor-pointer transition-transform"
            onClick={toggleNotifications}
          />
          <INotifications
            isOpen={isNotificationsOpen}
            setIsOpen={setIsNotificationsOpen}
            profileComplete={profileComplete}
            onOpenSettings={() => {
              setShowSettings(true);
              setIsNotificationsOpen(false);
            }}
            notifications={notifications}
          />
        </div>
        <div className="relative group" ref={settingsRef}>
          <img
            src={Settings}
            alt="Settings"
            className="cursor-pointer transition-transform hover:scale-110"
            onClick={() => {
              setShowSettings(true);
              setIsSettingsOpen(false);
            }}
          />
        </div>
      </div>
      {showSettings && (
        <SettingsPage
          isProfileFormOpen={showSettings}
          toggleProfileForm={() => setShowSettings(false)}
          handleProfileSubmit={handleProfileSubmit}
          handleInputChange={handleInputChange}
          profileData={profileData}
          user={user}
          onProfileUpdate={(updatedProfile) => {
            setProfileData(updatedProfile);
            setProfileComplete(
              updatedProfile.gender &&
              updatedProfile.phone &&
              updatedProfile.age &&
              updatedProfile.regionalAddress &&
              updatedProfile.dateOfBirth &&
              updatedProfile.profession
            );
          }}
        />
      )}
    </header>
  );
};

export default IHeader;