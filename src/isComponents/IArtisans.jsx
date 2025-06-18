import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const IArtisans = ({ artisans, setShowExpandedArtisans }) => {
  // Generate star ratings dynamically
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<BsStarFill key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<BsStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<BsStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="p-4 w-full rounded-IHome font-ComicNeue max-h-[90vh]">
      <div className="flex flex-col justify-between h-full p-2">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {artisans.map((artisan, index) => (
              <div
                key={index}
                className="bg-stone-100 drk:bg-ArtisansAsh-300 px-2 py-10 rounded-xl shadow-md flex flex-col items-center text-center hover:scale-102 transition-scale duration-300"
              >
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={artisan.profilePic || "https://via.placeholder.com/80"}
                    alt={`${artisan.name}'s profile picture`}
                    className="w-20 h-20  object-cover"
                  />

                  <div className="flex-1 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 drk:text-white">{artisan.name}</h3>
                    <p className="text-sm text-gray-600 drk:text-stone-300">{artisan.profession}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-700"><span className="flex items-center gap-1">{renderStars(artisan.rating)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 w-fit font-ComicNeue rounded-sm text-sm"
            onClick={() => setShowExpandedArtisans(false)}
          >
            Close
          </button>
      </div>
    </div>
  );
};

export default IArtisans;