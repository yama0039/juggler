import React, { useState } from 'react';
import type { JugglerRecord } from '../../types';
import { machineSpecs } from '../../data/machineSpecs';
import { Disc, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';

interface HistoryListProps {
    records: JugglerRecord[];
    onDelete?: (id: string) => Promise<void>;
}

const HistoryItem: React.FC<{ record: JugglerRecord; onDelete?: (id: string) => Promise<void> }> = ({ record, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getMachineName = (id: string) => {
        return machineSpecs.find(s => s.id === id)?.name || id;
    };

    const balance = record.recovery - record.investment;
    const isWin = balance >= 0;

    const inCoins = record.total_spins * 3;
    const outCoins = inCoins + balance;
    const payoutRate = inCoins > 0 ? (outCoins / inCoins) * 100 : 0;

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDelete && window.confirm('このデータを削除してもよろしいですか？')) {
            await onDelete(record.id);
        }
    };

    return (
        <div
            className={`bg-gray-800 rounded-lg border shadow-md transition-all duration-200 overflow-hidden ${isExpanded ? 'border-juggler-neonPink ring-1 ring-juggler-neonPink' : 'border-gray-700 hover:border-gray-500'}`}
        >
            <div
                className="p-4 cursor-pointer relative group"
                onClick={handleToggle}
            >
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-gray-400 text-sm">{record.date} @ {record.hall_name}</p>
                        <div className="flex items-center mt-1">
                            <h4 className="font-bold text-lg text-white mr-2">{getMachineName(record.machine_type)}</h4>
                            {record.machine_number && (
                                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                    #{record.machine_number}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="text-right pr-8">
                        <p className={clsx("text-xl font-bold font-mono", isWin ? "text-juggler-neonYellow" : "text-red-400")}>
                            {balance > 0 ? '+' : ''}{balance.toLocaleString()} 枚
                        </p>
                        <p className="text-[11px] text-gray-400 mb-0.5">
                            投資: {record.investment.toLocaleString()} / 回収: {record.recovery.toLocaleString()}
                        </p>
                        <p className={clsx("text-xs font-bold font-mono", payoutRate >= 100 ? "text-juggler-neonPink" : "text-blue-400")}>
                            割: {payoutRate.toFixed(2)}%
                        </p>
                    </div>

                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                </div>

                {/* Delete Button */}
                {onDelete && (
                    <button
                        onClick={handleDelete}
                        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-800 rounded-full"
                        title="削除"
                    >
                        <Trash2 size={18} />
                    </button>
                )}

                <div className="flex flex-wrap gap-2 mt-3 text-sm text-gray-300">
                    <div className="flex items-center bg-gray-900 px-2 py-1 rounded">
                        <Disc size={14} className="mr-1 text-blue-400" />
                        {record.total_spins} G
                    </div>
                    <div className="flex items-center bg-gray-900 px-2 py-1 rounded">
                        <span className="text-red-400 font-bold mr-1">BB</span>
                        {record.isolated_big !== undefined && record.cherry_big !== undefined ?
                            (record.isolated_big + record.cherry_big) : '-'}
                    </div>
                    <div className="flex items-center bg-gray-900 px-2 py-1 rounded">
                        <span className="text-green-400 font-bold mr-1">RB</span>
                        {record.isolated_reg !== undefined && record.cherry_reg !== undefined ?
                            (record.isolated_reg + record.cherry_reg) : '-'}
                    </div>
                    {record.grape ? (
                        <div className="flex items-center bg-gray-900 px-2 py-1 rounded">
                            <span className="text-purple-400 font-bold mr-1">🍇</span>
                            1/{(record.total_spins / record.grape).toFixed(2)}
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-700 bg-gray-800/50">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm text-gray-300">
                        <div>
                            <p className="text-gray-500 text-xs mb-1">BB詳細</p>
                            <p>単独: {record.isolated_big}</p>
                            <p>チェリー: {record.cherry_big}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">RB詳細</p>
                            <p>単独: {record.isolated_reg}</p>
                            <p>チェリー: {record.cherry_reg}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">小役</p>
                            <p>ぶどう: {record.grape} (1/{(record.grape ? (record.total_spins / record.grape).toFixed(2) : '-')})</p>
                            <p>チェリー: {record.non_overlapping_cherry}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs mb-1">メモ</p>
                            <p className="whitespace-pre-wrap">{record.memo || 'なし'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const HistoryList: React.FC<HistoryListProps> = ({ records, onDelete }) => {
    if (records.length === 0) {
        return <div className="text-center text-gray-400 py-8">データがありません</div>;
    }

    return (
        <div className="space-y-4">
            {records.map((record) => (
                <HistoryItem key={record.id} record={record} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default HistoryList;
