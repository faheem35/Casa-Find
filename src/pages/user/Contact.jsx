

import { useState } from "react"
import Header from "../../components/user/Header"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you soon.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Get In
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Have questions about properties or need assistance? We're here to help you every step of the way.
            </p>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
                    Let's
                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Connect
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Whether you're buying, selling, or just exploring your options, our team of experts is ready to
                    assist you. Reach out to us through any of the channels below.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-phone text-white text-2xl"></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                        <p className="text-gray-600 mb-1">Available 24/7 for your convenience</p>
                        <a
                          href="tel:+1234567890"
                          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                          +1 (234) 567-8900
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-envelope text-white text-2xl"></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600 mb-1">We'll respond within 24 hours</p>
                        <a
                          href="mailto:info@casafind.com"
                          className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                        >
                          info@casafind.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-location-dot text-white text-2xl"></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                        <p className="text-gray-600 mb-1">Monday - Friday: 9AM - 6PM</p>
                        <p className="text-green-600 font-semibold">
                          123 Real Estate Ave
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Live Chat */}
                  <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-comments text-white text-2xl"></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
                        <p className="text-gray-600 mb-1">Instant support when you need it</p>
                        <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                          Start Chat Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h3>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fa-solid fa-user mr-2 text-blue-600"></i>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fa-solid fa-envelope mr-2 text-blue-600"></i>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fa-solid fa-phone mr-2 text-blue-600"></i>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-300"
                      placeholder="+1 (234) 567-8900"
                    />
                  </div>

                  {/* Subject */}
                  <div className="group">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fa-solid fa-tag mr-2 text-blue-600"></i>
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="buying">Buying a Property</option>
                      <option value="selling">Selling a Property</option>
                      <option value="renting">Renting a Property</option>
                      <option value="investment">Investment Opportunities</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fa-solid fa-message mr-2 text-blue-600"></i>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-300 resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-paper-plane"></i>
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                Frequently Asked
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Quick answers to common questions about our services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* FAQ Item 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fa-solid fa-question-circle text-blue-600 mr-3"></i>
                  How do I list my property?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Simply create an account, go to your dashboard, and click "Add Property". Our step-by-step guide will
                  walk you through the entire process.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fa-solid fa-question-circle text-purple-600 mr-3"></i>
                  Are there any hidden fees?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  No hidden fees! We believe in complete transparency. All costs are clearly outlined before you commit
                  to any service.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border border-green-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fa-solid fa-question-circle text-green-600 mr-3"></i>
                  How long does it take to sell?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  The average time varies by location and property type, but most properties receive inquiries within
                  the first week of listing.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="fa-solid fa-question-circle text-orange-600 mr-3"></i>
                  Do you provide legal assistance?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  While we don't provide legal services directly, we can connect you with trusted legal professionals in
                  your area.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
