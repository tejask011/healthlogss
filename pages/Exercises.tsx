import React, { useState } from 'react';
import type { Exercise } from '../types';
import { EXERCISES } from '../constants';
import { getAiCalorieBurnEstimate } from '../services/geminiService';

const ExerciseCard: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
    const [duration, setDuration] = useState(30); // Default duration in minutes
    const caloriesBurned = Math.round((exercise.caloriesBurnedPerHour / 60) * duration);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
            <div className="p-4 bg-primary rounded-full mb-4">
                {exercise.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{exercise.name}</h3>
            <p className="text-gray-600 mb-4 flex-grow text-sm">{exercise.description}</p>
            
            <div className="w-full mt-auto space-y-4">
                <div className="text-center">
                    <label htmlFor={`duration-${exercise.name}`} className="block text-sm font-medium text-gray-700">Duration: <span className="font-bold text-primary">{duration} mins</span></label>
                    <input
                        id={`duration-${exercise.name}`}
                        type="range"
                        min="10"
                        max="180"
                        step="5"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mt-2"
                    />
                </div>
                <div className="bg-green-100 text-green-800 font-bold py-3 px-4 rounded-lg text-lg">
                    🔥 <span className="text-2xl">{caloriesBurned}</span> kcal
                </div>
            </div>
        </div>
    );
};

const Exercises: React.FC = () => {
    // State for AI calculator
    const [activityInput, setActivityInput] = useState('');
    const [durationInput, setDurationInput] = useState(30);
    const [estimatedCalories, setEstimatedCalories] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [calculationError, setCalculationError] = useState<string | null>(null);

    const handleCalculate = async () => {
        if (!activityInput.trim()) {
            setCalculationError("Please enter an activity.");
            return;
        }
        setIsCalculating(true);
        setEstimatedCalories(null);
        setCalculationError(null);
        try {
            const result = await getAiCalorieBurnEstimate(activityInput, durationInput);
            if (result.startsWith('Sorry') || result.startsWith('There seems to be an issue')) {
                throw new Error(result);
            }
            const parsedResult: { caloriesBurned: number } = JSON.parse(result);
            setEstimatedCalories(parsedResult.caloriesBurned);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setCalculationError(errorMessage);
        } finally {
            setIsCalculating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Calorie Burn Calculator</h1>
                <p className="mt-4 text-lg text-gray-600">Explore common exercises or use our AI calculator for any activity. Estimates are for a ~70kg person.</p>
            </div>

            {/* AI Calorie Burn Search Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-12 border-t-4 border-secondary">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">AI Activity Calorie Estimator</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <input
                        type="text"
                        value={activityInput}
                        onChange={(e) => setActivityInput(e.target.value)}
                        placeholder="e.g., House cleaning"
                        className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition sm:col-span-1"
                        disabled={isCalculating}
                    />
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            value={durationInput}
                            onChange={(e) => setDurationInput(Math.max(1, Number(e.target.value)))}
                            min="1"
                            className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition"
                            disabled={isCalculating}
                        />
                         <span className="text-gray-600 font-medium">mins</span>
                    </div>

                    <button onClick={handleCalculate} disabled={isCalculating || !activityInput} className="w-full bg-secondary text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center">
                        {isCalculating ? (
                             <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Calculating...
                            </>
                        ) : 'Calculate'}
                    </button>
                </div>
                <div className="mt-4 text-center min-h-[4rem] flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                    {calculationError && <p className="text-red-600">{calculationError}</p>}
                    {estimatedCalories !== null && !calculationError && (
                        <p className="text-lg text-gray-800">
                            Estimated Burn: <span className="font-bold text-2xl text-secondary">🔥 {Math.round(estimatedCalories)}</span> kcal
                        </p>
                    )}
                     {!isCalculating && estimatedCalories === null && !calculationError && (
                        <p className="text-gray-500">Enter an activity and duration to get an estimate.</p>
                    )}
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {EXERCISES.map((exercise, index) => (
                   <ExerciseCard key={index} exercise={exercise} />
                ))}
            </div>
        </div>
    );
};

export default Exercises;