import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import CustomAlert from "./CustomAlert";

const INotifications = ({ isOpen, setIsOpen, profileComplete, onOpenSettings, notifications }) => {
  const notificationRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [localNotifications, setLocalNotifications] = useState(
    notifications.map((notif) => ({ ...notif, read: notif.read || false }))
  );

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
    const fetchUserData = async () => {
      const data = {};
      try {
        for (const notif of notifications) {
          if (notif.fromUserId && !data[notif.fromUserId]) {
            const userDoc = await getDoc(doc(db, "users", notif.fromUserId));
            if (userDoc.exists()) {
              data[notif.fromUserId] = {
                name: userDoc.data().name || notif.fromUserId.split("@")[0],
                profilePic: userDoc.data().profilePic || "https://via.placeholder.com/40?text=User",
              };
            } else {
              data[notif.fromUserId] = {
                name: "Unknown",
                profilePic: "https://via.placeholder.com/40?text=User",
              };
            }
          }
        }
        setUserData(data);
      } catch (err) {
        setError("Failed to load user data for notifications.");
        console.error("Error fetching user data:", err);
      }
    };
    if (notifications.length > 0) fetchUserData();
  }, [notifications]);

  const handleMarkAllRead = () => {
    setLocalNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const handleNotificationClick = (notif) => {
    setLocalNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    console.log("Notification clicked:", notif.message);
    setIsOpen(false);
  };

  const closeAlert = () => {
    setError(null);
  };

  if (!isOpen) return null;

  const unreadCount = localNotifications.filter((notif) => !notif.read).length + (profileComplete ? 0 : 1);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-Quicksand">
      <div
        className="bg-white drk:bg-gray-800 rounded-xl w-full max-w-lg p-5 flex flex-col gap-6 shadow-lg"
        ref={notificationRef}
      >
        {error && (
          <CustomAlert
            message={error}
            type="error"
            duration={2000}
            onClose={closeAlert}
          />
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 drk:text-gray-200">
            Notifications{" "}
            <span className="text-blue-800">
              
              {unreadCount}
            </span>
          </h1>
          <button
            onClick={handleMarkAllRead}
            className="font-thin text-sm bg-blue-400 hover:bg-blue-600 p-1 rounded text-white drk:bg-blue-600 drk:hover:bg-blue-800 transition-colors duration-300"
          >
            Mark all as read
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {!profileComplete && (
            <div
              className="flex gap-3 p-3 rounded bg-slate-100 drk:bg-gray-700 cursor-pointer"
              onClick={() => {
                onOpenSettings();
                setIsOpen(false);
              }}
            >
              <img
                src="https://via.placeholder.com/40?text=Profile"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col flex-1">
                <p className="text-sm text-gray-800 drk:text-gray-200">
                  <span className="font-bold hover:text-blue-800 drk:hover:text-blue-400 cursor-pointer">
                    Complete Your Profile
                  </span>
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                </p>
                <p className="text-xs text-gray-400 drk:text-gray-500">
                  Action Required
                </p>
              </div>
            </div>
          )}
          {localNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex gap-3 p-3 rounded ${
                notif.read ? "bg-white drk:bg-gray-800" : "bg-slate-100 drk:bg-gray-700"
              } cursor-pointer`}
              onClick={() => handleNotificationClick(notif)}
            >
              <img
                src={userData[notif.fromUserId]?.profilePic || "https://via.placeholder.com/40?text=User"}
                alt={userData[notif.fromUserId]?.name || "User"}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col flex-1">
                <p className="text-sm text-gray-800 drk:text-gray-200">
                  <span className="font-bold hover:text-blue-800 drk:hover:text-blue-400 cursor-pointer">
                    {userData[notif.fromUserId]?.name || "Loading..."}
                  </span>{" "}
                  {notif.message}
                  {!notif.read && (
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                  )}
                </p>
                <p className="text-xs text-gray-400 drk:text-gray-500">
                  {new Date(notif.timestamp).toLocaleString()}
                </p>
                {notif.message.includes("sent you a private message") && (
                  <p className="mt-2 p-3 border border-gray-300 rounded text-sm text-gray-800 drk:text-gray-200 hover:bg-slate-100 drk:hover:bg-gray-600 cursor-pointer">
                    {notif.messageContent || "No message content available."}
                  </p>
                )}
                {notif.message.includes("commented on your picture") && (
                  <img
                    src="https://via.placeholder.com/40?text=Image"
                    alt="Commented image"
                    className="w-10 h-10 mt-2"
                  />
                )}
              </div>
            </div>
          ))}
          {localNotifications.length === 0 && profileComplete && (
            <p className="text-gray-500 drk:text-gray-400 text-sm">
              No new notifications.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default INotifications;