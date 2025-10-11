import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import type { Meal, Nutrition, FoodItem } from '../types';
import { FoodCategory } from '../types';
import HealthScore from '../components/HealthScore';
import { FOOD_ITEMS } from '../constants';
import { getFoodDetailsFromGoogleSearch } from '../services/geminiService';

const NUTRITION_TARGETS: Nutrition = {
    calories: 2000,
    protein: 60,
    carbs: 250,
    fat: 70
};

const PORTIONS = {
    Small: { name: 'Small' as const, multiplier: 0.75 },
    Medium: { name: 'Medium' as const, multiplier: 1.0 },
    Large: { name: 'Large' as const, multiplier: 1.5 },
};

const NutritionIcon: React.FC<{ type: keyof Nutrition }> = ({ type }) => {
    const icons = {
        calories: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 01-1.898-.632l4-12a1 1 0 011.265-.633zM10 18a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /><path d="M10 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" /></svg>,
        protein: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L9 9.61V16.5a1 1 0 001.521.858l4.5-3a1 1 0 00.479-.858V9.61l6.394-2.69a1 1 0 000-1.84l-7-3zM10 8.39L4.757 6 10 3.61 15.243 6 10 8.39z" /></svg>,
        carbs: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>,
        fat: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
    };
    return icons[type];
};

