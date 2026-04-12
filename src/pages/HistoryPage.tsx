
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
    const [selectedHall, setSelectedHall] = useState<string>('all');

    // ユニークなホール名を取得
    const uniqueHalls = useMemo(() => {
        const halls = records.map(r => r.hall_name).filter(Boolean);
        return Array.from(new Set(halls)).sort();
    }, [records]);

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
        return records.filter(r => {
            const matchesModel = selectedModel === 'all' || r.machine_type === selectedModel;
            const matchesHall = selectedHall === 'all' || r.hall_name === selectedHall;
            return matchesModel && matchesHall;
        });
    }, [records, selectedModel, selectedHall]);

    return (
        <div className="max-w-3xl mx-auto pb-12 px-4 sm:px-0">
            <div className="flex flex-col mb-6">
                <h2 className="text-2xl font-bold flex items-center mb-4">
                    <span className="w-2 h-8 bg-juggler-neonPink mr-3 rounded-full"></span>
                    履歴・収支
                </h2>

                <div className="flex flex-col sm:flex-row gap-2 text-sm font-normal">
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-juggler-neonPink w-full sm:w-auto"
                    >
                        <option value="all">すべての機種</option>
                        {machineSpecs.map(spec => (
                            <option key={spec.id} value={spec.id}>{spec.name}</option>
                        ))}
                    </select>

                    <select
                        value={selectedHall}
                        onChange={(e) => setSelectedHall(e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-juggler-neonPink w-full sm:w-auto"
                    >
                        <option value="all">すべての店舗</option>
                        {uniqueHalls.map(hall => (
                            <option key={hall} value={hall}>{hall}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && <div className="text-center text-gray-400 py-8">読み込み中...</div>}
            {error && <div className="bg-red-900 text-red-200 p-4 rounded mb-4">{error}</div>}

            {!loading && !error && (
                <>
                    {/* 収支推移を最上部に配置 */}
                    {filteredRecords.length > 0 && <HistoryChart records={filteredRecords} />}

                    {/* コンパクトになった合計統計 */}
                    <HistorySummary records={filteredRecords} />

                    {/* 履歴リスト */}
                    <HistoryList records={filteredRecords} onDelete={handleDelete} />
                </>
            )}
        </div>
    );
};

export default HistoryPage;
