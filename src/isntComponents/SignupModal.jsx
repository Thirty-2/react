import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { BsGoogle } from "react-icons/bs";
import { LogoW, Dulachef } from "../assets/images";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, saveUserToFirestore, saveArtisanToFirestore } from "../firebase";

const SignupModal = ({ onClose, setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const artisan = result.user;
      const emailName = artisan.email.split("@")[0];
      const userData = {
        id: emailName, // Set id to email name
        email: artisan.email,
        name: artisan.displayName || emailName,
        profilePic: artisan.photoURL,
        role: "customer", // Default role, can be updated later
        createdAt: new Date(),
      };
      const artisanData = {
        id: emailName, // Set id to email name
        email: artisan.email,
        name: artisan.displayName || emailName,
        profilePic: artisan.photoURL,
        role: "customer", // Default to customer, update to "artisan" if applicable
        createdAt: new Date(),
      };
      setUser(userData);
      await saveUserToFirestore(artisan.uid, userData); // Use uid for document ID, id as custom field
      await saveArtisanToFirestore(artisan.uid, artisanData); // Use uid for document ID
      onClose();
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        setError("This email is linked to another sign-in method. Please use that method or contact support.");
      } else if (error.code === "auth/popup-blocked") {
        setError("Popup blocked. Please allow popups and try again.");
      } else {
        setError(`Sign in Failed, Please try again.`);
        console.log(error.message);
      }
      console.error("Google Sign-In error:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = result.user;
      const emailName = user.email.split("@")[0];
      const userData = {
        id: emailName, // Set id to email name
        email: user.email,
        name: emailName,
        role: "customer", // Default role
        createdAt: new Date(),
      };
      const artisanData = {
        id: emailName, // Set id to email name
        email: user.email,
        name: emailName,
        role: "customer", // Default to customer
        createdAt: new Date(),
      };
      setUser(userData);
      await saveUserToFirestore(user.uid, userData); // Use uid for document ID
      await saveArtisanToFirestore(user.uid, artisanData); // Use uid for document ID
      onClose();
    } catch (error) {
      setError("Email already in use ");
      console.error("Sign-up error:", error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = result.user;
      const emailName = user.email.split("@")[0];
      const userData = {
        id: emailName, // Set id to email name
        email: user.email,
        name: emailName,
        role: "customer", // Fetch existing role if needed
        createdAt: new Date(),
      };
      setUser(userData);
      await saveUserToFirestore(user.uid, userData); // Use uid for document ID
      onClose();
    } catch (error) {
      setError("Sign-in failed. " + (error.message || "Please check your credentials."));
      console.error("Sign-in error:", error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "Sign") {
      onClose();
    }
  };

  return (
    <div
      id="Sign"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-ArtisansAsh-300 p-6 rounded-3xl flex flex-col md:flex-row gap-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Left */}
        <div className="flex flex-col gap-8 w-full md:w-1/2">
          <div className="flex justify-between items-center">
            <img src={LogoW} alt="Logo" className="w-24 h-auto" />
            <button onClick={onClose} className="text-red-400">
              <MdClose size={30} />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <h1 className="font-bold text-3xl text-white">
                {isSignUp ? "Welcome!" : "Welcome Back!"}
              </h1>
              <p className="text-stone-200 font-light">
                {isSignUp ? "Lets create your new account." : "Please sign in to your account."}
              </p>
            </div>
            <div className="space-y-6">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 py-3 px-4 rounded-md border border-stone-200 w-full justify-center hover:bg-stone-200 hover:text-black transition-colors duration-300 ease-in-out group"
              >
                <BsGoogle size={20} className="group-hover:text-black text-white" />
                <span className="group-hover:text-black text-white">Continue with Google</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="bg-stone-400 h-[1px] w-full"></div>
                <span className="text-stone-200">Or</span>
                <div className="bg-stone-400 h-[1px] w-full"></div>
              </div>
              <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-stone-200 rounded-md outline-none bg-ArtisansAsh-200 text-white placeholder:text-stone-300 focus:ring-2 focus:ring-blue-500"
                  aria-label="Email address"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-stone-200 rounded-md outline-none bg-ArtisansAsh-200 text-white placeholder:text-stone-300 focus:ring-2 focus:ring-blue-500"
                  aria-label="Password"
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-stone-50 p-4 rounded-md text-black font-semibold hover:bg-black hover:text-white transition-all duration-500 ease-in-out"
                >
                  {isSignUp ? "Continue" : "Sign In"}
                </button>
              </form>
              <p className="text-sm text-stone-200">
                {isSignUp ? (
                  <>
                    By creating an account you agree to our{' '}
                    <a href="/terms" className="underline text-blue-300 hover:text-blue-400">
                      Terms of Service
                    </a>
                  </>
                ) : (
                  <>
                    Forgot Password?{' '}
                    <button
                      onClick={() => alert("Reset password coming soon!")}
                      className="underline text-blue-300 hover:text-blue-400"
                    >
                      Reset
                    </button>
                  </>
                )}
              </p>
              <p className="text-sm text-stone-200 font-semibold">
                {isSignUp ? (
                  <>
                    Already have an Account?{' '}
                    <button
                      onClick={() => setIsSignUp(false)}
                      className="underline text-blue-300 hover:text-blue-400"
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an Account?{' '}
                    <button
                      onClick={() => setIsSignUp(true)}
                      className="underline text-blue-300 hover:text-blue-400"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="bg-white p-6 min-lg:rounded-3xl flex items-center justify-center w-full md:w-1/2">
          <img src={Dulachef} alt="Dulachef" className="max-w-full h-auto max-h-64 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default SignupModal;