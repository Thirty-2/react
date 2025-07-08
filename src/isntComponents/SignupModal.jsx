import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { BsGoogle } from "react-icons/bs";
import { LogoW, Dulachef } from "../assets/images";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { auth, saveUserToFirestore, saveArtisanToFirestore } from "../firebase";
import {CustomAlert} from "../isComponents";

const SignupModal = ({ onClose, setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });
  const [isSignUp, setIsSignUp] = useState(true);

  // google provider, account selection
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setAlert({ show: false, message: "", type: "info" });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const artisan = result.user;
      const userData = {
        id: artisan.uid,
        email: artisan.email,
        name: artisan.displayName || artisan.email.split("@")[0],
        profilePic: artisan.photoURL || "https://via.placeholder.com/40?text=User",
        role: "customer",
        createdAt: new Date(),
      };
      setUser(userData);
      await saveUserToFirestore(artisan.uid, userData);
      setAlert({ show: true, message: "Signed in successfully!", type: "success" });
      onClose();
    } catch (error) {
      let errorMessage = "Sign-in failed. Please try again.";
      if (error.code === "auth/account-exists-with-different-credential") {
        errorMessage = "This email is linked to another sign-in method.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup blocked. Please allow popups and try again.";
      }
      setAlert({ show: true, message: errorMessage, type: "error" });
      console.error("Google Sign-In error:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setAlert({ show: true, message: "Please fill in all fields.", type: "error" });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = result.user;
      const userData = {
        id: user.uid,
        email: user.email,
        name: user.email.split("@")[0],
        role: "customer",
        createdAt: new Date(),
      };
      setUser(userData);
      await saveUserToFirestore(user.uid, userData);
      setAlert({ show: true, message: "Account created successfully!", type: "success" });
      onClose();
    } catch (error) {
      setAlert({ show: true, message: "Email already in use.", type: "error" });
      console.error("Sign-up error:", error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setAlert({ show: true, message: "Please fill in all fields.", type: "error" });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = result.user;
      const userData = {
        id: user.uid,
        email: user.email,
        name: user.email.split("@")[0],
        role: "customer",
        createdAt: new Date(),
      };
      setUser(userData);
      await saveUserToFirestore(user.uid, userData);
      setAlert({ show: true, message: "Signed in successfully!", type: "success" });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        message: "Sign-in failed. Please check your credentials.",
        type: "error",
      });
      console.error("Sign-in error:", error);
    }
  };

  const handleResetPassword = async () => {
    if (!formData.email) {
      setAlert({ show: true, message: "Please enter your email to reset your password.", type: "error" });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setAlert({
        show: true,
        message: "Password reset email sent! Check your inbox.",
        type: "success",
      });
    } catch (error) {
      let errorMessage = "Failed to send reset email. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }
      setAlert({ show: true, message: errorMessage, type: "error" });
      console.error("Password reset error:", error);
    }
  };

  const closeAlert = () => {
    setAlert({ show: false, message: "", type: "info" });
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
          {alert.show && (
            <CustomAlert
              message={alert.message}
              type={alert.type}
              duration={2000}
              onClose={closeAlert}
            />
          )}
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
                {isSignUp ? "Let's create your new account." : "Please sign in to your account."}
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
                      onClick={handleResetPassword}
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