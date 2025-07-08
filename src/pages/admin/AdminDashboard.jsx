
import { useState } from "react"
import { HouseFill, PersonFillGear, Grid3x3GapFill, ArrowLeft } from "react-bootstrap-icons"
import ManageProperties from "./ManageProperties"
import ManageUsers from "./ManageUsers"

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("properties")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigationItems = [
    {
      id: "properties",
      label: "Manage Properties",
      icon: HouseFill,
      active: activeSection === "properties",
    },
     {
      id: "users",
      label: "Manage Users",
      icon: PersonFillGear,
      active: activeSection === "users",
    }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "properties":
        return (
          <div className="h-full">
            <ManageProperties />
          </div>
        )
      case "users":
      default:
        return (
          <div className="h-full">
            <ManageUsers />
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-md hover:bg-gray-100">
            <ArrowLeft size={20} />
          </button>
        </div>

        <nav className="mt-6">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                item.active ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-medium" : "text-gray-700"
              }`}
            >
              <item.icon className="mr-3" size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="text-sm text-gray-500 text-center">Admin Dashboard v1.0</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header - Mobile Only */}
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
              <Grid3x3GapFill size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              {navigationItems.find((item) => item.id === activeSection)?.label}
            </h1>
            <div></div> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}

export default AdminDashboard
