import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const App = () => (
  <BrowserRouter>
   <div className="flex flex-col min-h-screen">
        {/* Navbar at the top */}
        <Navbar />

        {/* Page content */}
        <main className="flex-grow">
          <AppRoutes />
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
  </BrowserRouter>
);

export default App;
