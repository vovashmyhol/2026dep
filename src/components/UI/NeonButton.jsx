import React from 'react';

export const NeonButton = ({ children, onClick, variant = 'primary', disabled, className, style }) => {
    const getGradient = () => {
        switch (variant) {
            case 'gold': return 'var(--gradient-gold)';
            case 'danger': return 'linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)';
            default: return 'var(--gradient-main)';
        }
    };

    const getGlow = () => {
        switch (variant) {
            case 'gold': return '0 0 20px rgba(255, 215, 0, 0.4)';
            case 'danger': return '0 0 20px rgba(244, 63, 94, 0.4)';
            default: return '0 0 20px rgba(0, 243, 255, 0.4)';
        }
    };

    return (
        <button
            onClick={disabled ? null : onClick}
            className={`btn-primary ${className || ''}`}
            style={{
                background: disabled ? '#333' : getGradient(),
                boxShadow: disabled ? 'none' : getGlow(),
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                width: '100%',
                ...style
            }}
        >
            {children}
        </button>
    );
};
