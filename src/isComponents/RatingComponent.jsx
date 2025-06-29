import React, { useState, useEffect } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";

const RatingComponent = ({ artisanId, rating: initialRating, userId, readOnly = false }) => {
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(initialRating || 0);
  const MIN_RATINGS = 5;
  const BASELINE_RATING = 1.0;

  useEffect(() => {
    const userRef = doc(db, "users", artisanId);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Fetched user data:", data);
        if (data.rating !== undefined) {
          setAverageRating(parseFloat(data.rating));
        } else {
          const ratings = data.ratings?.ratings || [];
          const voteCount = ratings.length;
          const ratingSum = ratings.reduce((sum, r) => sum + r.value, 0);
          const rawAverage = voteCount > 0 ? ratingSum / voteCount : initialRating || BASELINE_RATING;
          const weightedRating = (voteCount * rawAverage + MIN_RATINGS * BASELINE_RATING) / (voteCount + MIN_RATINGS);
          setAverageRating(weightedRating);
        }
        // Check if current user has rated
        const ratings = data.ratings?.ratings || [];
        const userRate = ratings.find((r) => r.userId === userId);
        setUserRating(userRate ? userRate.value : 0);
      } else {
        setAverageRating(initialRating || 0);
        setUserRating(0);
      }
    }, (error) => {
      console.error("Error fetching rating:", error);
      setAverageRating(initialRating || 0);
      setUserRating(0);
    });

    return () => unsubscribe();
  }, [artisanId, initialRating, userId]);

  const handleRate = async (value) => {
    if (!userId || value < 1 || value > 5 || readOnly) return;
    setUserRating(value);
    try {
      const userRef = doc(db, "users", artisanId);
      await updateDoc(userRef, {
        "ratings.ratings": arrayUnion({ userId, value, timestamp: new Date() }),
      });
      // Note: onSnapshot will handle updating averageRating
      // Update weighted average
      const docSnap = await getDoc(userRef);
      const data = docSnap.data();
      const ratings = data.ratings?.ratings || [];
      const voteCount = ratings.length;
      const ratingSum = ratings.reduce((sum, r) => sum + r.value, 0);
      const rawAverage = voteCount > 0 ? ratingSum / voteCount : value;
      const weightedRating = (voteCount * rawAverage + MIN_RATINGS * BASELINE_RATING) / (voteCount + MIN_RATINGS);
      await updateDoc(userRef, { rating: weightedRating }, { merge: true });
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<BsStarFill key={i} className="text-yellow-400" onClick={() => handleRate(i)} />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<BsStarHalf key={i} className="text-yellow-400 ml-0.5" onClick={() => handleRate(i)} />);
      } else {
        stars.push(<BsStar key={i} className="text-yellow-400 ml-0.5" onClick={() => handleRate(i)} />);
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      {averageRating === 0 && !readOnly ? (
        <span className="text-sm text-gray-400">No rating yet</span>
      ) : (
        <>
          <div className="flex">{renderStars(averageRating)}</div>
        </>
      )}
    </div>
  );
};

export default RatingComponent;