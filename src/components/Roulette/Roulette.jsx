import React, { useState, useEffect, useRef } from 'react';
import { GIFTS } from '../../config/gifts';

const WHEEL_SIZE = 300;

export const Roulette = ({ spinning, targetItem, onSpinEnd }) => {
    const [rotation, setRotation] = useState(0);
    const wheelRef = useRef(null);

    // Calculate segment angle
    const segmentAngle = 360 / GIFTS.length;

    useEffect(() => {
        if (spinning && targetItem) {
            // Find index of target
            const targetIndex = GIFTS.findIndex(g => g.id === targetItem.id);

            // Calculate stopping angle
            // We want the winner at TOP (0 degrees) or pointer position.
            // Usually pointers are at top (rotate -90deg) or right. Let's assume pointer at top.
            // To get item i to top: Rotation + (i * segmentAngle) = 360 * N

            const extraSpins = 5; // Minimum full spins
            const randomOffset = (Math.random() - 0.5) * (segmentAngle * 0.8); // Add randomness within segment

            // Target rotation to land this specific segment at 0deg (top)
            // Since CSS rotate is clockwise, we need to act counter-intuitive or just do math.
            // If item 0 is at 0deg. Item 1 is at 360/N deg.
            // To bring Item 1 to 0deg, we rotate -360/N.
            // So targetRotation = - (index * segmentAngle).

            const destinationAngle = -(targetIndex * segmentAngle) + randomOffset;
            const totalRotation = rotation + (360 * extraSpins) + destinationAngle - (rotation % 360);

            setRotation(totalRotation);

            // Notify parent after animation
            // Match the CSS transition time
            const timer = setTimeout(() => {
                onSpinEnd();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [spinning, targetItem]);

    return (
        <div className="roulette-container" style={{
            position: 'relative',
            width: WHEEL_SIZE,
            height: WHEEL_SIZE,
            margin: '20px auto'
        }}>
            {/* Pointer */}
            <div style={{
                position: 'absolute',
                top: -15,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.5))'
            }}>
                <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '15px solid transparent',
                    borderRight: '15px solid transparent',
                    borderTop: '25px solid var(--neon-cyan)',
                }} />
            </div>

            {/* Wheel */}
            <div
                ref={wheelRef}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '4px solid var(--neon-gold)',
                    position: 'relative',
                    transition: spinning ? 'transform 5s cubic-bezier(0.1, 0, 0.1, 1)' : 'none',
                    transform: `rotate(${rotation}deg)`,
                    background: 'radial-gradient(circle at center, #222, #111)',
                    boxShadow: '0 0 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.8)',
                    overflow: 'hidden'
                }}>
                {GIFTS.map((gift, i) => (
                    <div key={gift.id} style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        width: '50%', // Use half width approach
                        height: '50%',
                        transformOrigin: '0% 100%', // Center of wheel
                        transform: `rotate(${i * segmentAngle}deg) translateX(-50%)`, // Adjust for width
                        // Wait, standard conic slice approach is better for background but divs are easier for content.
                        // Let's use a simpler approach: Place items radially.
                    }}>
                        {/* 
                    This layout approach is tricky for sectors. 
                    Better: Rotate a container for each item from the center.
                 */}
                    </div>
                ))}

                {/* Re-rendering items with proper radial positioning */}
                {GIFTS.map((gift, i) => {
                    const angle = (i * segmentAngle);
                    return (
                        <div key={gift.id} style={{
                            position: 'absolute',
                            height: '50%',
                            width: '40px', // Item width
                            left: 'calc(50% - 20px)',
                            top: '0',
                            transformOrigin: '50% 100%',
                            transform: `rotate(${angle}deg)`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingTop: '10px'
                        }}>
                            <span style={{ fontSize: '24px', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.8))' }}>{gift.icon}</span>
                            <span style={{
                                fontSize: '10px',
                                color: 'white',
                                textShadow: '0 1px 2px black',
                                maxWidth: '100%',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                            }}>{gift.stars || ''}</span>
                        </div>
                    );
                })}

                {/* Center Cap */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #333, #111)',
                    border: '2px solid var(--neon-gold)',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                }} />
            </div>
        </div>
    );
};
