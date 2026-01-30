import React, { createContext, useContext, useState, useEffect } from 'react';
import { GIFTS, APP_CONFIG } from '../config/gifts';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    // --- State ---
    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem('gift-casino-balance');
        return saved ? parseInt(saved, 10) : APP_CONFIG.STARTING_BALANCE;
    });

    const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem('gift-casino-inventory');
        return saved ? JSON.parse(saved) : [];
    });

    const [history, setHistory] = useState([]);

    // --- Effects ---
    useEffect(() => {
        localStorage.setItem('gift-casino-balance', balance);
    }, [balance]);

    useEffect(() => {
        localStorage.setItem('gift-casino-inventory', JSON.stringify(inventory));
    }, [inventory]);

    // --- Actions ---
    const addToBalance = (amount) => {
        setBalance(prev => prev + amount);
    };

    const playSpin = (mode = 'cheap') => {
        const cost = mode === 'cheap' ? APP_CONFIG.SPIN_COST_CHEAP : APP_CONFIG.SPIN_COST_EXPENSIVE;

        if (balance < cost) {
            return { success: false, error: 'Insufficient funds' };
        }

        setBalance(prev => prev - cost);

        // Weighted RNG
        const result = calculateSpinResult(mode);

        // Process Win
        if (!result.isLoss && !result.isCurrency) {
            const newItem = { ...result, uniqueId: Date.now() + Math.random() };
            setInventory(prev => [newItem, ...prev]);
            setHistory(prev => [newItem, ...prev].slice(0, 10)); // Keep last 10
        } else if (result.isCurrency) {
            // Instant payout for coin wins
            setTimeout(() => setBalance(prev => prev + result.stars), 2000); // 2s delay for animation sync
        }

        return { success: true, item: result };
    };

    const calculateSpinResult = (mode) => {
        const weightKey = mode === 'cheap' ? 'weightCheap' : 'weightExpensive';
        const totalWeight = GIFTS.reduce((sum, item) => sum + (item[weightKey] || 0), 0);

        let random = Math.random() * totalWeight;

        for (const item of GIFTS) {
            const weight = item[weightKey] || 0;
            if (random < weight) {
                return item;
            }
            random -= weight;
        }
        return GIFTS[0]; // Fallback
    };

    const value = {
        balance,
        inventory,
        history,
        addToBalance,
        playSpin
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};
