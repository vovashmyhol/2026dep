import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, ListChecks, Users, User, Gift } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const Layout = ({ children }) => {
    const { balance } = useGame();

    return (
        <>
            <div className="container">
                {/* Header */}
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    padding: '10px 0'
                }}>
                    <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>🎰</span>
                        <span className="text-gradient" style={{ fontSize: '20px' }}>Gift Casino</span>
                    </div>

                    <div className="balance-chip" style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid var(--neon-gold)',
                        borderRadius: '20px',
                        padding: '5px 15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--neon-gold)',
                        fontWeight: 'bold',
                        boxShadow: '0 0 10px rgba(255, 215, 0, 0.2)'
                    }}>
                        <span>🪙</span>
                        <span>{balance.toLocaleString()}</span>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="animate-slide-up">
                    {children}
                </main>

                {/* Spacer for Bottom Nav */}
                <div style={{ height: '80px' }}></div>
            </div>

            {/* Bottom Navigation */}
            <nav style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(9, 9, 11, 0.95)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-around',
                height: 'var(--nav-height)',
                zIndex: 100,
                paddingBottom: 'safe-area-inset-bottom'
            }}>
                <NavItem to="/" icon={<Home size={24} />} label="Play" />
                <NavItem to="/tasks" icon={<ListChecks size={24} />} label="Tasks" />
                <NavItem to="/referrals" icon={<Users size={24} />} label="Invite" />
                <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
            </nav>
        </>
    );
};

const NavItem = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            style={({ isActive }) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: isActive ? 'var(--neon-cyan)' : 'var(--text-secondary)',
                textDecoration: 'none',
                flex: 1,
                gap: '4px',
                fontSize: '12px',
                fontWeight: 600,
                transition: 'all 0.3s ease'
            })}
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};
