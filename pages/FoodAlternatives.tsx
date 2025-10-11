import React, { useState } from 'react';
import { getAiFoodAlternative, getAiHealthTip } from '../services/geminiService';

const FoodAlternatives: React.FC = () => {
    const [foodInput, setFoodInput] = useState('');
    const [alternative, setAlternative] = useState('');
    const [isAlternativeLoading, setIsAlternativeLoading] = useState(false);

    const [healthTip, setHealthTip] = useState('');
    const [isTipLoading, setIsTipLoading] = useState(false);

    const handleGetAlternative = async () => {
        if (!foodInput.trim()) return;
        setIsAlternativeLoading(true);
        setAlternative('');
        const result = await getAiFoodAlternative(foodInput);
        setAlternative(result);
        setIsAlternativeLoading(false);
    };

    const handleGetTip = async () => {
        setIsTipLoading(true);
        setHealthTip('');
        const result = await getAiHealthTip();
        setHealthTip(result);
        setIsTipLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Healthy Food Swaps</h1>
                <p className="mt-4 text-lg text-gray-600">Discover smarter alternatives to your favorite foods, with help from our AI.</p>
            </div>

            <div 
                className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-gray-100"
                style={{background: 'radial-gradient(circle, rgba(240,255,245,1) 0%, rgba(255,255,255,1) 100%)'}}
            >
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                    <span className="inline-block bg-gradient-to-r from-primary to-green-400 text-transparent bg-clip-text">AI-Powered Suggestions</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* AI Alternative Finder */}
                    <div className="space-y-4 p-6 bg-white/60 rounded-xl shadow-md border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 text-center">Find a Healthier Swap</h3>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={foodInput}
                                onChange={(e) => setFoodInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleGetAlternative()}
                                placeholder="e.g., Samosa"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                disabled={isAlternativeLoading}
                            />
                            <button onClick={handleGetAlternative} disabled={isAlternativeLoading || !foodInput} className="w-full sm:w-auto bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
                                Find
                            </button>
                        </div>
                        <div className="min-h-[100px] pt-2">
                            {isAlternativeLoading && <div className="text-center text-gray-500">Finding a healthy swap...</div>}
                            {alternative && (
                                <div className="mt-2 p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-green-800 text-sm" style={{ whiteSpace: 'pre-wrap' }}>{alternative}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* AI Health Tip */}
                    <div className="space-y-4 p-6 bg-white/60 rounded-xl shadow-md border border-gray-200 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-800 text-center">Daily Health Tip</h3>
                        <button onClick={handleGetTip} disabled={isTipLoading} className="w-full bg-secondary text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors duration-300 shadow-md disabled:bg-gray-400">
                            {isTipLoading ? 'Getting Tip...' : 'Get a Random Tip'}
                        </button>
                         <div className="min-h-[100px] pt-2">
                            {isTipLoading && !healthTip && <div className="text-center text-gray-500">Loading your tip...</div>}
                            {healthTip && (
                                <div className="mt-2 p-4 bg-yellow-50 rounded-lg border border-yellow-200 flex-grow flex items-center">
                                    <p className="text-yellow-800 text-sm" style={{ whiteSpace: 'pre-wrap' }}>{healthTip}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
             <p className="text-center text-sm text-gray-500 mt-8">All suggestions are generated by AI and should be considered as helpful tips, not medical advice.</p>
        </div>
    );
};

export default FoodAlternatives;
