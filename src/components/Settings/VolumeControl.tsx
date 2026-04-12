import React, { useState } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { playClickSound } from '../../utils/audio';

const VolumeControl = () => {
    const { volume, setVolume } = useSettings();
    const [isHovered, setIsHovered] = useState(false);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        // Play a test sound when changing volume
        playClickSound(newVolume);
    };

    const getVolumeIcon = () => {
        if (volume === 0) return <VolumeX size={18} className="text-gray-500" />;
        if (volume < 0.5) return <Volume1 size={18} className="text-juggler-neonPink" />;
        return <Volume2 size={18} className="text-juggler-neonPink" />;
    };

    return (
        <div 
            className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:border-juggler-neonPink/30"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center justify-center w-8">
                {getVolumeIcon()}
            </div>
            
            <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className={isHovered ? "text-juggler-neonPink transition-colors" : "text-gray-500"}>Click Volume</span>
                    <span className="font-mono text-white">{Math.round(volume * 100)}%</span>
                </div>
                
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-juggler-neonPink hover:accent-pink-400 transition-all"
                    style={{
                        background: `linear-gradient(to right, #ff00ff ${volume * 100}%, #374151 ${volume * 100}%)`
                    }}
                />
            </div>
        </div>
    );
};

export default VolumeControl;
