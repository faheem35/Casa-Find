// import React from 'react'
// import './App.css'
// import Auth from './pages/user/Auth'
// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/user/Home'
// import Properties from './pages/user/Properties'
// import PropertyDetails from './pages/user/PropertyDetails'
// import Pnf from './pages/user/Pnf'
// import Footer from './components/user/Footer'

// const App = () => {
//   return (
//     <>
//       <Routes>

//         <Route path='/' element={<Home/>}/>
//         <Route path='/properties' element={<Properties/>}/>
//         <Route path='/propertyDetails' element={<PropertyDetails/>}/>
//         <Route path='/*' element={<Pnf/>} />

//           <Route path='/login' element={<Auth />} />
//         <Route path='/register' element={<Auth insideRegister={true} />}  />

//       </Routes>

//       <Footer />
//     </>
//   )
// }

// export default App



// import React from 'react';
// import './App.css';
// import Auth from './pages/user/Auth';
// import { Route, Routes } from 'react-router-dom';
// import Home from './pages/user/Home';
// import Properties from './pages/user/Properties';
// import Pnf from './pages/user/Pnf';
// import Footer from './components/user/Footer';
// import AdminAuth from './pages/admin/AdminAuth';
// import Dashboard from './pages/user/Dashboard';
// import PropertyDetails from './pages/user/PropertyDetails';
// import BookmarkedProperties from './pages/user/BookmarkedProperties';

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/properties" element={<Properties />} />
//         <Route path="/property/:id" element={<PropertyDetails />} />
       
//        <Route path="/bookmarks" element={<BookmarkedProperties />} />

//         <Route path="/*" element={<Pnf />} />

        
//         <Route path="/login" element={<Auth />} />
//         <Route path="/register" element={<Auth insideRegister={true} />}  />
//          <Route path="/adminLogin" element={<AdminAuth  />} />
//       </Routes>

//       <Footer />
//     </>
//   );
// };

// export default App;



import React, { useContext, useEffect } from 'react';
import './App.css';
import Auth from './pages/user/Auth';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/user/Home';
import Properties from './pages/user/Properties';
import Pnf from './pages/user/Pnf';
import Footer from './components/user/Footer';
import AdminAuth from './pages/admin/AdminAuth';
import Dashboard from './pages/user/Dashboard';
import PropertyDetails from './pages/user/PropertyDetails';
import BookmarkedProperties from './pages/user/BookmarkedProperties';
import { tokenAuthContext } from './contexts/AuthContextAPI';
import About from './pages/user/About';
import Contact from './pages/user/Contact';
import ManageProperties from './pages/admin/ManageProperties';
import ManageUsers from './pages/admin/ManageUsers';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsAuthorised(true);
    } else {
      setIsAuthorised(false);
    }
  }, [isAuthorised]); // Keeps in sync with session

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
       
        
        {/* Conditionally render protected routes */}
        {isAuthorised && (
          <>
                 
            <Route path="/properties" element={<Properties />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookmarks" element={<BookmarkedProperties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </>
        )}

        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister={true} />} />
        <Route path="/adminLogin" element={<AdminAuth />} />
         <Route path="/manageProperties" element={<ManageProperties />} />
          <Route path="/manageUsers" element={<ManageUsers />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />


        {/* Catch-all */}
        <Route path="/*" element={<Pnf />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
