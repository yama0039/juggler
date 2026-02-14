import React from 'react';
import clsx from 'clsx';

interface CircleCounterProps {
    label: string;
    count: number;
    totalSpins: number;
    color: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'cyan';
    onClick: () => void;
    onDecrement?: () => void;
}

const CircleCounter: React.FC<CircleCounterProps> = ({ label, count, totalSpins, color, onClick, onDecrement }) => {
    // Probability calculation
    const probability = count > 0 ? (totalSpins / count).toFixed(2) : '-';

    // Enhanced Color mapping with gradients and glow
    const colorMap = {
        red: {
            text: 'text-red-500',
            bg: 'bg-red-500/10',
            border: 'border-red-500',
            ring: 'stroke-red-500',
            shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)]',
            active: 'active:shadow-[0_0_25px_rgba(239,68,68,0.8)]',
            gradient: 'from-red-500/20 to-transparent'
        },
        blue: {
            text: 'text-blue-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500',
            ring: 'stroke-blue-500',
            shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
            active: 'active:shadow-[0_0_25px_rgba(59,130,246,0.8)]',
            gradient: 'from-blue-500/20 to-transparent'
        },
        green: {
            text: 'text-green-500',
            bg: 'bg-green-500/10',
            border: 'border-green-500',
            ring: 'stroke-green-500',
            shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.5)]',
            active: 'active:shadow-[0_0_25px_rgba(34,197,94,0.8)]',
            gradient: 'from-green-500/20 to-transparent'
        },
        yellow: {
            text: 'text-yellow-400',
            bg: 'bg-yellow-400/10',
            border: 'border-yellow-400',
            ring: 'stroke-yellow-400',
            shadow: 'shadow-[0_0_15px_rgba(250,204,21,0.5)]',
            active: 'active:shadow-[0_0_25px_rgba(250,204,21,0.8)]',
            gradient: 'from-yellow-400/20 to-transparent'
        },
        purple: {
            text: 'text-purple-500',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500',
            ring: 'stroke-purple-500',
            shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.5)]',
            active: 'active:shadow-[0_0_25px_rgba(168,85,247,0.8)]',
            gradient: 'from-purple-500/20 to-transparent'
        },
        pink: {
            text: 'text-pink-500',
            bg: 'bg-pink-500/10',
            border: 'border-pink-500',
            ring: 'stroke-pink-500',
            shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.5)]',
            active: 'active:shadow-[0_0_25px_rgba(236,72,153,0.8)]',
            gradient: 'from-pink-500/20 to-transparent'
        },
        cyan: {
            text: 'text-cyan-500',
            bg: 'bg-cyan-500/10',
            border: 'border-cyan-500',
            ring: 'stroke-cyan-500',
            shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.5)]',
            active: 'active:shadow-[0_0_25px_rgba(6,182,212,0.8)]',
            gradient: 'from-cyan-500/20 to-transparent'
        },
    };

    const styles = colorMap[color];

    return (
        <div className="flex flex-col items-center justify-center p-2">
            <button
                onClick={onClick}
                className={clsx(
                    "relative w-36 h-36 rounded-full flex items-center justify-center transition-all duration-150 transform active:scale-95",
                    "bg-gray-900 border-2",
                    styles.border,
                    styles.shadow,
                    styles.active
                )}
                onContextMenu={(e) => {
                    e.preventDefault();
                    onDecrement?.();
                }}
            >
                {/* Inner Gradient Background */}
                <div className={clsx("absolute inset-0 rounded-full bg-gradient-to-b opacity-50", styles.gradient)}></div>

                {/* SVG Progress/Decoration Ring */}
                <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90 pointer-events-none p-1">
                    {/* Background Circle */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-gray-700 opacity-30"
                    />
                    {/* Active Segment (Simulated for visual style) */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="280"
                        strokeDashoffset="60" // Just for style
                        strokeLinecap="round"
                        className={clsx(styles.text, "filter drop-shadow-[0_0_3px_currentColor]")}
                    />
                </svg>

                {/* Content */}
                <div className="flex flex-col items-center z-10 space-y-1">
                    <span className={clsx("text-[10px] font-bold uppercase tracking-widest text-white/70")}>
                        {label}
                    </span>
                    <span className={clsx("text-5xl font-mono font-bold leading-none text-white drop-shadow-lg", styles.text)}>
                        {count}
                    </span>
                    <div className="px-2 py-0.5 rounded bg-black/40 border border-white/10 backdrop-blur-sm">
                        <span className={clsx("text-xs font-mono font-bold", styles.text)}>
                            1/{probability}
                        </span>
                    </div>
                </div>
            </button>
            <div className="mt-2">
                <button
                    onClick={(e) => { e.stopPropagation(); onDecrement?.(); }}
                    className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-gray-500 hover:text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
                >
                    -
                </button>
            </div>
        </div>
    );
};

export default CircleCounter;
