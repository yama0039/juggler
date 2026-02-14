
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { SettingResult } from '../../utils/calculator';
import type { MachineSpec } from '../../data/machineSpecs';

interface AnalyzerResultProps {
    results: SettingResult[];
    machine: MachineSpec;
    inputData: {
        totalSpins: number;
        bigCount: number;
        regCount: number;
        grapeCount: number;
    };
}

const AnalyzerResult: React.FC<AnalyzerResultProps> = ({ results, machine, inputData }) => {
    // チャート用データ整形
    const chartData = results.map(r => ({
        name: `設定${r.setting}`,
        prob: r.probability,
        uv: r.probability
    })).sort((a, b) => {
        // 設定1〜6の順に並び替え
        return parseInt(a.name.replace('設定', '')) - parseInt(b.name.replace('設定', ''));
    });

    // 最も可能性が高い設定
    const bestSetting = results.reduce((prev, current) =>
        (prev.probability > current.probability) ? prev : current
    );

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mt-6 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-juggler-neonPink">
                判別結果
            </h3>

            <div className="mb-6 text-center">
                <p className="text-gray-400 text-sm">推定設定</p>
                <div className="text-5xl font-bold text-juggler-neonYellow drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]">
                    設定 {bestSetting.setting}
                </div>
                <p className="text-sm text-gray-500 mt-1">信頼度: {bestSetting.probability.toFixed(1)}%</p>
            </div>

            <div className="h-64 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} unit="%" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: any) => [`${value.toFixed(1)}%`, '確率']}
                        />
                        <Bar dataKey="prob" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.prob > 20 ? '#ff00ff' : '#4b5563'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                        <tr>
                            <th className="px-3 py-2">設定</th>
                            <th className="px-3 py-2">BIG確率</th>
                            <th className="px-3 py-2">REG確率</th>
                            <th className="px-3 py-2">ブドウ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-3 py-2 font-bold text-white">現在値</td>
                            <td className="px-3 py-2">
                                1/{inputData.bigCount > 0 ? (inputData.totalSpins / inputData.bigCount).toFixed(1) : '-'}
                            </td>
                            <td className="px-3 py-2">
                                1/{inputData.regCount > 0 ? (inputData.totalSpins / inputData.regCount).toFixed(1) : '-'}
                            </td>
                            <td className="px-3 py-2">
                                1/{inputData.grapeCount > 0 ? (inputData.totalSpins / inputData.grapeCount).toFixed(2) : '-'}
                            </td>
                        </tr>
                        {Object.keys(machine.settings).map(Number).map((setting) => {
                            const s = machine.settings[setting];
                            return (
                                <tr key={setting} className="border-t border-gray-700">
                                    <td className="px-3 py-2">設定{setting}</td>
                                    <td className="px-3 py-2">1/{s.big}</td>
                                    <td className="px-3 py-2">1/{s.reg}</td>
                                    <td className="px-3 py-2">1/{s.grape || '-'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnalyzerResult;
