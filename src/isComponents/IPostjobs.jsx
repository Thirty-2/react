import React, { useState, useEffect } from "react";
import { Edit, Plus, X } from "lucide-react";
import { PF } from "../assets/images";
import { CustomAlert } from "../isComponents";
import { db, auth } from "../firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

const IPostjobs = ({ setShowPostJobForm }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    jobTitle: "",
    employmentType: "Full time",
    remoteWorkOptions: "No",
    levelOfExperience: "",
    jobLocation: "",
    position: "",
    jobCategory: "",
    description: "",
    openPositions: 1,
    gender: [], // Array to store selected genders
    cvrequirement: "Not Required", // Default to "Not Required"
    jobprofilePic: "", // Field for image data URL
    paymentAmount: "", // New field for payment amount
  });
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });

  useEffect(() => {
    const fetchUserProfilePic = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setFormData((prev) => ({
            ...prev,
            jobprofilePic: userSnap.data().profilePic || prev.jobprofilePic || "",
          }));
        }
      }
    };
    fetchUserProfilePic();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      const newGender = value === "Male" || value === "Female" ? value : null;
      setFormData((prev) => {
        const updatedGender = checked
          ? [...prev.gender, newGender]
          : prev.gender.filter((g) => g !== newGender);
        return { ...prev, gender: updatedGender };
      });
    } else if (name === "cvrequirement") {
      setFormData((prev) => ({ ...prev, cvrequirement: value === "cvRequired" ? "Required" : "Not Required" }));
    } else if (type === "file" && files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, jobprofilePic: reader.result }));
        };
        reader.readAsDataURL(file);
      } else {
        showAlert("Please upload a valid image file.", "error");
      }
    } else {
      setFormData((prev) => {
        const updated = { ...prev, [name]: value };
        if (name === "position") {
          updated.jobTitle = value.trim(); // Trim jobTitle when position changes
        }
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.jobTitle.trim() || !formData.levelOfExperience || !formData.jobLocation || !formData.position || !formData.jobCategory || !formData.description.trim() || !formData.paymentAmount) {
        showAlert("Please fill all required fields, including payment amount.", "error");
        return;
      }
      if (isNaN(formData.paymentAmount) || formData.paymentAmount <= 0) {
        showAlert("Please enter a valid payment amount greater than 0.", "error");
        return;
      }

      const currentUser = auth.currentUser;
      const postedBy = currentUser?.displayName || currentUser?.email?.split("@")[0] || "Unknown User";

      await addDoc(collection(db, "jobs"), {
        ...formData,
        jobTitle: formData.jobTitle.trim(),
        description: formData.description.trim(),
        postedBy,
        postedDate: new Date().toISOString(),
        status: "open",
        openPositions: parseInt(formData.openPositions) || 1,
        paymentAmount: parseFloat(formData.paymentAmount), // Store as a number
        profilePic: formData.jobprofilePic || (currentUser && currentUser.photoURL) || "https://via.placeholder.com/48?text=Logo", // Use uploaded image or user's photoURL
      });

      showAlert("Job posted successfully!", "success");
      setShowPostJobForm(false);
    } catch (error) {
      console.error("Error posting job:", error);
      showAlert("Failed to post job. Please try again.", "error");
    }
  };

  const handleClose = () => {
    setShowPostJobForm(false);
  };

  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 h-screen">
      <div className="ark:bg-gray-800 p-6 w-full h-full max-w-[80%] max-lg:max-w-[100%] mx-0 flex flex-col">
        <div className="flex mb-6 space-x-4 border-b border-gray-200 ark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === "details" ? "border-b-3 border-ArtisansBlue-100 text-ArtisansBlue" : "text-gray-500 drk:text-gray-400"}`}
            onClick={() => setActiveTab("details")}
          >
            <h1>Details</h1>
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === "description" ? "border-b-3 border-ArtisansBlue-100 text-ArtisansBlue" : "text-gray-500 drk:text-gray-400"}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === "publish" ? "border-b-3 border-ArtisansBlue-100 text-ArtisansBlue" : "text-gray-500 drk:text-gray-400"}`}
            onClick={() => setActiveTab("publish")}
          >
            Post
          </button>
        </div>
        <div className="flex flex-col min-lg:flex-row h-full items-center divide-y-1 min-lg:divide-x-1 divide-stone-300 overflow-y-auto gap-10 min-lg:gap-0">
          <div className="w-full h-full min-h-full">
            {activeTab === "details" && (
              <div className="px-4 flex flex-col justify-between bg-white drk:bg-gray-700 rounded-lg h-full ">
                <div className="">
                  <h3 className="text-lg font-medium drk:text-gray-300">Job Details</h3>
                  <p className="text-sm text-stone-500 drk:text-gray-400">This will appear to candidates.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-800 drk:text-gray-300">Employment type</label>
                  <div className="flex space-x-3 mt-2">
                    {["Full time", "Part time", "Full/Part time"].map((type) => (
                      <button
                        key={type}
                        className={`px-4 py-2 text-sm rounded-md border border-stone-200 ${formData.employmentType === type ? "bg-blue-200" : "text-black"}`}
                        onClick={() => handleChange({ target: { name: "employmentType", value: type } })}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-800 drk:text-gray-300">Remote work options</label>
                  <div className="flex space-x-2 mt-2">
                    {["No", "Hybrid", "Fully remote"].map((option) => (
                      <button
                        key={option}
                        className={`px-4 py-2 text-sm rounded-md border border-stone-200 ${formData.remoteWorkOptions === option ? "bg-blue-200" : "text-black"}`}
                        onClick={() => handleChange({ target: { name: "remoteWorkOptions", value: option } })}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-stone-800 drk:text-gray-300">Job Title</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Enter job title/position"
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-800 drk:text-gray-300">Experience Level</label>
                    <select
                      name="levelOfExperience"
                      value={formData.levelOfExperience}
                      onChange={handleChange}
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    >
                      <option value="">Select level</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5 years and above">5 years and above</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dar:text-gray-300">Location</label>
                    <input
                      type="text"
                      name="jobLocation"
                      value={formData.jobLocation}
                      onChange={handleChange}
                      placeholder="Job Location"
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dar:text-gray-300">Open Positions</label>
                    <input
                      type="number"
                      name="openPositions"
                      value={formData.openPositions}
                      onChange={handleChange}
                      min="1"
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dar:text-gray-300">Preferred Age</label>
                    <select
                      name="jobCategory"
                      value={formData.jobCategory}
                      onChange={handleChange}
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    >
                      <option value="">Age</option>
                      <option value="18-20">18-20</option>
                      <option value="20-25">20-25</option>
                      <option value="25-30">25-30</option>
                      <option value="30-40">30-40</option>
                      <option value="40 and Above">40 and Above</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dar:text-gray-300">Job Profile Picture</label>
                    <input
                      type="file"
                      name="jobprofilePic"
                      accept="image/*"
                      onChange={handleChange}
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    />
                    
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dar:text-gray-300">Payment Amount and currency</label>
                    <input
                      type="number"
                      name="paymentAmount"
                      value={formData.paymentAmount}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="Amount"
                      className="mt-2 p-2 drk:bg-gray-600 border border-gray-200 drk:border-gray-500 rounded-md text-gray-800 drk:text-gray-200 w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-fit">
                  <div className="radio flex gap-10 items-center border p-4 rounded-md border-stone-100 bg-blue-50">
                    <div className="flex gap-2 items-center">
                      <input type="checkbox" name="gender" value="Male" id="male" onChange={handleChange} />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input type="checkbox" name="gender" value="Female" id="female" onChange={handleChange} />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                  <div className="checkbox flex gap-10 items-center border p-4 rounded-md border-stone-100 bg-blue-50">
                    <div className="flex gap-2 items-center">
                      <input type="radio" name="cvrequirement" value="cvRequired" id="cvRequired" onChange={handleChange} />
                      <label htmlFor="cvRequired">CV Required</label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input type="radio" name="cvrequirement" value="cvNotRequired" id="cvNotRequired" onChange={handleChange} />
                      <label htmlFor="cvNotRequired">CV Not Required</label>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <button type="button" onClick={handleClose} className="w-fit px-4 text-white bg-red-500 rounded-md font-semibold transition-colors duration-300 cursor-pointer">
                    <X />
                  </button>
                  <button onClick={() => setActiveTab("description")} className="w-full bg-ArtisansBlue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                    Continue
                  </button>
                </div>
              </div>
            )}
            {activeTab === "description" && (
              <div className="p-6 drk:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-medium text-stone-800 drk:text-gray-300">DESCRIPTION</h3>
                <p className="text-sm text-stone-700 drk:text-gray-400 mb-6">What candidates will read.</p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full resize-none border border-stone-300 rounded-md p-4 overflow-y-scroll"
                  rows="6"
                  placeholder="Enter job description..."
                />
                <div className="flex gap-4 mt-6">
                  <button onClick={() => setActiveTab("publish")} className="w-full bg-ArtisansBlue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                    Continue
                  </button>
                </div>
              </div>
            )}
            {activeTab === "publish" && (
              <div className="p-6 drk:bg-gray-700 rounded-lg flex flex-col gap-10">
                <div>
                  <h3 className="text-lg font-medium text-stone-800 drk:text-gray-300">Post Job</h3>
                  <p className="text-sm text-stone-700 drk:text-gray-400">Double Check To Make Sure Everything Is Good.</p>
                </div>
                <button onClick={handleSubmit} className="w-fit bg-ArtisansBlue hover:bg-ArtisansBlue-100 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex gap-2">
                  Post <Plus />
                </button>
              </div>
            )}
          </div>
          <div className="p-4 flex items-center justify-center w-full h-full self-start">
            <img src={PF} alt="Job posting illustration" className="object-contain" />
          </div>
        </div>
      </div>
      {alert.show && <CustomAlert message={alert.message} type={alert.type} onClose={hideAlert} />}
    </div>
  );
};

export default IPostjobs;