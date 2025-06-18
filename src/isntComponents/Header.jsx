import { LogoB } from "../assets/images";
// import { Cook } from "../assets/icons";
import {
  MdVerified,
  MdCarpenter,
  MdHandyman,
  MdLocalLaundryService,
  MdCleaningServices,
  MdSearch,
  MdMenu,
  MdClose,
  MdLightMode,
} from "react-icons/md";
import { navLinks } from "../Constants"; // Removed unused 'buttons'
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { useState } from "react";
import SignupModal from "./SignupModal";

const Header = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Optional: Handle link click to close mobile nav
  const handleClick = () => {
    setNav(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="min-lg:hidden pr-8 flex items-center justify-between bg-stone-100 shadow-md relative">
        <img src={LogoB} width={80} alt="Artisans Logo" className="ml-2" />
        <div className="flex w-fit gap-5 items-center">
          <MdSearch size={30} color="#0090FF" className="md:hidden" />
          <div onClick={handleNav}>
            {!nav ? <MdMenu size={25} /> : <MdClose size={25} />}
          </div>
        </div>

        <div
          className={`absolute left-0 right-0 bg-white shadow-md rounded-xl top-23 mx-4 flex flex-col gap-5 text-center p-8 text-lg font-semibold transition-all duration-500 ease-in-out z-10 ${
            nav
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {navLinks.map((item) => (
            <Link key={item.href} to={item.href} onClick={() => handleClick()}>
              {item.label}
            </Link>
          ))}
          <p>Currency</p>
          <div
            className="bg-ArtisansBlue text-white rounded-full px-6 shadow-md py-2 w-fit mx-auto hover:bg-ArtisansBlue-100 ease-in-out delay-100 duration-300 transition-colors cursor-pointer"
            onClick={() => setIsSignUpOpen(true)} // Open modal
          >
            Start{" "}
            <ReactTyped
              strings={["Working", "Employing"]}
              typeSpeed={140}
              backSpeed={140}
              loop
            />
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="max-lg:hidden flex items-center justify-between px-10 bg-stone-100 shadow-md relative">
        {/* <div className="flex flex-col items-center relative gap-2">
          <div className="flex gap-10">
            {navLinks.map((item) => (
              <div key={item.href} className="flex flex-col items-center">
                <div className="flex items-center">
                  <Link
                    to={item.href}
                    className="font-thin hover:text-ArtisansBlue transition-all text-ArtisansAsh-100 hover:scale-105 ease-in-out duration-200"
                  >
                    {item.label}
                  </Link>
                  {item.label === "Premium" && (
                    <MdVerified size={20} className="text-stone-300 ml-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="flex items-center gap-4">
          <div>
            <img src={LogoB} width={120} alt="Artisans Logo" />
          </div>
          <div className="flex w-fit gap-2">
            <MdCarpenter size={20} />
            <img src={Cook} alt="Cook-icon" width={20} />
            <MdCleaningServices size={20} />
            <MdHandyman size={20} />
            <MdLocalLaundryService size={20} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-shadow-ArtisansAsh-100 opacity-50">Currency</p>
          <div
            className="bg-ArtisansBlue text-white rounded-full px-6 shadow-md py-2 w-[10.3rem] mx-auto hover:bg-ArtisansBlue-100 ease-in-out delay-100 duration-300 transition-colors cursor-pointer"
            onClick={() => setIsSignUpOpen(true)} // Open modal
          >
            Start{" "}
            <ReactTyped
              strings={["Working", "Employing"]}
              typeSpeed={140}
              backSpeed={140}
              loop
            />
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      {isSignUpOpen && <SignupModal onClose={() => setIsSignUpOpen(false)} />}
    </>
  );
};

export default Header;
