import { useLocation } from 'react-router-dom';
import RecordForm from '../components/Record/RecordForm';
import { useRecords } from '../hooks/useRecords';

const RecordPage = () => {
    const { addRecord, loading, error } = useRecords();
    const location = useLocation();
    const initialData = location.state?.counterData;

    return (
        <div className="max-w-2xl mx-auto pb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-2 h-8 bg-juggler-neonPink mr-3 rounded-full"></span>
                データ入力
            </h2>

            {error && <Message type="error" text={error} />}

            <RecordForm onSubmit={addRecord} loading={loading} initialData={initialData} />
        </div>
    );
};


// 簡易的なメッセージ表示コンポーネント
const Message = ({ type, text }: { type: 'error' | 'success', text: string }) => (
    <div className={`p-4 mb-4 rounded ${type === 'error' ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'}`}>
        {text}
    </div>
)

export default RecordPage;
