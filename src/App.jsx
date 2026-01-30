import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { Layout } from './components/Layout/Layout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Referrals from './pages/Referrals';
import Profile from './pages/Profile';

function App() {
    return (
        <GameProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/referrals" element={<Referrals />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Layout>
            </Router>
        </GameProvider>
    );
}

export default App;
