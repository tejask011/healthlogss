
import React, { useState } from 'react';
import { DIET_PLANS } from '../constants';
import CustomizePlanModal from '../components/CustomizePlanModal';
import type { CustomDietPlan } from '../types';

const DietPlans: React.FC = () => {
    const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customPlan, setCustomPlan] = useState<CustomDietPlan | null>(null);
    const [generationError, setGenerationError] = useState<string | null>(null);

    const togglePlan = (name: string) => {
        setExpandedPlan(expandedPlan === name ? null : name);
    };
    
    const handlePlanGenerated = (plan: CustomDietPlan | null, error?: string) => {
        if (plan) {
            setCustomPlan(plan);
            setGenerationError(null);
        }
        if (error) {
            setGenerationError(error);
            setCustomPlan(null);
        }
        setIsModalOpen(false);
    }

    return (
        <div className="max-w-6xl mx-auto">
             <CustomizePlanModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPlanGenerated={handlePlanGenerated}
            />

            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Curated Diet Plans</h1>
                <p className="mt-4 text-lg text-gray-600">Explore various diet plans tailored to different health goals and preferences.</p>
            </div>

            <div 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-primary to-green-600 rounded-xl shadow-lg p-8 mb-12 text-white text-center cursor-pointer hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
                <h2 className="text-3xl font-bold mb-2">✨ Create Your Personalized Diet Plan</h2>
                <p>Click here to tell our AI your preferences and get a custom plan in seconds!</p>
            </div>
            
            {customPlan && (
                <div className="mb-12 bg-white rounded-xl shadow-lg border-2 border-primary">
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-primary">{customPlan.planName}</h3>
                        <p className="text-gray-600 mt-2 text-sm">{customPlan.description}</p>
                    </div>
                    <div className="p-6 border-t border-gray-200 bg-green-50">
                        <div className="space-y-6">
                            {(Object.keys(customPlan.meals) as Array<keyof typeof customPlan.meals>).map(mealType => (
                                <div key={mealType}>
                                    <h5 className="font-bold capitalize text-gray-800 mb-2 border-b-2 border-primary pb-1 inline-block text-md">{mealType}</h5>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {customPlan.meals[mealType].map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {generationError && (
                 <div className="mb-12 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                    <p className="font-bold">Error Generating Plan</p>
                    <p>{generationError}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {DIET_PLANS.map((plan) => (
                    <div key={plan.name} className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl flex flex-col border-t-4 border-primary">
                        <div onClick={() => togglePlan(plan.name)} className="cursor-pointer">
                            <img src={plan.imageUrl} alt={plan.name} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-primary">{plan.name}</h3>
                                    <svg
                                        className={`w-6 h-6 text-primary transform transition-transform duration-300 ${
                                            expandedPlan === plan.name ? 'rotate-180' : ''
                                        }`}
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
                            </div>
                        </div>
                        
                        {expandedPlan === plan.name && (
                            <div className="p-6 border-t border-gray-200 bg-gray-50 flex-grow">
                                <h4 className="font-semibold text-lg text-gray-700 mb-4">Sample Daily Plan</h4>
                                <div className="space-y-6">
                                    {(Object.keys(plan.samplePlan) as Array<keyof typeof plan.samplePlan>).map(mealType => (
                                        <div key={mealType}>
                                            <h5 className="font-bold capitalize text-gray-800 mb-2 border-b-2 border-primary pb-1 inline-block text-md">{mealType}</h5>
                                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                                {plan.samplePlan[mealType].map(item => (
                                                    <li key={item.id}>{item.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DietPlans;
