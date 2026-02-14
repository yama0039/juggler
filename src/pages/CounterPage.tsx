import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircleCounter from '../components/Counter/CircleCounter';
import { RotateCcw, Save } from 'lucide-react';

const CounterPage = () => {
    const navigate = useNavigate();

    // State for counts
    const [counts, setCounts] = useState(() => {
        const saved = localStorage.getItem('juggler_counter_data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse saved counter data', e);
            }
        }
        return {
            StartGame: 0,
            TotalGame: 0,
            IsolatedBig: 0,
            IsolatedReg: 0,
            CherryBig: 0,
            CherryReg: 0,
            Grape: 0,
            NonOverlappingCherry: 0
        };
    });

    // Save to localStorage whenever counts change
    React.useEffect(() => {
        localStorage.setItem('juggler_counter_data', JSON.stringify(counts));
    }, [counts]);

    // Determine current processing game count (TotalGame - StartGame)
    const currentGames = Math.max(0, counts.TotalGame - counts.StartGame);

    const increment = (key: keyof typeof counts) => {
        setCounts((prev: typeof counts) => ({
            ...prev,
            [key]: prev[key] + 1
        }));
    };

    const decrement = (key: keyof typeof counts) => {
        setCounts((prev: typeof counts) => ({
            ...prev,
            [key]: Math.max(0, prev[key] - 1)
        }));
    };

    const reset = () => {
        if (window.confirm('カウンターをリセットしますか？')) {
            localStorage.removeItem('juggler_counter_data');
            setCounts({
                StartGame: 0,
                TotalGame: 0,
                IsolatedBig: 0,
                IsolatedReg: 0,
                CherryBig: 0,
                CherryReg: 0,
                Grape: 0,
                NonOverlappingCherry: 0
            });
        }
    };

    const handleTransfer = () => {
        if (window.confirm('現在のカウントデータを入力画面に転送しますか？')) {
            navigate('/record', { state: { counterData: counts } });
        }
    };

    return (
        <div className="max-w-md mx-auto pb-20">
            {/* Header / Controls */}
            <div className="flex justify-between items-center mb-6 pt-2">
                <h2 className="text-xl font-bold flex items-center">
                    <span className="w-2 h-6 bg-juggler-neonGreen mr-2 rounded-full"></span>
                    小役カウンター
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleTransfer}
                        className="p-2 text-cyan-400 hover:text-cyan-300 rounded-full hover:bg-gray-800 transition"
                        title="入力画面へ転送"
                    >
                        <Save size={20} />
                    </button>
                    <button
                        onClick={reset}
                        className="p-2 text-gray-400 hover:text-red-400 rounded-full hover:bg-gray-800 transition"
                        title="リセット"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>

            {/* Game Count Display using Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-900 p-4 rounded-xl border border-gray-700">
                <div>
                    <label className="block text-xs text-gray-400 mb-1 text-center font-bold">打ち始め</label>
                    <input
                        type="number"
                        className="w-full bg-gray-800 text-center text-xl font-mono font-bold text-cyan-400 rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 border border-gray-700"
                        value={counts.StartGame}
                        onChange={(e) => setCounts((prev: any) => ({ ...prev, StartGame: parseInt(e.target.value) || 0 }))}
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1 text-center font-bold">総ゲーム数</label>
                    <input
                        type="number"
                        className="w-full bg-gray-800 text-center text-xl font-mono font-bold text-white rounded p-2 focus:outline-none focus:ring-1 focus:ring-white border border-gray-700"
                        value={counts.TotalGame}
                        onChange={(e) => setCounts((prev: any) => ({ ...prev, TotalGame: parseInt(e.target.value) || 0 }))}
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                </div>
                {/* Calculated Interval Games */}
                <div className="col-span-2 text-center border-t border-gray-800 pt-2 mt-2">
                    <span className="text-sm text-gray-500 mr-2 font-bold">区間ゲーム数:</span>
                    <span className="text-xl font-bold text-juggler-neonYellow font-mono">{currentGames} G</span>
                </div>
            </div>

            {/* Fixed Grid for better layout control */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 justify-items-center">
                <CircleCounter
                    label="単独 BIG"
                    count={counts.IsolatedBig}
                    totalSpins={currentGames}
                    color="red"
                    onClick={() => increment('IsolatedBig')}
                    onDecrement={() => decrement('IsolatedBig')}
                />

                <CircleCounter
                    label="単独 REG"
                    count={counts.IsolatedReg}
                    totalSpins={currentGames}
                    color="blue"
                    onClick={() => increment('IsolatedReg')}
                    onDecrement={() => decrement('IsolatedReg')}
                />

                <CircleCounter
                    label="チェリー BIG"
                    count={counts.CherryBig}
                    totalSpins={currentGames}
                    color="red"
                    onClick={() => increment('CherryBig')}
                    onDecrement={() => decrement('CherryBig')}
                />

                <CircleCounter
                    label="チェリー REG"
                    count={counts.CherryReg}
                    totalSpins={currentGames}
                    color="blue"
                    onClick={() => increment('CherryReg')}
                    onDecrement={() => decrement('CherryReg')}
                />

                <CircleCounter
                    label="ぶどう"
                    count={counts.Grape}
                    totalSpins={currentGames}
                    color="green"
                    onClick={() => increment('Grape')}
                    onDecrement={() => decrement('Grape')}
                />

                <CircleCounter
                    label="非重複チェリー"
                    count={counts.NonOverlappingCherry}
                    totalSpins={currentGames}
                    color="purple"
                    onClick={() => increment('NonOverlappingCherry')}
                    onDecrement={() => decrement('NonOverlappingCherry')}
                />
            </div>
        </div>
    );
};

export default CounterPage;
