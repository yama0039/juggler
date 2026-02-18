
import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnalyzerForm from '../components/Analyzer/AnalyzerForm';
import AnalyzerResult from '../components/Analyzer/AnalyzerResult';
import { machineSpecs } from '../data/machineSpecs';
import type { MachineSpec } from '../data/machineSpecs';
import { calculateSettingLikelihood } from '../utils/calculator';

const AnalyzerPage = () => {
    const [selectedMachineId, setSelectedMachineId] = useState<string>(machineSpecs[0].id);
    const location = useLocation();

    const [inputData, setInputData] = useState<{
        totalSpins: string;
        bigCount: string;
        regCount: string;
        grapeCount: string;
        diffCoins: string;
        isolatedBig?: string;
        cherryBig?: string;
        isolatedReg?: string;
        cherryReg?: string;
    }>({
        totalSpins: '',
        bigCount: '',
        regCount: '',
        grapeCount: '',
        diffCoins: '',
        isolatedBig: '',
        cherryBig: '',
        isolatedReg: '',
        cherryReg: '',
    });

    // 各設定の配分 (1〜6)
    const [priors, setPriors] = useState<{ [key: number]: number }>({
        1: 16.6, 2: 16.6, 3: 16.7, 4: 16.7, 5: 16.7, 6: 16.7
    });

    useEffect(() => {
        if (location.state?.counterData) {
            const data = location.state.counterData;
            const currentGames = Math.max(0, data.TotalGame - data.StartGame);

            setInputData({
                totalSpins: currentGames.toString(),
                bigCount: (data.IsolatedBig + data.CherryBig).toString(),
                regCount: (data.IsolatedReg + data.CherryReg).toString(),
                grapeCount: data.Grape.toString(),
                diffCoins: '',
                isolatedBig: data.IsolatedBig.toString(),
                cherryBig: data.CherryBig.toString(),
                isolatedReg: data.IsolatedReg.toString(),
                cherryReg: data.CherryReg.toString(),
            });

            // Clear state to avoid overwriting on re-renders (optional, but good practice)
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleInputChange = (field: string, value: string) => {
        setInputData((prev) => ({ ...prev, [field]: value }));
    };

    const handlePriorChange = (setting: number, value: number) => {
        setPriors(prev => ({ ...prev, [setting]: value }));
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
            diffCoins: parseInt(inputData.diffCoins) || undefined,
            isolatedBig: inputData.isolatedBig ? parseInt(inputData.isolatedBig) : undefined,
            cherryBig: inputData.cherryBig ? parseInt(inputData.cherryBig) : undefined,
            isolatedReg: inputData.isolatedReg ? parseInt(inputData.isolatedReg) : undefined,
            cherryReg: inputData.cherryReg ? parseInt(inputData.cherryReg) : undefined,
            priors: priors
        };

        return calculateSettingLikelihood(selectedMachine, data);
    }, [selectedMachine, inputData, priors]);

    return (
        <div className="max-w-3xl mx-auto pb-12 px-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-2 h-8 bg-juggler-neonPink mr-3 rounded-full"></span>
                詳細設定判別
            </h2>

            <AnalyzerForm
                machineSpecs={machineSpecs}
                selectedMachine={selectedMachineId}
                onMachineChange={setSelectedMachineId}
                inputData={inputData}
                onInputChange={handleInputChange}
                priors={priors}
                onPriorChange={handlePriorChange}
                selectedMachineSpec={selectedMachine}
            />

            {results && (
                <AnalyzerResult
                    results={results.settingResults}
                    expectedPayout={results.expectedPayout}
                    expectedDifference={results.expectedDifference}
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
