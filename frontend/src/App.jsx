import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Programs from "./components/Programs/programs";
import Title from "./components/Title/Title";
import About from "./components/About/About";
import Company from "./components/Company/Company";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import PasswordReset from "./components/Auth/PasswordReset";
import InfoPage from "./components/InfoPage/InfoPage";
import CompanyInfo from "./components/CompanyInfo/CompanyInfo";

const MainPage = () => {
  const [playState, setPlayState] = useState(false);

  return (
    <>
      <Navbar />
      <Hero />
      <div className="container">
        <Title
          subTitle="We Connect You With Our Top HR Managers And Talented Employees."
          title="Our Team"
        />
        <Programs />
        <About setPlayState={setPlayState} />
        <Title
          subTitle="We Help All Businesses Take Care Of Their People."
          title="Company"
        />
        <Company />
        <Title subTitle="TESTIMONIALS" title="Hear From Our Clients" />
        <Testimonials />
        <Title subTitle="Contact Us" title="Get In Touch" />
        <Contact />
      </div>
      <Footer />
      <VideoPlayer playState={playState} setPlayState={setPlayState} />
    </>
  );
};

const App = () => {
  const [user, setUser] = useState(null); // ✅ Track logged-in user

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} /> 
        <Route path="/dashboard" element={<Dashboard user={user} />} /> 
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/company-info" element={<CompanyInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
