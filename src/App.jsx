import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";


const AppWrapper = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
    
      <div className="flex flex-col min-h-screen">
        {!isDashboard && <Navbar />}

        <main className="flex-grow">
          <AppRoutes />
        </main>

        {!isDashboard && <Footer />}
      </div>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);

export default App;
