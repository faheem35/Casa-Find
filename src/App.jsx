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

import React from 'react';
import './App.css';
import Auth from './pages/user/Auth';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/user/Home';
import Properties from './pages/user/Properties';
import PropertyDetails from './pages/user/PropertyDetails';
import Pnf from './pages/user/Pnf';
import Footer from './components/user/Footer';
import AdminAuth from './pages/admin/AdminAuth';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/propertyDetails" element={<PropertyDetails />} />
        <Route path="/*" element={<Pnf />} />

        
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister={true} />}  />
         <Route path="/adminLogin" element={<AdminAuth  />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
