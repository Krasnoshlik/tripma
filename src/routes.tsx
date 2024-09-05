import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MainLayout from './components/MainLayout';
import Flight from './pages/Flight/Flight';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/flight" element={<Flight />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default AppRoutes;
