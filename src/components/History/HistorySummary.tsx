import React from 'react';
import type { JugglerRecord } from '../../types';
import { Disc } from 'lucide-react';

interface HistorySummaryProps {
    records: JugglerRecord[];
}

const HistorySummary: React.FC<HistorySummaryProps> = ({ records }) => {
    const stats = records.reduce(
        (acc, record) => {
            const big = (record.isolated_big || 0) + (record.cherry_big || 0);
            const reg = (record.isolated_reg || 0) + (record.cherry_reg || 0);

            return {
                totalSpins: acc.totalSpins + record.total_spins,
                totalBig: acc.totalBig + big,
                totalReg: acc.totalReg + reg,
            };
        },
        { totalSpins: 0, totalBig: 0, totalReg: 0 }
    );

    const bigProb = stats.totalBig > 0 ? (stats.totalSpins / stats.totalBig).toFixed(1) : '-';
    const regProb = stats.totalReg > 0 ? (stats.totalSpins / stats.totalReg).toFixed(1) : '-';

    return (
        <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-700 shadow-sm flex flex-col justify-center">
                <p className="text-gray-400 text-[10px] sm:text-xs mb-0.5 flex items-center">
                    <Disc size={10} className="mr-1 text-blue-400" />
                    回転
                </p>
                <p className="text-lg sm:text-xl font-bold font-mono text-white leading-tight">
                    {stats.totalSpins.toLocaleString()}<span className="text-[10px] font-normal text-gray-500 ml-0.5">G</span>
                </p>
            </div>
            <div className="bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-700 shadow-sm">
                <p className="text-gray-400 text-[10px] sm:text-xs mb-0.5">
                    <span className="text-red-400 font-bold mr-1">BB</span>
                    回数 / 確率
                </p>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
                    <p className="text-lg sm:text-xl font-bold font-mono text-white leading-tight">{stats.totalBig}</p>
                    <p className="text-[10px] sm:text-xs font-mono text-gray-500">1/{bigProb}</p>
                </div>
            </div>
            <div className="bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-700 shadow-sm">
                <p className="text-gray-400 text-[10px] sm:text-xs mb-0.5">
                    <span className="text-green-400 font-bold mr-1">RB</span>
                    回数 / 確率
                </p>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
                    <p className="text-lg sm:text-xl font-bold font-mono text-white leading-tight">{stats.totalReg}</p>
                    <p className="text-[10px] sm:text-xs font-mono text-gray-500">1/{regProb}</p>
                </div>
            </div>
        </div>
    );
};

export default HistorySummary;
