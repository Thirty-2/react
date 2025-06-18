import React from 'react'
import { Home, Header, Premium, Faq, Footer, Terms, Contact, Support, SignupModal  } from '../isntComponents'
import { LogoW, Dulachef } from '../assets/images';
// import { Cook } from '../assets/icons';
import {navLinks, footLinks} from "../Constants"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MdCarpenter, MdCleaningServices, MdHandyman, MdLocalLaundryService, MdClose } from 'react-icons/md';
import { BsGoogle } from 'react-icons/bs';

const IsntLoggedIn = () => {


const navlink = {
    "/": <Home />,
    "/Faq": <Faq />
  };

const footLinks = {
  "/": <Home />,
  "/Contact": <Contact />,
  "/Support": <Support />,
  "/Faq": <Faq />,
  "/Terms": <Terms/>
}

return (
  <BrowserRouter>
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-1 ">
        <Routes>
          {navLinks.map((item) => (
            <Route
              key={item.href}
              path={item.href}
              element={navlink[item.href]}
            />
          ))}
        </Routes>
      </main>

      {/* <div className="Signup fixed flex z-10 m-6 top-20 min-md:left-20 min-md:top-50 min-lg:top-25 min-lg:left-70 ">
        <div className="bg-ArtisansAsh-300 px-8 py-6 rounded-l-3xl max-lg:rounded-3xl text-white flex flex-col gap-10 w-full">
          <div className="flex justify-between items-center">
              <img src={LogoW} width={100} alt="" />
              <div className=" text-white">
                <MdClose size={30}/>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="space-y-2">
              <h1 className="font-bold text-3xl">Welcome!</h1>
              <p className="text-stone-200 font-thin">
                Lets create your new account.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-2 py-2 px-4 rounded-md border-stone-100 border w-full justify-center hover:bg-stone-100 group transition-colors duration-300 ease-in-out">
                <BsGoogle size={20} className="group-hover:text-black" />
                <p className="group-hover:text-black">Continue with Google</p>
              </div>

              <div className="flex gap-2 items-center">
                <div className="bg-stone-400 p-[.5px] h-0 w-full"></div>
                <p>Or</p>
                <div className="bg-stone-400 p-[.5px] h-0 w-full"></div>
              </div>

              <div className="space-y-10">
                <input
                  type="email"
                  placeholder="Enter Email"
                  required
                  className="w-full p-4 border border-stone-100 rounded-md outline-none"
                />

                <input
                  placeholder="Enter Password"
                  required
                  className="w-full p-4 border border-stone-100 rounded-md outline-none"
                  type="password"
                  name=""
                  id=""
                />

                <button className="w-full bg-stone-50 p-4 rounded-md text-black font-semibold hover:bg-black hover:text-white transition-all duration-500 ease-in-out">
                  Continue
                </button>
              </div>
            </div>

            <p className="text-sm">
              By creating an account you agree to our{" "}
              <p className="underline">Terms of Service</p>
            </p>

            <p className="text-sm font-semibold">
              Already have an Account?
              <p className="underline">Sign in</p>
            </p>
          </div>
        </div>

        <div className="bg-stone-200 p-10 flex items-center justify-center w-full rounded-r-3xl">
          <img src={Dulachef} width={300} alt="" />
        </div>
      </div> */}

      <Footer />
    </div>
  </BrowserRouter>
);
}

export default IsntLoggedIn
