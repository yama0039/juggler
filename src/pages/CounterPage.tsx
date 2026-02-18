import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircleCounter from '../components/Counter/CircleCounter';
import { RotateCcw, Save, BarChart2, ChevronDown, Table as TableIcon, Info } from 'lucide-react';
import { machineSpecs, type JugglerModel } from '../data/machineSpecs';

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

    // State for selected machine
    const [selectedMachineId, setSelectedMachineId] = useState<JugglerModel>(() => {
        return (localStorage.getItem('juggler_selected_machine') as JugglerModel) || 'my-juggler-v';
    });

    const selectedMachine = useMemo(() =>
        machineSpecs.find(m => m.id === selectedMachineId) || machineSpecs[0]
        , [selectedMachineId]);

    // Save to localStorage whenever counts change
    useEffect(() => {
        localStorage.setItem('juggler_counter_data', JSON.stringify(counts));
    }, [counts]);

    // Save selected machine to localStorage
    useEffect(() => {
        localStorage.setItem('juggler_selected_machine', selectedMachineId);
    }, [selectedMachineId]);

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

    // Combined calculations
    const totalBig = counts.IsolatedBig + counts.CherryBig;
    const totalReg = counts.IsolatedReg + counts.CherryReg;
    const totalBonus = totalBig + totalReg;

    const calcProb = (count: number) => {
        return count > 0 ? (currentGames / count).toFixed(1) : '-';
    };

    return (
        <div className="max-w-2xl mx-auto pb-24 px-4">
            {/* Header / Machine Selector */}
            <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm py-4 border-b border-gray-800 mb-6 -mx-4 px-4 h-[72px] flex items-center justify-between">
                <div className="relative flex-1 max-w-[200px]">
                    <select
                        value={selectedMachineId}
                        onChange={(e) => setSelectedMachineId(e.target.value as JugglerModel)}
                        className="w-full bg-gray-800 text-white font-bold py-2 pl-3 pr-10 rounded-lg border border-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-juggler-neonPink transition-all text-sm"
                    >
                        {machineSpecs.map(spec => (
                            <option key={spec.id} value={spec.id}>{spec.name}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleTransfer}
                        className="p-2.5 text-cyan-400 hover:text-cyan-300 rounded-lg bg-gray-800 border border-gray-700 transition"
                        title="入力画面へ転送"
                    >
                        <Save size={20} />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('現在のカウントデータで設定判別を行いますか？')) {
                                navigate('/analyzer', { state: { counterData: counts, machineId: selectedMachineId } });
                            }
                        }}
                        className="p-2.5 text-juggler-neonPink hover:text-pink-400 rounded-lg bg-gray-800 border border-gray-700 transition"
                        title="設定判別"
                    >
                        <BarChart2 size={20} />
                    </button>
                    <button
                        onClick={reset}
                        className="p-2.5 text-gray-400 hover:text-red-400 rounded-lg bg-gray-800 border border-gray-700 transition"
                        title="リセット"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>
            </div>

            {/* Game Count Display using Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <div>
                    <label className="block text-[10px] text-gray-500 mb-1 text-center font-black uppercase tracking-tighter">打ち始め</label>
                    <input
                        type="number"
                        className="w-full bg-gray-900 text-center text-xl font-mono font-bold text-cyan-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-gray-700"
                        value={counts.StartGame}
                        onChange={(e) => setCounts((prev: any) => ({ ...prev, StartGame: parseInt(e.target.value) || 0 }))}
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                </div>
                <div>
                    <label className="block text-[10px] text-gray-500 mb-1 text-center font-black uppercase tracking-tighter">現在回転数</label>
                    <input
                        type="number"
                        className="w-full bg-gray-900 text-center text-xl font-mono font-bold text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white border border-gray-700"
                        value={counts.TotalGame}
                        onChange={(e) => setCounts((prev: any) => ({ ...prev, TotalGame: parseInt(e.target.value) || 0 }))}
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                </div>
                <div className="col-span-2 text-center border-t border-gray-700 pt-3 mt-1">
                    <span className="text-xs text-gray-500 mr-2 font-bold uppercase tracking-widest">区間ゲーム数</span>
                    <span className="text-2xl font-black text-juggler-neonYellow font-mono tracking-tighter">{currentGames.toLocaleString()} G</span>
                </div>
            </div>

            {/* Combined Probability Panel */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-center">
                    <p className="text-[10px] text-gray-500 font-bold mb-1">TOTAL BIG</p>
                    <p className="text-xl font-black text-red-500 leading-none">{totalBig}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-mono">1/{calcProb(totalBig)}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-center">
                    <p className="text-[10px] text-gray-500 font-bold mb-1">TOTAL REG</p>
                    <p className="text-xl font-black text-blue-500 leading-none">{totalReg}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-mono">1/{calcProb(totalReg)}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-center">
                    <p className="text-[10px] text-gray-500 font-bold mb-1">合算</p>
                    <p className="text-xl font-black text-juggler-neonYellow leading-none">{totalBonus}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-mono">1/{calcProb(totalBonus)}</p>
                </div>
            </div>

            {/* Counters Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-12 place-items-center">
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

            {/* Settings Table Section */}
            <div className="mt-12 mb-8 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                    <TableIcon size={18} className="text-juggler-neonGreen" />
                    <h3 className="text-lg font-bold text-white font-black italic">{selectedMachine.name} 設定差</h3>
                </div>

                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-center">
                            <thead>
                                <tr className="bg-gray-900 text-gray-400 uppercase font-black tracking-tighter border-b border-gray-700">
                                    <th className="px-2 py-3 border-r border-gray-800">設定</th>
                                    <th className="px-2 py-3 text-red-500">BIG合算</th>
                                    <th className="px-2 py-3 text-blue-500">REG合算</th>
                                    <th className="px-2 py-3 text-juggler-neonYellow">合算</th>
                                    <th className="px-2 py-3 text-green-500">ぶどう</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6].map(setting => {
                                    const s = selectedMachine.settings[setting];
                                    const totalBonusProb = 1 / ((1 / s.big) + (1 / s.reg));
                                    return (
                                        <tr key={setting} className="border-b border-gray-700/50 last:border-0 hover:bg-gray-750 transition-colors">
                                            <td className="px-2 py-3 font-black bg-gray-900/30 border-r border-gray-700/50 text-white italic">設定{setting}</td>
                                            <td className="px-2 py-3 font-mono text-gray-300">1/{s.big.toFixed(1)}</td>
                                            <td className="px-2 py-3 font-mono text-gray-300 font-bold">1/{s.reg.toFixed(1)}</td>
                                            <td className="px-2 py-3 font-mono text-white font-black">1/{totalBonusProb.toFixed(1)}</td>
                                            <td className="px-2 py-3 font-mono text-gray-300">1/{(s.grape || 0).toFixed(3)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 flex items-start gap-3">
                    <Info size={16} className="text-gray-500 mt-0.5" />
                    <p className="text-[10px] text-gray-500 leading-relaxed font-bold">
                        ※上記確率はけんのスロット独自解析値に基づくものです。<br />
                        単独/チェリー重複などのより詳細な設定差は「設定判別」ボタンから確認・判別できます。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CounterPage;
