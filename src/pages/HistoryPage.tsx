
import { useEffect, useState } from 'react';
import { useRecords } from '../hooks/useRecords';
import type { JugglerRecord } from '../types';
import HistoryList from '../components/History/HistoryList';
import HistoryChart from '../components/History/HistoryChart';

const HistoryPage = () => {
    const { getRecords, deleteRecord, loading, error } = useRecords();
    const [records, setRecords] = useState<JugglerRecord[]>([]);

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

    return (
        <div className="max-w-3xl mx-auto pb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-2 h-8 bg-juggler-neonPink mr-3 rounded-full"></span>
                履歴・収支
            </h2>

            {loading && <div className="text-center text-gray-400 py-8">読み込み中...</div>}
            {error && <div className="bg-red-900 text-red-200 p-4 rounded mb-4">{error}</div>}

            {!loading && !error && (
                <>
                    {records.length > 0 && <HistoryChart records={records} />}
                    <HistoryList records={records} onDelete={handleDelete} />
                </>
            )}
        </div>
    );
};

export default HistoryPage;