const PortionSelectionModal: React.FC<{
    food: FoodItem;
    onConfirm: (portion: { name: 'Small' | 'Medium' | 'Large'; multiplier: number }) => void;
    onCancel: () => void;
}> = ({ food, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100 animate-slide-up">
                <div className="p-6 text-center border-b">
                    <h3 className="text-xl font-bold text-gray-800">Select Portion Size</h3>
                    <p className="text-gray-600 mt-1">for <span className="font-semibold text-primary">{food.name}</span></p>
                </div>
                <div className="px-6 py-4 space-y-3">
                    {Object.values(PORTIONS).map(portion => (
                        <button
                            key={portion.name}
                            onClick={() => onConfirm(portion)}
                            className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-200 group"
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg text-gray-800 group-hover:text-primary-dark">{portion.name}</span>
                                <span className="text-gray-600 font-semibold group-hover:text-primary-dark">
                                    ~{Math.round(food.nutrition.calories * portion.multiplier)} kcal
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">{portion.multiplier}x the standard serving</p>
                        </button>
                    ))}
                </div>
                <div className="p-4 bg-gray-50 border-t rounded-b-2xl">
                    <button onClick={onCancel} className="w-full text-center text-gray-600 font-semibold hover:text-gray-900 transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slide-up {
                    from { transform: translateY(20px) scale(0.95); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

const MealLog: React.FC = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [isSearchingOnline, setIsSearchingOnline] = useState(false);
    const [onlineSearchError, setOnlineSearchError] = useState<string | null>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) {
            return [];
        }
        return FOOD_ITEMS.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5); // Limit local results to make space for online search
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setSearchTerm('');
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelectFood = (food: FoodItem) => {
        setSelectedFood(food);
        setSearchTerm('');
    };
    
    const cancelAddMeal = () => {
        setSelectedFood(null);
    };

    const confirmAddMeal = (portion: { name: 'Small' | 'Medium' | 'Large'; multiplier: number }) => {
        if (selectedFood) {
            const adjustedNutrition: Nutrition = {
                calories: selectedFood.nutrition.calories * portion.multiplier,
                protein: selectedFood.nutrition.protein * portion.multiplier,
                carbs: selectedFood.nutrition.carbs * portion.multiplier,
                fat: selectedFood.nutrition.fat * portion.multiplier,
            };

            const newMeal: Meal = {
                ...selectedFood,
                timestamp: Date.now(),
                nutrition: adjustedNutrition,
                portionName: portion.name,
            };

            setMeals(prevMeals => [...prevMeals, newMeal]);
            setSelectedFood(null);
        }
    };
    
    const removeMeal = (timestamp: number) => {
        setMeals(prevMeals => prevMeals.filter(meal => meal.timestamp !== timestamp));
    };

    const handleSearchOnline = async () => {
        if (!searchTerm.trim()) return;

        setIsSearchingOnline(true);
        setOnlineSearchError(null);

        const { foodItem, error } = await getFoodDetailsFromGoogleSearch(searchTerm);

        setIsSearchingOnline(false);

        if (error || !foodItem) {
            setOnlineSearchError(error || "An unknown error occurred while searching online.");
        } else {
            handleSelectFood(foodItem);
        }
    };


    const dailyTotals = useMemo<Nutrition>(() => {
        return meals.reduce((totals, meal) => ({
            calories: totals.calories + meal.nutrition.calories,
            protein: totals.protein + meal.nutrition.protein,
            carbs: totals.carbs + meal.nutrition.carbs,
            fat: totals.fat + meal.nutrition.fat,
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    }, [meals]);

    const healthScore = useMemo(() => {
        let score = 100;
        const deviations = {
            calories: Math.abs(dailyTotals.calories - NUTRITION_TARGETS.calories) / NUTRITION_TARGETS.calories,
            protein: Math.max(0, NUTRITION_TARGETS.protein - dailyTotals.protein) / NUTRITION_TARGETS.protein,
            carbs: Math.abs(dailyTotals.carbs - NUTRITION_TARGETS.carbs) / NUTRITION_TARGETS.carbs,
            fat: Math.abs(dailyTotals.fat - NUTRITION_TARGETS.fat) / NUTRITION_TARGETS.fat,
        };
        score -= deviations.calories * 40;
        score -= deviations.protein * 20;
        score -= deviations.carbs * 20;
        score -= deviations.fat * 20;
        return Math.max(0, score);
    }, [dailyTotals]);
    
    const renderFoodCategory = (category: FoodCategory) => {
        const categoryMeals = meals.filter(meal => meal.category === category);
        if (categoryMeals.length === 0) return null;
        
        return (
            <div key={category} className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-700">{category}</h3>
                <div className="space-y-4">
                    {categoryMeals.map((meal) => (
                        <div key={meal.timestamp} className="bg-white p-4 rounded-xl shadow-md transition-transform transform hover:scale-[1.02] duration-300">
                           <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-lg text-gray-800">{meal.name}</p>
                                        <p className="text-sm text-gray-500">{meal.portionName} Portion &bull; {meal.cuisine} Cuisine</p>
                                    </div>
                                    <button onClick={() => removeMeal(meal.timestamp)} className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors duration-200 -mt-1 -mr-1 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm text-gray-600">
                                    <div><span className="font-semibold text-gray-800">{meal.nutrition.calories.toFixed(0)}</span> kcal</div>
                                    <div><span className="font-semibold text-gray-800">{meal.nutrition.protein.toFixed(1)}</span> g protein</div>
                                    <div><span className="font-semibold text-gray-800">{meal.nutrition.carbs.toFixed(1)}</span> g carbs</div>
                                    <div><span className="font-semibold text-gray-800">{meal.nutrition.fat.toFixed(1)}</span> g fat</div>
                                </div>
                                {meal.sources && meal.sources.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                        <p className="text-xs font-semibold text-gray-500 mb-1">Sources:</p>
                                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                                            {meal.sources.slice(0, 3).map((source, index) => (
                                                <a key={index} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline truncate" title={source.title}>
                                                    {new URL(source.uri).hostname}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
             {selectedFood && (
                <PortionSelectionModal 
                    food={selectedFood}
                    onConfirm={confirmAddMeal}
                    onCancel={cancelAddMeal}
                />
            )}
            <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Log a Meal</h2>
                    <div className="relative" ref={searchContainerRef}>
                        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-full shadow-inner p-1 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mx-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search for a food item to log..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setOnlineSearchError(null);
                                }}
                                className="w-full bg-transparent outline-none text-lg text-gray-800 placeholder-gray-500 py-2 pr-3"
                            />
                        </div>

                        {searchTerm && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                                <ul>
                                    {searchResults.map(item => (
                                        <li
                                            key={item.id}
                                            onClick={() => handleSelectFood(item)}
                                            className="px-3 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div>
                                                <span className="text-gray-800 font-medium">{item.name}</span>
                                                <div className="text-xs text-gray-500">
                                                    {item.nutrition.calories} kcal &bull; {item.category}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                     <li>
                                        {isSearchingOnline ? (
                                            <div className="px-3 py-3 text-center text-gray-500 flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Searching online...
                                            </div>
                                        ) : (
                                            <button
                                                onClick={handleSearchOnline}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-100 cursor-pointer text-primary font-semibold flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                                Search online for "{searchTerm}"
                                            </button>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    {onlineSearchError && (
                        <div className="mt-3 p-3 bg-red-100 text-red-800 border-l-4 border-red-500 rounded-r-lg text-sm">
                            <p><span className="font-bold">Error:</span> {onlineSearchError}</p>
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Today's Meal Log</h2>
                    {meals.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-xl shadow-lg">
                           <p className="text-gray-500">No meals logged yet. Use the search bar to get started!</p>
                        </div>
                    ) : (
                        <div>
                            {Object.values(FoodCategory).map(category => renderFoodCategory(category))}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-8">
                <HealthScore score={healthScore} />
                <div className="p-6 bg-white rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Totals</h3>
                    <div className="space-y-3">
                        {(Object.keys(NUTRITION_TARGETS) as Array<keyof Nutrition>).map(key => (
                            <div key={key} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <NutritionIcon type={key} />
                                    <span className="capitalize text-gray-600">{key}</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-semibold text-gray-800">{dailyTotals[key].toFixed(0)}</span>
                                    <span className="text-sm text-gray-500"> / {NUTRITION_TARGETS[key]} {key === 'calories' ? 'kcal' : 'g'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealLog;
