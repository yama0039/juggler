import React from 'react';
import type { JugglerRecord } from '../../types';
import { Disc } from 'lucide-react';
import clsx from 'clsx';

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
                totalGrape: acc.totalGrape + (record.grape || 0),
                totalInvestment: acc.totalInvestment + record.investment,
                totalRecovery: acc.totalRecovery + record.recovery,
            };
        },
        { totalSpins: 0, totalBig: 0, totalReg: 0, totalGrape: 0, totalInvestment: 0, totalRecovery: 0 }
    );

    const bigProb = stats.totalBig > 0 ? (stats.totalSpins / stats.totalBig).toFixed(1) : '-';
    const regProb = stats.totalReg > 0 ? (stats.totalSpins / stats.totalReg).toFixed(1) : '-';
    const grapeProb = stats.totalGrape > 0 ? (stats.totalSpins / stats.totalGrape).toFixed(3) : '-';

    const balance = stats.totalRecovery - stats.totalInvestment;
    const inCoins = stats.totalSpins * 3;
    const outCoins = inCoins + balance;
    const payoutRate = inCoins > 0 ? (outCoins / inCoins) * 100 : 0;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            <div className="bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-700 shadow-sm flex flex-col justify-center">
                <p className="text-gray-400 text-[10px] sm:text-xs mb-0.5 flex items-center">
                    <Disc size={10} className="mr-1 text-blue-400" />
                    回転 / ぶどう
                </p>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
                    <p className="text-lg sm:text-xl font-bold font-mono text-white leading-tight">
                        {stats.totalSpins.toLocaleString()}<span className="text-[10px] sm:text-xs font-normal text-gray-500 ml-0.5">G</span>
                    </p>
                    <p className="text-[10px] sm:text-xs font-mono text-green-400">
                        1/{grapeProb}
                    </p>
                </div>
            </div>
            
            <div className="bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-700 shadow-sm">
                <p className="text-gray-400 text-[10px] sm:text-xs mb-0.5">
                    収支 / 機械割
                </p>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
                    <p className={clsx("text-lg sm:text-xl font-bold font-mono leading-tight", balance >= 0 ? "text-juggler-neonYellow" : "text-red-400")}>
                        {balance > 0 ? '+' : ''}{balance.toLocaleString()}
                    </p>
                    <p className={clsx("text-[10px] sm:text-xs font-mono", payoutRate >= 100 ? "text-juggler-neonPink" : "text-blue-400")}>
                        {payoutRate > 0 ? payoutRate.toFixed(2) + '%' : '- %'}
                    </p>
                </div>
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
