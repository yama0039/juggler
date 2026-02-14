
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { JugglerRecord } from '../../types';

interface HistoryChartProps {
    records: JugglerRecord[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ records }) => {
    // 日付昇順にソートして累積収支を計算
    const sortedRecords = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let cumulativeBalance = 0;
    const data = sortedRecords.map(record => {
        const balance = record.recovery - record.investment;
        cumulativeBalance += balance;
        return {
            date: record.date,
            balance: balance,
            cumulative: cumulativeBalance
        };
    });

    const totalBalance = data.length > 0 ? data[data.length - 1].cumulative : 0;
    const winCount = records.filter(r => (r.recovery - r.investment) >= 0).length;
    const winRate = records.length > 0 ? (winCount / records.length) * 100 : 0;

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold mb-4 text-juggler-neonYellow">
                収支推移
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="p-3 bg-gray-900 rounded border border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">Total収支</p>
                    <p className={`text-lg font-bold ${totalBalance >= 0 ? 'text-juggler-neonYellow' : 'text-red-500'}`}>
                        {totalBalance > 0 ? '+' : ''}{totalBalance.toLocaleString()} 枚
                    </p>
                </div>
                <div className="p-3 bg-gray-900 rounded border border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">稼働日数</p>
                    <p className="text-lg font-bold text-white">{records.length} 日</p>
                </div>
                <div className="p-3 bg-gray-900 rounded border border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">勝率</p>
                    <p className="text-lg font-bold text-white">{winRate.toFixed(1)} %</p>
                </div>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 10 }} tickFormatter={(val) => val.slice(5)} />
                        <YAxis stroke="#9ca3af" tick={{ fontSize: 10 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: any) => [`${value}枚`, '累積収支']}
                        />
                        <Line type="monotone" dataKey="cumulative" stroke="#ff00ff" strokeWidth={2} dot={{ r: 4, fill: '#ff00ff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HistoryChart;
