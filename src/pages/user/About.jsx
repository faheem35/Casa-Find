
import Header from "../../components/user/Header"

const About = () => {
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
              About
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                CasaFind
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Your trusted partner in finding the perfect property. We connect dreams with reality through innovative technology and personalized service.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">
                  Our
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mission
                  </span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At CasaFind, we believe that finding the perfect property should be an exciting journey, not a stressful ordeal. Our mission is to revolutionize the real estate experience by providing cutting-edge technology, transparent processes, and exceptional customer service.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We're committed to making property buying, selling, and investing accessible to everyone, regardless of their experience level or budget.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i className="fa-solid fa-home text-white text-2xl"></i>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                      <div className="text-gray-600">Properties Listed</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i className="fa-solid fa-users text-white text-2xl"></i>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">25K+</div>
                      <div className="text-gray-600">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i className="fa-solid fa-handshake text-white text-2xl"></i>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">8K+</div>
                      <div className="text-gray-600">Successful Deals</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i className="fa-solid fa-city text-white text-2xl"></i>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                      <div className="text-gray-600">Cities Covered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                Our
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Core Values
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do and shape our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Transparency */}
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-eye text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparency</h3>
                <p className="text-gray-600 leading-relaxed">
                  We believe in complete transparency in all our dealings. No hidden fees, no surprises - just honest, straightforward service you can trust.
                </p>
              </div>

              {/* Innovation */}
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-lightbulb text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  We continuously embrace new technologies and innovative solutions to make your property journey smoother and more efficient.
                </p>
              </div>

              {/* Customer First */}
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-heart text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your satisfaction is our top priority. We go above and beyond to ensure every customer has an exceptional experience with us.
                </p>
              </div>

              {/* Integrity */}
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-shield-halved text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrity</h3>
                <p className="text-gray-600 leading-relaxed">
                  We conduct our business with the highest ethical standards, ensuring every transaction is fair, legal, and beneficial for all parties.
                </p>
              </div>

              {/* Excellence */}
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-star text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
                <p className="text-gray-600 leading-relaxed">
                  We strive for excellence in everything we do, from our platform's functionality to our customer service and support.
                </p>
              </div>

              {/* Community */}
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-people-group text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  We're committed to building stronger communities by helping people find homes and investments that contribute to local growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                Meet Our
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Expert Team
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our dedicated professionals are here to guide you through every step of your property journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <i className="fa-solid fa-user text-6xl text-gray-400"></i>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-crown text-white text-lg"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sarah Johnson</h3>
                <p className="text-blue-600 font-semibold mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  15+ years in real estate with a passion for innovation and customer service excellence.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-48 h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <i className="fa-solid fa-user text-6xl text-gray-400"></i>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-code text-white text-lg"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Michael Chen</h3>
                <p className="text-green-600 font-semibold mb-3">CTO</p>
                <p className="text-gray-600 text-sm">
                  Tech visionary leading our platform development and ensuring cutting-edge user experience.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <i className="fa-solid fa-user text-6xl text-gray-400"></i>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-chart-line text-white text-lg"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Emily Rodriguez</h3>
                <p className="text-purple-600 font-semibold mb-3">Head of Sales</p>
                <p className="text-gray-600 text-sm">
                  Expert in market analysis and client relations, helping customers find their perfect match.
                </p>
              </div>

              {/* Team Member 4 */}
              <div className="group text-center">
                <div className="relative mb-6">
                  <div className="w-48 h-48 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <i className="fa-solid fa-user text-6xl text-gray-400"></i>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-headset text-white text-lg"></i>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">David Thompson</h3>
                <p className="text-orange-600 font-semibold mb-3">Customer Success</p>
                <p className="text-gray-600 text-sm">
                  Dedicated to ensuring every customer has an exceptional experience from start to finish.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
              Ready to Start Your
              <span className="block">Property Journey?</span>
            </h2>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              Join thousands of satisfied customers who found their dream properties with CasaFind
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/register"
                className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Get Started Today
              </a>
              <a
                href="/contact"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-gray-900 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
