import React from 'react';
import { useGame } from '../context/GameContext';
import { APP_CONFIG } from '../config/gifts';

const Profile = () => {
    const { inventory, balance, history } = useGame();

    // Group inventory by ID to show counts? Or just list them? 
    // Let's list recent first.

    return (
        <div>
            <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', marginBottom: '30px' }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'var(--gradient-main)', margin: '0 auto 15px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '40px'
                }}>
                    👤
                </div>
                <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>Player One</h2>
                <p style={{ color: 'var(--text-secondary)' }}>ID: 88392010</p>

                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '25px'
                }}>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '15px' }}>
                        <div style={{ fontSize: '24px', color: 'var(--neon-gold)', fontWeight: 'bold' }}>
                            {balance.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>Balance</div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '15px' }}>
                        <div style={{ fontSize: '24px', color: 'var(--neon-cyan)', fontWeight: 'bold' }}>
                            {inventory.length}
                        </div>
                        <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase' }}>Gifts Won</div>
                    </div>
                </div>
            </div>

            <h3 className="section-title" style={{ marginLeft: '10px', marginBottom: '15px' }}>Your Collection</h3>

            {inventory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#555' }}>
                    <p>No gifts yet. Go spin the wheel!</p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                    gap: '15px'
                }}>
                    {inventory.map((item, index) => (
                        <div key={item.uniqueId || index} className="glass-panel animate-slide-up" style={{
                            padding: '15px',
                            textAlign: 'center',
                            border: `1px solid ${item.color}`,
                            background: `linear-gradient(180deg, rgba(255,255,255,0.03) 0%, ${item.color}22 100%)`,
                            animationDelay: `${index * 0.05}s`
                        }}>
                            <div style={{ fontSize: '40px', marginBottom: '10px', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}>
                                {item.icon}
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>
                                {item.name}
                            </div>
                            <div style={{ fontSize: '10px', color: item.color, border: `1px solid ${item.color}`, display: 'inline-block', padding: '2px 6px', borderRadius: '10px' }}>
                                {item.rarity.toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
