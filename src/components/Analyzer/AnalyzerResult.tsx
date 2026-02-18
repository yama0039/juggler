import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { SettingResult } from '../../utils/calculator';
import type { MachineSpec } from '../../data/machineSpecs';
import { TrendingUp, Coins, Info } from 'lucide-react';

interface AnalyzerResultProps {
    results: SettingResult[];
    expectedPayout: number;
    expectedDifference: (games: number) => number;
    machine: MachineSpec;
    inputData: {
        totalSpins: number;
        bigCount: number;
        regCount: number;
        grapeCount: number;
    };
}

const AnalyzerResult: React.FC<AnalyzerResultProps> = ({
    results,
    expectedPayout,
    expectedDifference,
    machine,
    inputData
}) => {
    // チャート用データ整形
    const chartData = results.map(r => ({
        name: `設定${r.setting}`,
        prob: r.probability,
        uv: r.probability
    })).sort((a, b) => {
        return parseInt(a.name.replace('設定', '')) - parseInt(b.name.replace('設定', ''));
    });

    const bestSetting = results.reduce((prev, current) =>
        (prev.probability > current.probability) ? prev : current
    );

    const isReliable = bestSetting.pValue >= 5;

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-6 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-juggler-neonPink flex items-center gap-2">
                判別結果
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1 font-bold">最も可能性の高い設定</p>
                    <div className="text-6xl font-black text-juggler-neonYellow drop-shadow-[0_0_15px_rgba(255,255,0,0.5)]">
                        設定 {bestSetting.setting}
                    </div>
                    <div className="mt-3 flex justify-center gap-4 text-sm">
                        <span className="text-gray-300">
                            期待度: <span className="font-bold text-juggler-neonPink">{bestSetting.probability.toFixed(1)}%</span>
                        </span>
                        <span className="text-gray-300">
                            適合(p値): <span className={`font-bold ${bestSetting.pValue < 5 ? 'text-red-500' : 'text-cyan-400'}`}>
                                {bestSetting.pValue.toFixed(2)}%
                            </span>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 flex items-center gap-4">
                        <div className="bg-green-500/10 p-2 rounded-full text-green-400">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">期待機械割 (加重平均)</p>
                            <p className="text-2xl font-black text-white">{expectedPayout.toFixed(2)}%</p>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 flex items-center gap-4">
                        <div className="bg-yellow-500/10 p-2 rounded-full text-yellow-500">
                            <Coins size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">この先の期待収支 (3000G)</p>
                            <p className={`text-2xl font-black ${expectedDifference(3000) >= 0 ? 'text-juggler-neonYellow' : 'text-red-400'}`}>
                                {expectedDifference(3000) >= 0 ? '+' : ''}{Math.round(expectedDifference(3000)).toLocaleString()} 枚
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {!isReliable && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg flex items-start gap-3">
                    <Info size={18} className="text-red-400 mt-1 shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-red-200 mb-1">理論値からの乖離注意</p>
                        <p className="text-xs text-red-300 leading-relaxed">
                            現在、判別された設定の理論上の挙動から統計的に大きく外れています。
                            短期間のヒキ強/ヒキ弱、あるいは他の設定を考慮するか、ホールの状況を再確認してください。
                        </p>
                    </div>
                </div>
            )}

            <div className="h-64 w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} unit="%" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: any) => [`${Number(value).toFixed(1)}%`, '期待度']}
                            labelStyle={{ color: '#e5e7eb' }}
                        />
                        <Bar dataKey="prob" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.prob > 30 ? '#ff00ff' : '#4b5563'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-center">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-900">
                        <tr>
                            <th className="px-3 py-3 border-b border-gray-700">設定</th>
                            <th className="px-3 py-3 border-b border-gray-700">期待度</th>
                            <th className="px-3 py-3 border-b border-gray-700">機械割</th>
                            <th className="px-3 py-3 border-b border-gray-700 text-red-400">BIG</th>
                            <th className="px-3 py-3 border-b border-gray-700 text-green-400">REG</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800">
                        <tr className="bg-gray-700/30">
                            <td className="px-3 py-3 font-bold text-white">現在値</td>
                            <td className="px-3 py-3">-</td>
                            <td className="px-3 py-3 font-bold">
                                {inputData.totalSpins > 0 ? (
                                    ((inputData.bigCount * 240 + inputData.regCount * 96 + (inputData.grapeCount || 0) * 8) / (inputData.totalSpins * 3) * 100).toFixed(1)
                                ) : '-'}%
                            </td>
                            <td className="px-3 py-3">
                                1/{inputData.bigCount > 0 ? (inputData.totalSpins / inputData.bigCount).toFixed(1) : '-'}
                            </td>
                            <td className="px-3 py-3">
                                1/{inputData.regCount > 0 ? (inputData.totalSpins / inputData.regCount).toFixed(1) : '-'}
                            </td>
                        </tr>
                        {results.map((r) => {
                            const s = machine.settings[r.setting];
                            return (
                                <tr key={r.setting} className="border-t border-gray-700">
                                    <td className="px-3 py-2 text-gray-300 font-bold">設定{r.setting}</td>
                                    <td className="px-3 py-2 font-mono text-juggler-neonPink">{r.probability.toFixed(1)}%</td>
                                    <td className="px-3 py-2 text-gray-400">{s.payout.toFixed(1)}%</td>
                                    <td className="px-3 py-2 text-gray-400">1/{s.big}</td>
                                    <td className="px-3 py-2 text-gray-400">1/{s.reg}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnalyzerResult;
