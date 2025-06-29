import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const INotifications = ({ isOpen, setIsOpen, profileComplete, onOpenSettings, notifications }) => {
  const notificationRef = useRef(null);
  const [activeSection, setActiveSection] = useState("notifications");
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const names = {};
      for (const notif of notifications) {
        if (notif.fromUserId && !names[notif.fromUserId]) {
          const userDoc = await getDoc(doc(db, "users", notif.fromUserId));
          if (userDoc.exists()) {
            names[notif.fromUserId] = userDoc.data().name || notif.fromUserId.split("@")[0];
          } else {
            names[notif.fromUserId] = "Unknown";
          }
        }
      }
      setUserNames(names);
    };
    if (notifications.length > 0) fetchUserNames();
  }, [notifications]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div
        className=" rounded-xl  w-full max-w-4xl h-[80vh] flex overflow-hidden "
        ref={notificationRef}
      >
        <div className="w-1/4 bg-gray-100 p-4 rounded-l-xl shadow-inner">
          <ul className="space-y-3">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg  text-lg ${
                  activeSection === "notifications"
                    ? "bg-ArtisansBlue-100 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                } transition-all duration-200`}
                onClick={() => setActiveSection("notifications")}
              >
                Notifications
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg  text-lg ${
                  activeSection === "settings"
                    ? "bg-ArtisansBlue-100 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                } transition-all duration-200`}
                onClick={onOpenSettings}
              >
                Settings
              </button>
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-6 overflow-y-auto bg-white rounded-r-xl shadow-inner">
          {activeSection === "notifications" && (
            <div>
              <h2 className="text-2xl font-bold  text-gray-900 mb-6 border-b border-gray-200 pb-2">
                Notifications
              </h2>
              <ul className="space-y-3  text-sm text-gray-800 ">
                {!profileComplete && (
                  <li>
                    <button
                      className="w-full text-left hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between"
                      onClick={() => {
                        onOpenSettings();
                        setIsOpen(false);
                      }}
                    >
                      <span>Complete Your Profile</span>
                      <span className="text-xs text-red-500">Action Required</span>
                    </button>
                  </li>
                )}
                {notifications.map((notif) => (
                  <li key={notif.id}>
                    <button
                      className="w-full text-left hover:bg-gray-100 px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between"
                      onClick={() => {
                        console.log("Notification clicked:", notif.message);
                        setIsOpen(false);
                      }}
                    >
                      <span>
                        <span className="font-semibold">{userNames[notif.fromUserId] || "Loading..."}</span>{" "}
                        has requested for your services
                      </span>
                      <span className="text-xs text-blue-500">{new Date(notif.timestamp).toLocaleTimeString()}</span>
                    </button>
                  </li>
                ))}
                {notifications.length === 0 && !profileComplete && (
                  <li>
                    <p className="text-gray-500">No new notifications.</p>
                  </li>
                )}
              </ul>
            </div>
          )}
          {activeSection === "settings" && (
            <div>
              <h2 className="text-2xl font-bold  text-gray-900 mb-6 border-b border-gray-200 pb-2">
                Settings
              </h2>
              <p>Redirecting to settings...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default INotifications;