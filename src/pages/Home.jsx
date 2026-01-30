import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Roulette } from '../components/Roulette/Roulette';
import { NeonButton } from '../components/UI/NeonButton';
import { APP_CONFIG } from '../config/gifts';

const Home = () => {
    const { playSpin, balance } = useGame();
    const [spinning, setSpinning] = useState(false);
    const [spinResult, setSpinResult] = useState(null);
    const [winPopup, setWinPopup] = useState(null);

    const handleSpin = (mode) => {
        if (spinning) return;

        const result = playSpin(mode);
        if (result.success) {
            setSpinResult(result.item);
            setSpinning(true);
            setWinPopup(null);
        } else {
            alert(result.error); // Simple feedback for now
        }
    };

    const handleSpinEnd = () => {
        setSpinning(false);
        setWinPopup(spinResult);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
                <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '10px' }}>Roulette</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Spin to win exclusive Telegram gifts!</p>
            </div>

            <Roulette
                spinning={spinning}
                targetItem={spinResult}
                onSpinEnd={handleSpinEnd}
            />

            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <div style={{ flex: 1 }}>
                    <NeonButton
                        onClick={() => handleSpin('cheap')}
                        disabled={spinning || balance < APP_CONFIG.SPIN_COST_CHEAP}
                        variant="primary"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span>Cheap Spin</span>
                            <span style={{ fontSize: '0.8em', opacity: 0.8 }}>💰 {APP_CONFIG.SPIN_COST_CHEAP}</span>
                        </div>
                    </NeonButton>
                </div>

                <div style={{ flex: 1 }}>
                    <NeonButton
                        onClick={() => handleSpin('expensive')}
                        disabled={spinning || balance < APP_CONFIG.SPIN_COST_EXPENSIVE}
                        variant="gold"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span>Premium Spin</span>
                            <span style={{ fontSize: '0.8em', opacity: 0.8 }}>💰 {APP_CONFIG.SPIN_COST_EXPENSIVE}</span>
                        </div>
                    </NeonButton>
                </div>
            </div>

            {/* Win Popup Overlay */}
            {winPopup && (
                <div className="win-overlay" style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.85)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div className="glass-panel animate-slide-up" style={{
                        padding: '40px',
                        maxWidth: '90%',
                        width: '350px',
                        textAlign: 'center',
                        border: `2px solid ${winPopup.color || 'white'}`
                    }}>
                        <div style={{ fontSize: '80px', marginBottom: '20px', animation: 'float 3s infinite' }}>
                            {winPopup.icon}
                        </div>

                        <h2 style={{
                            fontSize: '28px',
                            color: winPopup.color || 'white',
                            marginBottom: '10px',
                            textShadow: `0 0 20px ${winPopup.color}`
                        }}>
                            {winPopup.isLoss ? 'Oof!' : 'You Won!'}
                        </h2>

                        <h3 className="text-gradient" style={{ fontSize: '24px', marginBottom: '20px' }}>
                            {winPopup.name}
                        </h3>

                        {!winPopup.isLoss && (
                            <p style={{ marginBottom: '20px', color: '#ccc' }}>
                                Value: {winPopup.stars} Stars
                            </p>
                        )}

                        <NeonButton onClick={() => setWinPopup(null)}>
                            Awesome!
                        </NeonButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
