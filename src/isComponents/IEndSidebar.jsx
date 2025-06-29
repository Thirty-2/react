import React, { useState, useEffect } from "react";
import { BsViewList } from "react-icons/bs";
import { WW, MW } from "../assets/images";
import { RatingComponent } from "../isComponents";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

const IEndSidebar = ({ user, jobCount, activeProjects, userId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      try {
        const fetchedUsers = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            name: doc.data().name || "Unknown User",
            profession: doc.data().profession || "",
            rating: doc.data().rating !== undefined ? parseFloat(doc.data().rating) : 0,
            profilePic: doc.data().profilePic || "https://via.placeholder.com/40",
          }))
          .filter((user) => [4.0, 5.0].includes(user.rating))
          .sort((a, b) => b.rating - a.rating);
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (err) {
        setError("Failed to load users. Please try again later.");
        console.error("Snapshot error:", err);
        setLoading(false);
      }
    }, (err) => {
      setError("Failed to load users. Please try again later.");
      console.error("Snapshot error:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const auth = getAuth();
  const googleName = auth.currentUser?.displayName || "Guest";

  if (loading) return <div className="p-2 text-center">Loading users...</div>;
  if (error) return <div className="p-2 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-Asphalt rounded-lg p-2 text-white flex flex-col h-full justify-between w-120 max-lg:w-full max-md:h-full min-lg:h-[89vh]">
      <div className="p-4 rounded-lg flex flex-col gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold">
            Hello <span>{`${user.firstName} ${user.lastName}`.trim() || user.name || googleName}!</span>
          </h1>
        </div>
        <div className="flex flex-col justify-between gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-md ">Job Count</h1>
            <span className="font-bold ">{jobCount}</span>
          </div>
          <p className="">
            Active Jobs: <span className="font-bold">{activeProjects}</span>
          </p>
          <div className="">
            <RatingComponent
              artisanId={user.id}
              rating={user.rating || 0}
              userId={userId}
            />
          </div>
        </div>
      </div>
      <div className="bg-stone-100 p-2 rounded-lg flex justify-center shadow-md w-fit">
        <img src={user.gender === "male" ? MW : WW} alt="" />
      </div>
      <div className="rounded-lg p-4 space-y-3">
        <h1 className="font-semibold  text-ArtisansBlue-100">
          Highly Recommended Artisans
        </h1>
        <div className="grid grid-cols-5">
          {users.length === 0 ? (
            <p className="text-sm text-gray-400">
              None Yet
            </p>
          ) : (
            users.slice(0, 5).map((userItem) => (
              <div
                key={userItem.id}
                className="flex flex-col justify-center items-center gap-2 group cursor-pointer relative"
              >
                <img
                  src={userItem.profilePic}
                  alt={`${userItem.name}'s profile`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="hidden group-hover:block absolute bottom-[-1rem] bg-opacity-50 text-xs">
                  <RatingComponent
                    artisanId={userItem.id}
                    rating={userItem.rating}
                    userId={userId}
                    readOnly={true}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 text-center p-2">
        <p className="font-thin  text-sm">
          Updated: {new Date().toLocaleDateString()}
        </p>
        <button className="bg-ArtisansBlue hover:bg-blue-600 text-white px-6 py-2 rounded-md  text-sm transition-colors duration-300 flex gap-2 items-center justify-center w-full">
          <BsViewList /> Detailed Report
        </button>
      </div>
    </div>
  );
};

export default IEndSidebar;