import { buttons } from "../Constants";
import { ReactTyped } from "react-typed";
// import { Cook } from "../assets/icons";
import {LogoB, D3, D4} from "../assets/images";
import { MdCarpenter, MdHandyman, MdLocalLaundryService, MdCleaningServices, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignupModal from "./SignupModal";

const Home = () => {

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-20 pb-50">
      <div className="relative BG_ARTISANS w-full min-h-[60vh] min-lg:min-h-[60vh]">
        <div className="w-full p-10 flex flex-col min-h-[95vh] min-lg:min-h-[65vh] justify-between">
          {/* Search Bar */}
          <div className="Search max-md:hidden ">
            <div className="flex items-center justify-center border-[1px] border-stone-600 w-fit mx-auto rounded-full shadow-lg bg-ArtisansAsh-100">
              <input
                type="text"
                id="Search"
                placeholder="Search for services, artisans, etc."
                className="py-2 px-4 rounded-l-full w-120 outline-none text-stone-100 placeholder:text-stone-100"
              />
              <div className="py-2 px-4 rounded-r-full hover:bg-ArtisansBlue-100 transition-colors duration-500 ease-in-out cursor-pointer ">
                <MdSearch size={30} className="text-stone-100" />
              </div>
            </div>
          </div>

          {/* Left Section */}
          <div className="Left text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to The Artisans Marketplace
            </h1>
            <p className="text-lg text-stone-200 mb-6">
              Our Artisans Are Ready To Work With You and For You.
            </p>
            <p className="text-md text-stone-400 mb-6 md:w-[50%] lg:w-[30%]">
              The Artisan Market place is a platform that connects artisans with
              customers and vice versa.
            </p>
            <div
              className="bg-ArtisansBlue text-white rounded-full px-5 shadow-md py-2 w-fit mx-auto md:m-0 hover:bg-ArtisansBlue-100 transition-colors duration-300 ease-in-out cursor-pointer"
              onClick={() => setIsSignUpOpen(true)}
            >
              Start Working
            </div>
          </div>

          {/* Right Section */}
          <div className="Right text-stone-100 text-center md:text-right flex flex-col gap-2">
            <h1 className="font-bold text-2xl md:text-4xl">In Need Of A</h1>
            <ReactTyped
              strings={[
                "CARPENTER ?",
                "COOK ?",
                "CLEANER ?",
                "PLUMBER ?",
                "LAUNDRY ?",
              ]}
              className="text-ArtisansBlue-100 font-black text-3xl md:text-5xl"
              typeSpeed={200}
              backSpeed={100}
              loop
            />
            <h1 className="font-bold text-md md:text-lg text-stone-300">
              They're All Coming Here!
            </h1>
          </div>

          {/* End Section */}
          <div className="end mx-auto">
            <div className="flex w-fit gap-2 text-stone-300">
              <MdCarpenter size={20} />
              <img src={Cook} alt="Cook-icon" width={20} />
              <MdCleaningServices size={20} />
              <MdHandyman size={20} />
              <MdLocalLaundryService size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto items-center text-center flex flex-col gap-10">
        <div className="grid grid-cols-2  min-md:grid-cols-5 gap-10 min-lg:gap-30">
          <div className="bg-ArtisansAsh-200 p-6 rounded-full shadow-lg w-fit hover:bg-ArtisansBlue-100 transition-colors duration-500 ease-in-out">
            <MdCarpenter size={50} className="text-white" />
          </div>

          <div className="bg-ArtisansAsh-200 p-6 rounded-full shadow-lg w-fit hover:bg-ArtisansBlue-100 transition-colors duration-500 ease-in-out">
            <img src={Cook} alt="" className="w-[3rem]" />
          </div>

          <div className="bg-ArtisansAsh-200 p-6 rounded-full shadow-lg w-fit hover:bg-ArtisansBlue-100 transition-colors duration-500 ease-in-out">
            <MdCleaningServices size={50} className="text-white" />
          </div>

          <div className="bg-ArtisansAsh-200 p-6 rounded-full shadow-lg w-fit hover:bg-ArtisansBlue-100 transition-colors duration-500 ease-in-out">
            <MdHandyman size={50} className="text-white" />
          </div>

          <div className="bg-ArtisansAsh-200 p-6 rounded-full shadow-lg w-fit hover:bg-ArtisansBlue-100 transition-colors duration-500 ease-in-out max-md:hidden">
            <MdLocalLaundryService size={50} className="text-white" />
          </div>
        </div>
        {/* <hr className="w-screen text-stone-400"/> */}
        {/* <Link to="#Search" className="text-ArtisansBlue-100 text-xl">More...</Link> */}
      </div>

      <div className="flex flex-col gap-10">
        <h1 className="text-xl md:text-3xl font-bold  text-center ">
          About The Artisans Market Place
        </h1>

        <div className="text-white bg-ArtisansAsh-300 p-10 grid grid-cols-1 min-lg:grid-cols-2 items-center gap-14 ">
          <div className="flex flex-col gap-10 mx-10 min-md:w-[80%]">
            <h1 className="text-ArtisansBlue-200 text-2xl min-md:text-2xl font-bold">
              What is the Artisans Marketplace ?
            </h1>

            <p className="text-stone-300  font-semibold">
              The Artisan Market place is a platform that connects artisans with
              customers and vice versa. <br />
              <br />
              The Artisans Marketplace is a dedicated platform that bridges the
              gap between skilled artisans and customers seeking unique,
              handcrafted products. Whether you're an artisan looking to
              showcase your creations or a customer searching for one-of-a-kind
              items, we provide the perfect place to connect, explore, and
              celebrate craftsmanship.
            </p>
          </div>

          <div className="bg-white w-fit mx-auto p-4 rounded-full shadow-lg">
            <img src={LogoB} alt="" className="w-[20rem]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">

        <div className="text-white  p-10 grid grid-cols-1 min-lg:grid-cols-2 items-center gap-10  mx-10">
          <div className=" w-fit mx-auto">
            <img src={D3} alt="" className="w-[20rem]" />
          </div>
          <div className="flex flex-col gap-10 min-md:w-[80%]">
            <h1 className="text-slate-800 text-xl font-bold">
              For Artisans
            </h1>

            <p class=" text-slate-600 text-">
                Are you an artisan passionate about your craft? The Artisans Marketplace provides the space to share your work, grow your brand, and reach customers who appreciate authentic creations.
              </p>

              <h1 className="text-slate-800 text-xl font-bold">
              Why Join?
            </h1>
            <ul class="text-slate-600 list-disc">
                  <li>Showcase Your Craft.</li>
                  <li>Build Your Brand.</li>
                  <li>Join a Supportive Community.</li>
                  <li>Connect With Customers Ready to Patrionize.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">

        <div className="text-white  p-10 grid grid-cols-1 min-lg:grid-cols-2 items-center gap-10 mx-10">

          <div className="flex flex-col gap-10 min-md:w-[80%]">
            <h1 className="text-slate-800 text-xl font-bold">
              For Customers
            </h1>

            <p class=" text-slate-600">
                Looking for something special?, tailored to your needs and requirements?, or just want to support local artisans? The Artisans Marketplace is the place to discover unique products and services that reflect your style and values.
              </p>

              <h1 className="text-slate-800 text-xl font-bold">
              Why Join?
            </h1>
            <ul class="text-slate-600 list-disc ">
              <li>We'll let you figure that part out.</li>
            </ul>
          </div>
          <div className=" w-fit mx-auto">
            <img src={D4} alt="" className="w-[20rem]" />
          </div>
        </div>
      </div>

      {isSignUpOpen && <SignupModal onClose={() => setIsSignUpOpen(false)} />}
    </div>
  );
};

export default Home;
