import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { RatingComponent, CustomAlert } from "../isComponents";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { EyeIcon, PlusCircle, X } from "lucide-react";

const IArtisans = ({ setShowExpandedArtisans, userId }) => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "info",
  }); // State for custom alert
  const artisansPerPage = 6;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const fetchedArtisans = snapshot.docs.map((doc) => {
          const data = doc.data();
          const [firstName, lastName] = data.name
            ? data.name.split(" ")
            : ["Unknown", ""];
          return {
            id: doc.id,
            firstName,
            lastName,
            name: `${firstName} ${lastName}`.trim() || "Unknown User",
            gender: data.gender || "unknown",
            profession: data.profession || "Unknown",
            profilePic: data.profilePic || "https://via.placeholder.com/80",
            rating: data.rating !== undefined ? parseFloat(data.rating) : 0,
            age: data.age || null,
            dateOfBirth: data.dateOfBirth || null,
            regionalAddress: data.regionalAddress || null,
            bio: data.bio || "No biography available",
            cvPdf: data.cvPdf || null,
          };
        });
        setArtisans(fetchedArtisans);
        setLoading(false);
      },
      (err) => {
        setError("Failed to load users. Please try again later.");
        console.error("Snapshot error:", err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const trimText = (text, maxLength) =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + "...";

  const indexOfLastArtisan = currentPage * artisansPerPage;
  const indexOfFirstArtisan = indexOfLastArtisan - artisansPerPage;
  const currentArtisans = artisans.slice(
    indexOfFirstArtisan,
    indexOfLastArtisan
  );
  const totalPages = Math.ceil(artisans.length / artisansPerPage);

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);
  const nextPage = useCallback(
    () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
    [totalPages]
  );
  const prevPage = useCallback(
    () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
    []
  );

  const handleViewArtisan = useCallback(
    (artisan) => setSelectedArtisan(artisan),
    []
  );
  const handleCloseModal = useCallback(() => setSelectedArtisan(null), []);

  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  const handleRequestArtisan = async (artisanId) => {
    if (userId === artisanId) {
      showAlert("You cannot request yourself!", "error");
      return;
    }
    try {
      const requestData = {
        type: "request",
        fromUserId: userId,
        toUserId: artisanId,
        message: `${userId} has requested your services!`,
        timestamp: new Date().toISOString(),
        read: false,
      };
      await setDoc(
        doc(db, "notifications", `${userId}_${artisanId}_${Date.now()}`),
        requestData
      );
      showAlert(
        "Request sent! Notification will appear for the artisan.",
        "success"
      );
    } catch (err) {
      showAlert("Failed to send request. Please try again.", "error");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="p-4 text-center flex justify-center items-center h-full">
        <svg
          className="animate-spin h-8 w-8 text-gray-600 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
        <span className="ml-2">Loading artisans...</span>
      </div>
    );
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="w-full rounded-IHome h-[100vh]">
      <div className="flex flex-col justify-between h-full p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {currentArtisans.map((user) => (
            <div
              key={user.id}
              className="bg-stone-100 shadow-sm rounded-lg py-3 px-2 cursor-pointer"
              onClick={() => handleViewArtisan(user)}
            >
              <div className="flex items-center justify-between min-lg:gap-1">
                <img
                  src={user.profilePic}
                  alt={`${user.name}'s profile picture`}
                  className="w-14 h-14 object-cover bg-black rounded-full shadow-md"
                />
                <div className="flex flex-col gap-1">
                  <p className="bg-ButterYellow w-fit px-4 rounded-sm font-semibold text-sm">
                    {user.profession}
                  </p>
                  <h3 className="text-md font-bold text-stone-800 drk:text-white">
                    {trimText(user.name, 20)}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">
                      <RatingComponent
                        artisanId={user.id}
                        rating={user.rating}
                        userId={userId}
                        readOnly={true}
                      />
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 text-sm">
                  <button
                    type="button"
                    className="border border-stone-400 rounded-md p-1 w-full text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewArtisan(user);
                    }}
                  >
                    view
                    <EyeIcon className="inline-block ml-2" size={13} />
                  </button>
                  <button
                    type="button"
                    className="bg-black text-white rounded-md p-1 w-fit"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleRequestArtisan(user.id);
                    }}
                  >
                    Request
                    <PlusCircle className="inline-block ml-2" size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedArtisan && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-2 rounded-2xl shadow-lg w-full max-w-lg flex flex-col items-center relative">
              <div className="bg-ArtisansBlue w-full rounded-2xl h-30 flex justify-between">
                <div></div>
                <X 
                onClick={handleCloseModal}
                className="m-2 hover:scale-105 hover:text-red-400 transition-all duration-200 ease-in-out text-white"/>
              </div>

              <div className="mt-[-10%] flex flex-col items-center gap-2 mb-10">
                <div className="items-center flex flex-col gap-1">
                  <div className="bg-white p-1.5 w-fit rounded-full ">
                    <img
                      src={selectedArtisan.profilePic}
                      alt={`${selectedArtisan.name}'s profile picture`}
                      className="w-20 h-20 object-cover bg-black rounded-full shadow-md"
                    />
                  </div>
                  <h2 className="text-sm text-stone-500 font-light">
                    {selectedArtisan.email}
                  </h2>
                  <h2 className="text-2xl font-bold mb-4 capitalize">
                    {selectedArtisan.name}
                  </h2>
                </div>

                <div className="flex text-sm gap-2 font-light">
                  <p className="">{selectedArtisan.profession}</p>-
                  <p>4 years of experience</p>
                </div>

                <div className="flex gap-2 font-light items-center">
                  <p>{selectedArtisan.regionalAddress || "N/A"}</p>
                  |
                  <RatingComponent
                        artisanId={selectedArtisan.id}
                        rating={selectedArtisan.rating}
                        userId={selectedArtisan}
                        readOnly={true}
                      />
                </div>

                <p className="italic">"{selectedArtisan.bio}"</p>

                {selectedArtisan.cvPdf && (
                  <a
                    href={selectedArtisan.cvPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 block"
                  >
                    View CV
                  </a>
                )}

                <button
                    type="button"
                    className="bg-black text-white rounded-md px-3 py-1 w-fit"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleRequestArtisan(selectedArtisan.id);
                    }}
                  >
                    Request
                    <PlusCircle className="inline-block ml-2" size={13} />
                  </button>
              </div>
            </div>
          </div>
        )}
        {alert.show && (
          <CustomAlert
            message={alert.message}
            type={alert.type}
            onClose={hideAlert}
          />
        )}
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 w-fit font-ComicNeue rounded-sm text-sm"
            onClick={() => setShowExpandedArtisans(false)}
          >
            Close
          </button>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

IArtisans.propTypes = {
  setShowExpandedArtisans: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default IArtisans;