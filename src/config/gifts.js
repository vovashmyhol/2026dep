/* 
  Configuration for all available gifts in the Casino.
  Includes Name, Icon (Emoji for now, but ready for images), Value, Rarity, and Probability Weight.
*/

export const GIFTS = [
    {
        id: "6028601630662853006",
        name: "Champagne",
        icon: "🍾",
        stars: 50,
        rarity: "rare", // common, rare, epic, legendary
        tier: "mid",
        weightCheap: 5, // Chance in Cheap Spin (low)
        weightExpensive: 20, // Chance in Expensive Spin (higher)
        color: "#4ADE80"
    },
    {
        id: "5170521118301225164",
        name: "Diamond",
        icon: "💎",
        stars: 100,
        rarity: "epic",
        tier: "high",
        weightCheap: 1,
        weightExpensive: 15,
        color: "#00F3FF"
    },
    {
        id: "5170690322832818290",
        name: "Ring",
        icon: "💍",
        stars: 100,
        rarity: "epic",
        tier: "high",
        weightCheap: 1,
        weightExpensive: 15,
        color: "#E879F9"
    },
    {
        id: "5168043875654172773",
        name: "Trophy",
        icon: "🏆",
        stars: 100,
        rarity: "epic",
        tier: "high",
        weightCheap: 1,
        weightExpensive: 15,
        color: "#FACC15"
    },
    {
        id: "5170564780938756245",
        name: "Rocket",
        icon: "🚀",
        stars: 50,
        rarity: "rare",
        tier: "mid",
        weightCheap: 5,
        weightExpensive: 20,
        color: "#F472B6"
    },
    {
        id: "5170314324215857265",
        name: "Bouquet",
        icon: "💐",
        stars: 50,
        rarity: "rare",
        tier: "mid",
        weightCheap: 5,
        weightExpensive: 20,
        color: "#FB7185"
    },
    {
        id: "5170144170496491616",
        name: "Cake",
        icon: "🎂",
        stars: 50,
        rarity: "rare",
        tier: "mid",
        weightCheap: 5,
        weightExpensive: 20,
        color: "#FDA4AF"
    },
    {
        id: "5168103777563050263",
        name: "Rose",
        icon: "🌹",
        stars: 25,
        rarity: "common",
        tier: "low",
        weightCheap: 20,
        weightExpensive: 5,
        color: "#F87171"
    },
    {
        id: "5170250947678437525",
        name: "Present",
        icon: "🎁",
        stars: 25,
        rarity: "common",
        tier: "low",
        weightCheap: 20,
        weightExpensive: 5,
        color: "#60A5FA"
    },
    {
        id: "5170233102089322756",
        name: "Bear",
        icon: "🧸",
        stars: 15,
        rarity: "common",
        tier: "low",
        weightCheap: 30,
        weightExpensive: 2,
        color: "#A78BFA"
    },
    {
        id: "5170145012310081615",
        name: "Heart",
        icon: "💝",
        stars: 15,
        rarity: "common",
        tier: "low",
        weightCheap: 30,
        weightExpensive: 2,
        color: "#F43F5E"
    },
    // "Nothing" or "Small Coin" filler items to make the wheel feel realistic
    {
        id: "miss-1",
        name: "Empty",
        icon: "💨",
        stars: 0,
        rarity: "common",
        tier: "trash",
        weightCheap: 50, // High chance to lose on cheap
        weightExpensive: 5, // Low chance to lose on expensive
        color: "#71717A",
        isLoss: true
    },
    {
        id: "coin-small",
        name: "Coins",
        icon: "🪙",
        stars: 5,
        rarity: "common",
        tier: "low",
        weightCheap: 20,
        weightExpensive: 10,
        color: "#CA8A04",
        isCurrency: true
    }
];

export const APP_CONFIG = {
    SPIN_COST_CHEAP: 100, // Credits
    SPIN_COST_EXPENSIVE: 1000,
    STARTING_BALANCE: 5000,
    REFERRAL_BONUS: 500,
    TASK_REWARD_DEFAULT: 250,
};
