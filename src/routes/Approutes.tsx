import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import NotFound from '../pages/NotFound';

// Import your page components here

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<NotFound />} />
            <Route path="mp" element={<Home />}/>
        </Routes>
    </Router>
);

export default AppRoutes;