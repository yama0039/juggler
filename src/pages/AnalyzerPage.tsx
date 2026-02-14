
import { useState, useMemo } from 'react';
import AnalyzerForm from '../components/Analyzer/AnalyzerForm';
import AnalyzerResult from '../components/Analyzer/AnalyzerResult';
import { machineSpecs } from '../data/machineSpecs';
import type { MachineSpec } from '../data/machineSpecs';
import { calculateSettingLikelihood } from '../utils/calculator';

const AnalyzerPage = () => {
    const [selectedMachineId, setSelectedMachineId] = useState<string>(machineSpecs[0].id);
    const [inputData, setInputData] = useState({
        totalSpins: '',
        bigCount: '',
        regCount: '',
        grapeCount: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setInputData((prev) => ({ ...prev, [field]: value }));
    };

    const selectedMachine = useMemo(() => {
        return machineSpecs.find((s) => s.id === selectedMachineId) as MachineSpec;
    }, [selectedMachineId]);

    const results = useMemo(() => {
        const totalSpins = parseInt(inputData.totalSpins);
        if (!totalSpins || totalSpins <= 0) return null;

        const data = {
            totalSpins,
            bigCount: parseInt(inputData.bigCount) || 0,
            regCount: parseInt(inputData.regCount) || 0,
            grapeCount: parseInt(inputData.grapeCount) || 0,
        };

        return calculateSettingLikelihood(selectedMachine, data);
    }, [selectedMachine, inputData]);

    return (
        <div className="max-w-3xl mx-auto pb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-2 h-8 bg-juggler-neonPink mr-3 rounded-full"></span>
                設定判別ツール
            </h2>

            <AnalyzerForm
                machineSpecs={machineSpecs}
                selectedMachine={selectedMachineId}
                onMachineChange={setSelectedMachineId}
                inputData={inputData}
                onInputChange={handleInputChange}
            />

            {results && (
                <AnalyzerResult
                    results={results}
                    machine={selectedMachine}
                    inputData={{
                        totalSpins: parseInt(inputData.totalSpins) || 0,
                        bigCount: parseInt(inputData.bigCount) || 0,
                        regCount: parseInt(inputData.regCount) || 0,
                        grapeCount: parseInt(inputData.grapeCount) || 0
                    }}
                />
            )}
        </div>
    );
};

export default AnalyzerPage;
