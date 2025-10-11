import React, { useState } from 'react';
import { getAiCustomizedDietPlan } from '../services/geminiService';
import type { CustomDietPlan } from '../types';

interface CustomizePlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPlanGenerated: (plan: CustomDietPlan | null, error?: string) => void;
}

const CustomizePlanModal: React.FC<CustomizePlanModalProps> = ({ isOpen, onClose, onPlanGenerated }) => {
    const [diet, setDiet] = useState('Vegetarian');
    const [goal, setGoal] = useState('Weight Loss');
    const [portionSize, setPortionSize] = useState('Medium');
    const [allergies, setAllergies] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await getAiCustomizedDietPlan({ diet, goal, portionSize, allergies, notes });
            
            // Check if result is an error message string
            if (result.startsWith('Sorry') || result.startsWith('There seems to be an issue')) {
                throw new Error(result);
            }
            const parsedPlan: CustomDietPlan = JSON.parse(result);
            onPlanGenerated(parsedPlan);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setError(errorMessage);
            onPlanGenerated(null, errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-primary">Personalize Your Diet Plan</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian'].map(option => (
                                    <button type="button" key={option} onClick={() => setDiet(option)} className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-colors ${diet === option ? 'bg-primary text-white border-primary-dark' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Health Goal</label>
                            <select id="goal" value={goal} onChange={e => setGoal(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                                <option>Weight Loss</option>
                                <option>Weight Gain</option>
                                <option>Muscle Building</option>
                                <option>General Fitness</option>
                            </select>
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Portion Size</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Small', 'Medium', 'Large'].map(option => (
                                    <button type="button" key={option} onClick={() => setPortionSize(option)} className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-colors ${portionSize === option ? 'bg-primary text-white border-primary-dark' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies or Foods to Avoid</label>
                            <input type="text" id="allergies" value={allergies} onChange={e => setAllergies(e.target.value)} placeholder="e.g., Peanuts, Dairy, Spicy food" className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary" />
                        </div>
                        
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
                            <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="e.g., Prefer South Indian cuisine, low-oil cooking" className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"></textarea>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 border-t">
                        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
                        <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-wait flex items-center justify-center">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating Your Plan...
                                </>
                            ) : (
                                'Generate My Plan'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomizePlanModal;