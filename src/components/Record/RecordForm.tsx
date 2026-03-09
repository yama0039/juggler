
import React, { useState } from 'react';
import { machineSpecs } from '../../data/machineSpecs';
import type { JugglerRecord } from '../../types';
import HallSelect from './HallSelect';
import { Save, Calculator } from 'lucide-react';
import clsx from 'clsx';
import { backCalculateGrapes } from '../../utils/calculator';

interface RecordFormProps {
    onSubmit: (data: Omit<JugglerRecord, 'id' | 'created_at' | 'user_id'>) => Promise<boolean>;
    loading: boolean;
    initialData?: {
        StartGame: number;
        TotalGame: number;
        IsolatedBig: number;
        CherryBig: number;
        IsolatedReg: number;
        CherryReg: number;
        Grape: number;
        NonOverlappingCherry: number;
        DifferenceInCoins?: number;
    };
}

const RecordForm: React.FC<RecordFormProps> = ({ onSubmit, loading, initialData }) => {
    // Calculate current interval games if initialData exists
    const currentGames = initialData ? Math.max(0, initialData.TotalGame - initialData.StartGame) : 0;

    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        hall_name: '',
        machine_type: machineSpecs[0].id,
        machine_number: '',
        total_spins: initialData ? currentGames.toString() : '',
        isolated_big: initialData?.IsolatedBig.toString() || '',
        cherry_big: initialData?.CherryBig.toString() || '',
        isolated_reg: initialData?.IsolatedReg.toString() || '',
        cherry_reg: initialData?.CherryReg.toString() || '',
        grape: initialData?.Grape.toString() || '',
        non_overlapping_cherry: initialData?.NonOverlappingCherry.toString() || '',
        diff_coins: initialData?.DifferenceInCoins?.toString() || '',
        investment: '',
        recovery: '',
        memo: '',
    });

    const handleBackCalc = () => {
        const spins = parseInt(formData.total_spins) || 0;
        const big = (parseInt(formData.isolated_big) || 0) + (parseInt(formData.cherry_big) || 0);
        const reg = (parseInt(formData.isolated_reg) || 0) + (parseInt(formData.cherry_reg) || 0);
        const diff = parseInt(formData.diff_coins) || 0;
        const machine = machineSpecs.find(m => m.id === formData.machine_type) || machineSpecs[0];

        if (spins > 0) {
            const calculated = backCalculateGrapes(machine, spins, big, reg, diff);
            setFormData(prev => ({ ...prev, grape: calculated.toString() }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 数値型の変換
        const recordData = {
            date: formData.date,
            hall_name: formData.hall_name,
            machine_type: formData.machine_type,
            machine_number: formData.machine_number ? parseInt(formData.machine_number) : undefined,
            total_spins: parseInt(formData.total_spins) || 0,
            isolated_big: formData.isolated_big ? parseInt(formData.isolated_big) : 0,
            cherry_big: formData.cherry_big ? parseInt(formData.cherry_big) : 0,
            isolated_reg: formData.isolated_reg ? parseInt(formData.isolated_reg) : 0,
            cherry_reg: formData.cherry_reg ? parseInt(formData.cherry_reg) : 0,
            grape: formData.grape ? parseInt(formData.grape) : 0,
            non_overlapping_cherry: formData.non_overlapping_cherry ? parseInt(formData.non_overlapping_cherry) : 0,
            investment: parseInt(formData.investment) || 0,
            recovery: parseInt(formData.recovery) || 0,
            memo: formData.memo,
        };

        const success = await onSubmit(recordData);
        if (success) {
            // フォーム初期化
            setFormData(prev => ({
                ...prev,
                hall_name: '',
                machine_number: '',
                total_spins: '',
                isolated_big: '',
                cherry_big: '',
                isolated_reg: '',
                cherry_reg: '',
                grape: '',
                non_overlapping_cherry: '',
                diff_coins: '',
                investment: '',
                recovery: '',
                memo: '',
            }));
            alert('保存しました！');
        }
    };

    const inputClass = "w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-juggler-neonPink focus:outline-none";
    const labelClass = "block text-gray-400 mb-1 text-sm";

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 space-y-6">
            <h3 className="text-xl font-bold text-juggler-neonYellow border-b border-gray-700 pb-2">
                稼働データ入力
            </h3>

            {/* 基本情報 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>日付</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} required />
                </div>

                <div>
                    <label className={labelClass}>ホール名</label>
                    <HallSelect
                        value={formData.hall_name}
                        onChange={(value) => setFormData(prev => ({ ...prev, hall_name: value }))}
                        className={inputClass}
                        required
                    />
                </div>
                <div>
                    <label className={labelClass}>機種</label>
                    <select name="machine_type" value={formData.machine_type} onChange={handleChange} className={inputClass}>
                        {machineSpecs.map(spec => (
                            <option key={spec.id} value={spec.id}>{spec.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>台番号</label>
                    <input type="number" name="machine_number" value={formData.machine_number} onChange={handleChange} className={inputClass} placeholder="123" />
                </div>
            </div>

            {/* カウンターデータ */}
            <div className="border-t border-gray-700 pt-4">
                <h4 className="text-lg font-semibold text-white mb-3">カウンター詳細</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <label className={labelClass}>総回転数</label>
                        <input type="number" name="total_spins" value={formData.total_spins} onChange={handleChange} className={inputClass} required placeholder="0" />
                    </div>
                    <div>
                        <label className={clsx(labelClass, "text-juggler-neonGreen")}>差枚数 (逆算用)</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="diff_coins"
                                value={formData.diff_coins}
                                onChange={handleChange}
                                className={clsx(inputClass, "pr-10")}
                                placeholder="±0"
                            />
                            <button
                                type="button"
                                onClick={handleBackCalc}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-juggler-neonGreen hover:text-white transition-colors"
                                title="ブドウ逆算"
                            >
                                <Calculator size={18} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className={clsx(labelClass, "text-red-400")}>単独BIG</label>
                        <input type="number" name="isolated_big" value={formData.isolated_big} onChange={handleChange} className={inputClass} placeholder="0" />
                    </div>
                    <div>
                        <label className={clsx(labelClass, "text-red-400")}>チェリーBIG</label>
                        <input type="number" name="cherry_big" value={formData.cherry_big} onChange={handleChange} className={inputClass} placeholder="0" />
                    </div>
                    <div>
                        <label className={clsx(labelClass, "text-green-400")}>単独REG</label>
                        <input type="number" name="isolated_reg" value={formData.isolated_reg} onChange={handleChange} className={inputClass} placeholder="0" />
                    </div>
                    <div>
                        <label className={clsx(labelClass, "text-green-400")}>チェリーREG</label>
                        <input type="number" name="cherry_reg" value={formData.cherry_reg} onChange={handleChange} className={inputClass} placeholder="0" />
                    </div>
                    <div>
                        <label className={clsx(labelClass, "text-purple-400")}>ぶどう</label>
                        <input type="number" name="grape" value={formData.grape} onChange={handleChange} className={inputClass} placeholder="0" />
                    </div>
                    <div>
                        <label className={clsx(labelClass, "text-pink-400")}>非重複チェリー</label>
                        <input type="number" name="non_overlapping_cherry" value={formData.non_overlapping_cherry} onChange={handleChange} className={inputClass} placeholder="0" />
                    </div>
                </div>
            </div>

            {/* 収支 */}
            <div className="border-t border-gray-700 pt-4">
                <h4 className="text-lg font-semibold text-white mb-3">収支 (枚)</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>投資枚数</label>
                        <input type="number" name="investment" value={formData.investment} onChange={handleChange} className={inputClass} required placeholder="0" />
                    </div>
                    <div>
                        <label className={labelClass}>回収枚数</label>
                        <input type="number" name="recovery" value={formData.recovery} onChange={handleChange} className={inputClass} required placeholder="0" />
                    </div>
                </div>
            </div>

            <div>
                <label className={labelClass}>メモ</label>
                <textarea name="memo" value={formData.memo} onChange={handleChange} className={clsx(inputClass, "h-24")} placeholder="特定の挙動や感想など"></textarea>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-juggler-neonPink to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <Save className="mr-2" />
                {loading ? '保存中...' : 'データを保存する'}
            </button>
        </form>
    );
};

export default RecordForm;
