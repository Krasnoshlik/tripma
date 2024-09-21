import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MainLayout from './components/MainLayout';
import Flight from './pages/Flight/Flight';
import PassengerInformation from './pages/PassengerInformation/PassengerInformation';
import SelectYourSeat from './pages/SelectYourSeat/SelectYourSeat';
import PayAndConfirm from './pages/PayAndConfirm/PayAndConfirm';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/flight" element={<Flight />} />
                    <Route path="/flight/passenger-Information" element={<PassengerInformation />} />
                    <Route path="/flight/airplane-seat" element={<SelectYourSeat />} />
                    <Route path='/flight/airplane-seat/pay-and-confirm' element={<PayAndConfirm/>} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default AppRoutes;
