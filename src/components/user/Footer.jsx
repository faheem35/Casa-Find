import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="mt-20 py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">

          {/* Intro Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <i className="fa-brands fa-docker"></i>
              CasaFind
            </h4>
            <p className="mb-2 leading-relaxed">
              Designed and built with all the love in the world <br /> by the CasaFind with the help of our contributors.
            </p>
            <p className="mb-1">Code licensed MIT, docs CC BY 3.0.</p>
            <p>Currently v5.3.3.</p>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-1/3 lg:w-1/6 mb-6">
            <h5 className="text-lg font-semibold mb-3">Links</h5>
            <nav className="flex flex-col gap-1">
              <Link to="/" className="hover:underline hover:text-yellow-400">Home Page</Link>
              <Link to="/login" className="hover:underline hover:text-yellow-400">Login Page</Link>
              <Link to="/register" className="hover:underline hover:text-yellow-400">Register Page</Link>
            </nav>
          </div>

          {/* Guides Section */}
          <div className="w-full md:w-1/3 lg:w-1/6 mb-6">
            <h5 className="text-lg font-semibold mb-3">Guides</h5>
            <nav className="flex flex-col gap-1">
              <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-yellow-400">React</a>
              <a href="https://react-bootstrap.github.io/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-yellow-400">React Bootstrap</a>
              <a href="https://reactrouter.com/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-yellow-400">React Router</a>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h5 className="text-lg font-semibold mb-3">Contacts</h5>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter Your Email Here..."
                aria-label="Email"
                className="flex-grow px-3 py-2 rounded-l-md focus:outline-none text-gray-900"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-r-md hover:bg-yellow-500"
                aria-label="Subscribe"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>

            <div className="flex justify-between mt-6 text-2xl">
              <a href="https://x.com/__x" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-yellow-400">
                <i className="fa-solid fa-phone"></i>
              </a>
              <a href="https://in.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>

        </div>

        <p className="text-center mt-8 text-sm text-gray-400">
          Copyright ©ProjectVerse Inc. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
