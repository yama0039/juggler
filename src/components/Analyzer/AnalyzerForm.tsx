
import React from 'react';
import type { MachineSpec } from '../../data/machineSpecs';
import { backCalculateGrapes } from '../../utils/calculator';
import { Calculator, Settings } from 'lucide-react';

interface AnalyzerFormProps {
    machineSpecs: MachineSpec[];
    selectedMachine: string;
    onMachineChange: (value: string) => void;
    inputData: {
        totalSpins: string;
        bigCount: string;
        regCount: string;
        grapeCount: string;
        diffCoins: string;
        isolatedBig?: string;
        cherryBig?: string;
        isolatedReg?: string;
        cherryReg?: string;
    };
    onInputChange: (field: string, value: string) => void;
    priors: { [key: number]: number };
    onPriorChange: (setting: number, value: number) => void;
    selectedMachineSpec: MachineSpec;
}

const AnalyzerForm: React.FC<AnalyzerFormProps> = ({
    machineSpecs,
    selectedMachine,
    onMachineChange,
    inputData,
    onInputChange,
    priors,
    onPriorChange,
    selectedMachineSpec
}) => {
    const [mode, setMode] = React.useState<'basic' | 'detailed'>('basic');
    const [showPriors, setShowPriors] = React.useState(false);

    const handleBackCalc = () => {
        const totalSpins = parseInt(inputData.totalSpins);
        const big = parseInt(inputData.bigCount) || 0;
        const reg = parseInt(inputData.regCount) || 0;
        const diff = parseInt(inputData.diffCoins) || 0;

        if (totalSpins > 0) {
            const calculated = backCalculateGrapes(selectedMachineSpec, totalSpins, big, reg, diff);
            onInputChange('grapeCount', calculated.toString());
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <div className="flex bg-gray-900 rounded-lg p-1">
                    <button
                        onClick={() => setMode('basic')}
                        className={`px-4 py-1 rounded-md text-sm font-bold transition-colors ${mode === 'basic' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        通常
                    </button>
                    <button
                        onClick={() => setMode('detailed')}
                        className={`px-4 py-1 rounded-md text-sm font-bold transition-colors ${mode === 'detailed' ? 'bg-juggler-neonPink text-white' : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        詳細
                    </button>
                </div>

                <button
                    onClick={() => setShowPriors(!showPriors)}
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-md transition-colors ${showPriors ? 'bg-juggler-neonPink text-white' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
                >
                    <Settings size={14} />
                    設定配分 {showPriors ? '表示中' : '設定'}
                </button>
            </div>

            <div className="mb-4">
                <label className="block text-gray-400 mb-2 text-sm">機種を選択</label>
                <select
                    value={selectedMachine}
                    onChange={(e) => onMachineChange(e.target.value)}
                    className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-juggler-neonPink focus:outline-none"
                >
                    {machineSpecs.map((spec) => (
                        <option key={spec.id} value={spec.id}>
                            {spec.name}
                        </option>
                    ))}
                </select>
            </div>

            {showPriors && (
                <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700 animate-fade-in">
                    <h4 className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-2">
                        <Settings size={12} className="text-juggler-neonPink" />
                        ホール設定配分 (%)
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {[1, 2, 3, 4, 5, 6].map(s => (
                            <div key={s}>
                                <label className="block text-[10px] text-gray-500 mb-1">設定 {s}</label>
                                <input
                                    type="number"
                                    value={priors[s]}
                                    onChange={(e) => onPriorChange(s, parseFloat(e.target.value) || 0)}
                                    className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700 focus:border-juggler-neonPink focus:outline-none text-center text-sm"
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2">※特定の値を大きくすると、その設定である可能性を優先的に考慮します。</p>
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                <div className="col-span-1">
                    <label className="block text-gray-400 mb-2 text-sm">総回転数</label>
                    <input
                        type="number"
                        value={inputData.totalSpins}
                        onChange={(e) => onInputChange('totalSpins', e.target.value)}
                        className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-juggler-neonPink focus:outline-none"
                        placeholder="0"
                    />
                </div>
                <div className="col-span-1">
                    <label className="block text-gray-400 mb-2 text-sm">差枚数 (逆算用)</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={inputData.diffCoins}
                            onChange={(e) => onInputChange('diffCoins', e.target.value)}
                            className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-juggler-neonPink focus:outline-none pr-10"
                            placeholder="±0"
                        />
                        <button
                            onClick={handleBackCalc}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-juggler-neonPink hover:text-white transition-colors"
                            title="ブドウ逆算"
                        >
                            <Calculator size={20} />
                        </button>
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-gray-400 mb-2 text-sm">ブドウ回数</label>
                    <input
                        type="number"
                        value={inputData.grapeCount}
                        onChange={(e) => onInputChange('grapeCount', e.target.value)}
                        className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-juggler-neonPink focus:outline-none"
                        placeholder="0"
                    />
                </div>
            </div>

            {mode === 'basic' ? (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                    <div>
                        <label className="block text-red-500 font-bold mb-2 text-sm">BIG回数</label>
                        <input
                            type="number"
                            value={inputData.bigCount}
                            onChange={(e) => onInputChange('bigCount', e.target.value)}
                            className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-red-500 focus:outline-none"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-green-500 font-bold mb-2 text-sm">REG回数</label>
                        <input
                            type="number"
                            value={inputData.regCount}
                            onChange={(e) => onInputChange('regCount', e.target.value)}
                            className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-green-500 focus:outline-none"
                            placeholder="0"
                        />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                    <div>
                        <label className="block text-gray-400 mb-2 text-xs text-red-400">単独 BIG</label>
                        <input
                            type="number"
                            value={inputData.isolatedBig || ''}
                            onChange={(e) => onInputChange('isolatedBig', e.target.value)}
                            className="w-full bg-gray-900 text-white p-2 rounded border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-xs text-red-400">チェリー BIG</label>
                        <input
                            type="number"
                            value={inputData.cherryBig || ''}
                            onChange={(e) => onInputChange('cherryBig', e.target.value)}
                            className="w-full bg-gray-900 text-white p-2 rounded border border-gray-700 focus:border-red-500 focus:outline-none text-sm"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-xs text-green-400">単独 REG</label>
                        <input
                            type="number"
                            value={inputData.isolatedReg || ''}
                            onChange={(e) => onInputChange('isolatedReg', e.target.value)}
                            className="w-full bg-gray-900 text-white p-2 rounded border border-gray-700 focus:border-green-500 focus:outline-none text-sm"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-xs text-green-400">チェリー REG</label>
                        <input
                            type="number"
                            value={inputData.cherryReg || ''}
                            onChange={(e) => onInputChange('cherryReg', e.target.value)}
                            className="w-full bg-gray-900 text-white p-2 rounded border border-gray-700 focus:border-green-500 focus:outline-none text-sm"
                            placeholder="0"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyzerForm;
