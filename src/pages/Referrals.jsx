import React, { useState } from 'react';
import { NeonButton } from '../components/UI/NeonButton';
import { Copy, Users } from 'lucide-react';
import { APP_CONFIG } from '../config/gifts';

const Referrals = () => {
    const [copied, setCopied] = useState(false);
    const inviteLink = "https://t.me/giftcasino_bot?start=12345"; // Mock

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <div className="glass-panel" style={{ padding: '30px', marginBottom: '25px', textAlign: 'center' }}>
                <Users size={48} color="var(--neon-cyan)" style={{ marginBottom: '15px' }} />
                <h2 className="text-gradient" style={{ marginBottom: '10px' }}>Invite Friends</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Invite your friends and get <span style={{ color: 'var(--neon-gold)' }}>+{APP_CONFIG.REFERRAL_BONUS} Coins</span> for each one!
                </p>

                <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    padding: '15px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: 'var(--neon-cyan)',
                        fontFamily: 'monospace',
                        fontSize: '14px'
                    }}>
                        {inviteLink}
                    </div>
                    <button
                        onClick={handleCopy}
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        <Copy size={20} />
                    </button>
                </div>

                <NeonButton onClick={handleCopy} variant="gold">
                    {copied ? 'Copied!' : 'Copy Invite Link'}
                </NeonButton>
            </div>

            <h3 className="section-title" style={{ marginLeft: '10px', marginBottom: '15px' }}>Your Referrals</h3>

            <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                <p>You haven't invited anyone yet.</p>
                <div style={{ fontSize: '40px', marginTop: '10px', opacity: 0.3 }}>🤷‍♂️</div>
            </div>
        </div>
    );
};

export default Referrals;
