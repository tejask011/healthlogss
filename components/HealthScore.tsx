
import React from 'react';

interface HealthScoreProps {
    score: number;
}

const HealthScore: React.FC<HealthScoreProps> = ({ score }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getScoreColor = () => {
        if (score >= 80) return 'text-green-500';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getStrokeColor = () => {
        if (score >= 80) return 'stroke-green-500';
        if (score >= 50) return 'stroke-yellow-500';
        return 'stroke-red-500';
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg relative">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Health Score</h3>
            <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle
                        className="stroke-gray-200"
                        strokeWidth="10"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                    />
                    <circle
                        className={`transform -rotate-90 origin-center transition-all duration-1000 ${getStrokeColor()}`}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                    />
                </svg>
                <div className={`absolute inset-0 flex flex-col items-center justify-center ${getScoreColor()}`}>
                    <span className="text-4xl font-bold">{Math.round(score)}</span>
                    <span className="text-sm">out of 100</span>
                </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">Based on your proximity to daily nutritional goals.</p>
        </div>
    );
};

export default HealthScore;
