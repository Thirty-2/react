import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { footLinks } from '../Constants';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ArtisansAsh-300 text-white pt-16 pb-8 px-10 rounded-t-[1.5rem] max-lg:flex-col max-lg:text-center max-lg:gap-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Column 1: Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-stone-100">Explore</h3>
          <div className="flex flex-wrap gap-4 max-lg:justify-center">
            {footLinks.map((foot, index) => (
              <Link
                to={foot.href}
                key={index} // Fixed key using index
                className="text-stone-300 font-light hover:text-ArtisansBlue-100 transition-colors duration-300 hover:underline hover:underline-offset-4"
              >
                {foot.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Social Media & Copyright */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-stone-100">Follow Us</h3>
          <div className="flex gap-4 max-lg:justify-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-ArtisansBlue-100 transition-transform duration-300 hover:scale-125"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-ArtisansBlue-100 transition-transform duration-300 hover:scale-125"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-ArtisansBlue-100 transition-transform duration-300 hover:scale-125"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
          </div>
          <div className="text-stone-300 font-light mt-4">
            Artisans Marketplace &copy; {new Date().getFullYear()}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;