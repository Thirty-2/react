import React from 'react'
import { FaFacebookF,FaTwitter, FaInstagram  } from 'react-icons/fa'

const IFooter = () => {
  return (
      <footer className='flex items-center justify-between font-ComicNeue'>
        <div className="font-black text-3xl max-md:text-xl font-ComicNeue cursor-pointer text-stone-600 hover:text-stone-900 duration-200 ease-in-out">
          ARTISANS
        </div>
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
    </footer>
  )
}

export default IFooter
