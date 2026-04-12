import React, { createContext, useContext, useState } from 'react';

interface SettingsContextType {
    volume: number;
    setVolume: (volume: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [volume, setVolumeState] = useState<number>(() => {
        const savedVolume = localStorage.getItem('juggler_settings_volume');
        return savedVolume !== null ? parseFloat(savedVolume) : 0.5;
    });

    const setVolume = (newVolume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, newVolume));
        setVolumeState(clampedVolume);
        localStorage.setItem('juggler_settings_volume', clampedVolume.toString());
    };

    return (
        <SettingsContext.Provider value={{ volume, setVolume }}>
            {children}
        </SettingsContext.Provider>
    );
};
