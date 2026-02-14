
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
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-juggler-neonYellow">
                データ入力
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

            <div className="grid grid-cols-2 gap-4">
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
                <div>
                    <label className="block text-gray-400 mb-2 text-sm text-red-400">BIG回数</label>
                    <input
                        type="number"
                        value={inputData.bigCount}
                        onChange={(e) => onInputChange('bigCount', e.target.value)}
                        className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-juggler-neonPink focus:outline-none"
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2 text-sm text-green-400">REG回数</label>
                    <input
                        type="number"
                        value={inputData.regCount}
                        onChange={(e) => onInputChange('regCount', e.target.value)}
                        className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-juggler-neonPink focus:outline-none"
                        placeholder="0"
                    />
                </div>
            </div>
        </div>
    );
};

export default AnalyzerForm;
