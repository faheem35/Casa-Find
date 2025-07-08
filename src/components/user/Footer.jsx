
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-home text-white text-lg"></i>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                CasaFind
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm">
              Your trusted partner in finding the perfect home. We connect buyers, sellers, and renters with premium
              properties across the globe.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Currently v2.1.0 - Always improving</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">Quick Links</h4>
            <nav className="space-y-3">
              <Link
                to="/"
                className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform"
              >
                <i className="fa-solid fa-home w-4 mr-2"></i>
                Home Page
              </Link>
              <Link
                to="/properties"
                className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform"
              >
                <i className="fa-solid fa-building w-4 mr-2"></i>
                Browse Properties
              </Link>
              <Link
                to="/login"
                className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform"
              >
                <i className="fa-solid fa-sign-in-alt w-4 mr-2"></i>
                Login
              </Link>
              <Link
                to="/register"
                className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform"
              >
                <i className="fa-solid fa-user-plus w-4 mr-2"></i>
                Register
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">Resources</h4>
            <nav className="space-y-3">
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform"
              >
                <i className="fa-brands fa-react w-4 mr-2"></i>
                React Documentation
              </a>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform"
              >
                <i className="fa-solid fa-palette w-4 mr-2"></i>
                Tailwind CSS
              </a>
              <a
                href="https://reactrouter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform"
              >
                <i className="fa-solid fa-route w-4 mr-2"></i>
                React Router
              </a>
              <Link
                to="/help"
                className="block text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm hover:translate-x-1 transform"
              >
                <i className="fa-solid fa-question-circle w-4 mr-2"></i>
                Help Center
              </Link>
            </nav>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Stay Updated</h4>
              <p className="text-slate-300 text-sm mb-4">
                Get the latest property listings and market insights delivered to your inbox.
              </p>
              <form className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 text-sm transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-2 hover:shadow-lg transform hover:scale-105"
                >
                  <span>Subscribe Now</span>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                >
                  <i className="fa-brands fa-twitter text-slate-300 hover:text-white"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                >
                  <i className="fa-brands fa-instagram text-slate-300 hover:text-white"></i>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                >
                  <i className="fa-brands fa-facebook text-slate-300 hover:text-white"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-blue-800 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                >
                  <i className="fa-brands fa-linkedin text-slate-300 hover:text-white"></i>
                </a>
                <a
                  href="tel:+1234567890"
                  className="w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                >
                  <i className="fa-solid fa-phone text-slate-300 hover:text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-slate-400">
              <p>&copy; 2025 CasaFind Inc. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-blue-400 transition-colors duration-200">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="hover:text-blue-400 transition-colors duration-200">
                  Cookie Policy
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>Made with</span>
              <i className="fa-solid fa-heart text-red-500 animate-pulse"></i>
              <span>for property seekers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
