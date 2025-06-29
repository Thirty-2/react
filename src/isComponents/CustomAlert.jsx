import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

const CustomAlert = ({ message, type = "info", duration = 2000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getStyle = () => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-green-500 to-green-700 text-white";
      case "error":
        return "bg-gradient-to-r from-red-500 to-red-700 text-white";
      case "info":
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-700 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        );
      case "error":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        );
      case "info":
      default:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`p-4 rounded-md shadow-lg border border-gray-300 ${getStyle()} transform transition-all duration-300 ease-in-out animate-slideIn flex items-center justify-between space-x-4`}
      >
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {getIcon()}
          </svg>
          <p className="text-sm font-ComicNeue text-center">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

CustomAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default CustomAlert;