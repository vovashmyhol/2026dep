import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { NeonButton } from '../components/UI/NeonButton';
import { CheckCircle, Youtube, MessageCircle, Twitter } from 'lucide-react';

const TASKS = [
    { id: 1, title: 'Subscribe to Telegram Channel', reward: 500, icon: <MessageCircle size={20} color="#0088cc" /> },
    { id: 2, title: 'Follow on Twitter (X)', reward: 500, icon: <Twitter size={20} color="#1DA1F2" /> },
    { id: 3, title: 'Watch Intro Video', reward: 250, icon: <Youtube size={20} color="#FF0000" /> },
    { id: 4, title: 'Join Community Chat', reward: 1000, icon: <MessageCircle size={20} color="#0088cc" /> },
    { id: 5, title: 'Repost Pin', reward: 500, icon: <Twitter size={20} color="#1DA1F2" /> },
];

const Tasks = () => {
    const { addToBalance } = useGame();
    const [completed, setCompleted] = useState(() => {
        const saved = localStorage.getItem('gift-casino-tasks');
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(null);

    const handleTask = (taskId, reward) => {
        if (completed.includes(taskId)) return;

        setLoading(taskId);

        // Mock verification delay
        setTimeout(() => {
            const newCompleted = [...completed, taskId];
            setCompleted(newCompleted);
            localStorage.setItem('gift-casino-tasks', JSON.stringify(newCompleted));
            addToBalance(reward);
            setLoading(null);
        }, 1500);
    };

    return (
        <div>
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '25px', textAlign: 'center' }}>
                <h2 className="text-gradient">Daily Tasks</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Complete tasks to earn more coins!</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {TASKS.map((task) => {
                    const isDone = completed.includes(task.id);
                    const isLoading = loading === task.id;

                    return (
                        <div key={task.id} className="glass-panel" style={{
                            padding: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            opacity: isDone ? 0.6 : 1
                        }}>
                            <div style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '10px',
                                borderRadius: '12px',
                                display: 'flex'
                            }}>
                                {task.icon}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{task.title}</div>
                                <div style={{ color: 'var(--neon-gold)', fontSize: '12px', fontWeight: 'bold' }}>+{task.reward} Coins</div>
                            </div>

                            <NeonButton
                                onClick={() => handleTask(task.id, task.reward)}
                                disabled={isDone || isLoading}
                                variant={isDone ? 'primary' : 'primary'}
                                style={{ width: 'auto', padding: '8px 16px', minWidth: '80px' }}
                            >
                                {isLoading ? (
                                    <span style={{ animation: 'spin 1s linear infinite', display: 'block' }}>⌛</span>
                                ) : isDone ? (
                                    <CheckCircle size={18} />
                                ) : (
                                    'Start'
                                )}
                            </NeonButton>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tasks;
