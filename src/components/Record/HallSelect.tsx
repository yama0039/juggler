import React, { useState } from 'react';
import { useHalls } from '../../hooks/useHalls';
import { Plus, X, Save } from 'lucide-react';

interface HallSelectProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    required?: boolean;
}

const HallSelect: React.FC<HallSelectProps> = ({ value, onChange, className, required }) => {
    const { halls, loading, addHall } = useHalls();
    const [isAdding, setIsAdding] = useState(false);
    const [newHallName, setNewHallName] = useState('');
    const [addingError, setAddingError] = useState<string | null>(null);

    const handleAddHall = async () => {
        if (!newHallName.trim()) return;
        setAddingError(null);

        const result = await addHall(newHallName.trim());
        if (result) {
            onChange(result.name);
            setIsAdding(false);
            setNewHallName('');
        } else {
            setAddingError('ホールの追加に失敗しました');
        }
    };

    if (loading) {
        return <div className="text-gray-400 text-sm">読み込み中...</div>;
    }

    if (isAdding) {
        return (
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newHallName}
                        onChange={(e) => setNewHallName(e.target.value)}
                        placeholder="新しいホール名"
                        className="flex-1 bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-juggler-neonPink focus:outline-none"
                        autoFocus
                    />
                    <button
                        type="button"
                        onClick={handleAddHall}
                        className="p-3 bg-juggler-neonPink text-white rounded hover:bg-pink-600 transition-colors"
                    >
                        <Save size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setIsAdding(false);
                            setNewHallName('');
                            setAddingError(null);
                        }}
                        className="p-3 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                {addingError && <p className="text-red-400 text-xs">{addingError}</p>}
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={className}
                required={required}
            >
                <option value="">ホールを選択してください</option>
                {halls.map((hall) => (
                    <option key={hall.id} value={hall.name}>
                        {hall.name}
                    </option>
                ))}
            </select>
            <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="p-3 bg-gray-700 text-juggler-neonYellow rounded border border-gray-600 hover:bg-gray-600 transition-colors"
                title="新しいホールを追加"
            >
                <Plus size={20} />
            </button>
        </div>
    );
};

export default HallSelect;
