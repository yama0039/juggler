
import { useEffect, useState, useMemo } from 'react';
import { useRecords } from '../hooks/useRecords';
import type { JugglerRecord } from '../types';
import { machineSpecs } from '../data/machineSpecs';
import HistoryList from '../components/History/HistoryList';
import HistoryChart from '../components/History/HistoryChart';
import HistorySummary from '../components/History/HistorySummary';

const HistoryPage = () => {
    const { getRecords, deleteRecord, loading, error } = useRecords();
    const [records, setRecords] = useState<JugglerRecord[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('all');

    const fetchRecords = async () => {
        const data = await getRecords();
        if (data) {
            setRecords(data);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []); // Mount時に取得

    const handleDelete = async (id: string) => {
        const success = await deleteRecord(id);
        if (success) {
            await fetchRecords();
        }
    };

    const filteredRecords = useMemo(() => {
        if (selectedModel === 'all') return records;
        return records.filter(r => r.machine_type === selectedModel);
    }, [records, selectedModel]);

    return (
        <div className="max-w-3xl mx-auto pb-12 px-4 sm:px-0">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="w-2 h-8 bg-juggler-neonPink mr-3 rounded-full"></span>
                    履歴・収支
                </div>

                <div className="flex items-center text-sm font-normal">
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-juggler-neonPink"
                    >
                        <option value="all">すべての機種</option>
                        {machineSpecs.map(spec => (
                            <option key={spec.id} value={spec.id}>{spec.name}</option>
                        ))}
                    </select>
                </div>
            </h2>

            {loading && <div className="text-center text-gray-400 py-8">読み込み中...</div>}
            {error && <div className="bg-red-900 text-red-200 p-4 rounded mb-4">{error}</div>}

            {!loading && !error && (
                <>
                    <HistorySummary records={filteredRecords} />
                    {filteredRecords.length > 0 && <HistoryChart records={filteredRecords} />}
                    <HistoryList records={filteredRecords} onDelete={handleDelete} />
                </>
            )}
        </div>
    );
};

export default HistoryPage;
