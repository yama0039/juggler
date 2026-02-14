
import React from 'react';
import type { MachineSpec } from '../../data/machineSpecs';

interface AnalyzerFormProps {
    machineSpecs: MachineSpec[];
    selectedMachine: string;
    onMachineChange: (value: string) => void;
    inputData: {
        totalSpins: string;
        bigCount: string;
        regCount: string;
        grapeCount: string;
        isolatedBig?: string;
        cherryBig?: string;
        isolatedReg?: string;
        cherryReg?: string;
    };
    onInputChange: (field: string, value: string) => void;
}

const AnalyzerForm: React.FC<AnalyzerFormProps> = ({
    machineSpecs,
    selectedMachine,
    onMachineChange,
    inputData,
    onInputChange,
}) => {
    const [mode, setMode] = React.useState<'basic' | 'detailed'>('basic');

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-juggler-neonYellow flex justify-between items-center">
                <span>データ入力</span>
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
            </h3>

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

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">総回転数</label>
                    <input
                        type="number"
                        value={inputData.totalSpins}
                        onChange={(e) => onInputChange('totalSpins', e.target.value)}
                        className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-juggler-neonPink focus:outline-none"
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2 text-sm">ぶどう回数 (任意)</label>
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
                        <label className="block text-gray-400 mb-2 text-sm text-red-500 font-bold">BIG回数</label>
                        <input
                            type="number"
                            value={inputData.bigCount}
                            onChange={(e) => onInputChange('bigCount', e.target.value)}
                            className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-red-500 focus:outline-none"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm text-green-500 font-bold">REG回数</label>
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
