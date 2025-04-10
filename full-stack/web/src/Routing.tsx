import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DrawerNavigation from "./components/DrawerNavigation/DrawerNavigation";


const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Services = () => <h2>Services Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

const Routing: React.FC = () => {
  return (
    <Router>
      <DrawerNavigation />
      <div style={{ marginLeft: 260, padding: "16px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Routing;
