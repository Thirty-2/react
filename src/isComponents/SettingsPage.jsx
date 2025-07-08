import React, { useState, useEffect, useRef } from "react";
import { auth, db, saveUserToFirestore } from "../firebase";
import { FaSpinner } from "react-icons/fa";
import { CustomAlert, INotifications } from "../isComponents";

const SettingsPage = ({ isProfileFormOpen, toggleProfileForm, handleProfileSubmit, handleInputChange, profileData, user, onProfileUpdate, notifications, isNotificationsOpen }) => {
  const [activeSection, setActiveSection] = useState("profile");
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isProfileSaved, setIsProfileSaved] = useState(false); // Track if profile has been saved
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" }); // State for custom alert
  const settingsRef = useRef(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      toggleProfileForm();
    } catch (error) {
      console.error("Logout error:", error);
      showAlert("Failed to log out. Please try again.", "error");
    }
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

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange({
          target: { name: "cvPdf", value: reader.result },
        });
      };
      reader.readAsDataURL(file);
    } else {
      showAlert("Please upload a PDF file.", "error");
    }
  };

  const enhancedHandleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("Saving Changes...");
    try {
      await handleProfileSubmit(e);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const updatedId = profileData.firstName && profileData.lastName
          ? `${profileData.firstName} ${profileData.lastName}`.trim()
          : user.email.split("@")[0]; // Default to email name if no full name
        const updatedProfile = { ...profileData, id: updatedId };
        await saveUserToFirestore(currentUser.uid, updatedProfile);
        onProfileUpdate(updatedProfile); // Pass updated profile to parent
        setIsProfileSaved(true);
      }
      setSaveMessage("Changes Saved!");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch (error) {
      setSaveMessage("Save Failed!");
      console.error("Save error:", error);
      setTimeout(() => setSaveMessage(""), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        toggleProfileForm();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggleProfileForm]);

  if (!isProfileFormOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div
        className="rounded-xl w-full max-w-4xl h-[80vh] flex overflow-hidden"
        ref={settingsRef}
      >
        {saveMessage && (
          <div
            className={`w-full bg-${isSaving ? "ArtisansBlue-100" : saveMessage.includes("Saved") ? "green-500" : "red-500"} text-white p-2 text-center transition-all duration-300 ease-in-out ${
              isSaving ? "animate-pulse" : ""
            }`}
          >
            {isSaving && <FaSpinner className="inline animate-spin mr-2" />}
            {saveMessage}
          </div>
        )}
        <div className="w-1/4 bg-gray-100 p-4 rounded-l-xl shadow-inner">
          <ul className="space-y-3">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg text-lg ${
                  activeSection === "profile"
                    ? "bg-ArtisansBlue-100 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                } transition-all duration-200`}
                onClick={() => setActiveSection("profile")}
              >
                Profile Settings
              </button>
            </li>
            <li>
              <div>
                <button
                  className="px-6 py-2 text-red-500 rounded-lg text-lg cursor-pointer hover:text-red-700 transition-colors"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-6 overflow-y-auto bg-white rounded-r-xl shadow-inner">
          {activeSection === "profile" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                Profile Settings
              </h2>
              <div className="mb-6">
                <div className="flex items-center gap-6">
                  <img
                    src={profileData.profilePic || user.profilePic || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-ArtisansBlue-100"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                  />
                </div>
              </div>
              <form onSubmit={enhancedHandleProfileSubmit} className="space-y-6">
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm bg-white"
                    disabled={isProfileSaved && !!profileData.gender} // Lock only after first save
                    required={!profileData.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {isProfileSaved && profileData.gender && (
                    <p className="text-xs text-gray-500 mt-1">Gender cannot be changed once set.</p>
                  )}
                </div>
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={profileData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="regionalAddress">
                    Address
                  </label>
                  <input
                    type="text"
                    id="regionalAddress"
                    name="regionalAddress"
                    value={profileData.regionalAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="dateOfBirth">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="profession">
                    Profession
                  </label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={profileData.profession}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="bio">
                    Biography
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="cvPdf">
                    Upload CV (PDF)
                  </label>
                  <input
                    type="file"
                    id="cvPdf"
                    name="cvPdf"
                    accept="application/pdf"
                    onChange={handleCvChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-base text-gray-700 mb-2" htmlFor="socialMediaHandle">
                    Social Media Handle
                  </label>
                  <input
                    type="text"
                    id="socialMediaHandle"
                    name="socialMediaHandle"
                    value={profileData.socialMediaHandle || ""}
                    onChange={handleInputChange}
                    placeholder="Copy and paste your social media link"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ArtisansBlue-100 focus:border-ArtisansBlue-100 text-sm"
                  />
                </div>
                <div className="flex justify-end gap-6 mt-8">
                  <button
                    type="button"
                    className="px-6 py-2 text-red-600 text-lg hover:text-red-800 transition-colors"
                    onClick={toggleProfileForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-ArtisansBlue-100 text-white rounded-lg text-lg hover:bg-ArtisansBlue-200 transition-colors shadow-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      {alert.show && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={hideAlert}
        />
      )}
    </div>
  );
};

export default SettingsPage;