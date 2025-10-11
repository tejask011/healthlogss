
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MealLog from './pages/MealLog';
import FoodAlternatives from './pages/FoodAlternatives';
import AiAnalyzer from './pages/AiAnalyzer';
import Exercises from './pages/Exercises';
import DietPlans from './pages/DietPlans';

const App: React.FC = () => {
    return (
        <HashRouter>
            <div className="min-h-screen bg-gray-50 font-sans text-text-primary">
                <Header />
                <main className="p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-white via-light/50 to-light">
                    <Routes>
                        <Route path="/" element={<MealLog />} />
                        <Route path="/alternatives" element={<FoodAlternatives />} />
                        <Route path="/analyzer" element={<AiAnalyzer />} />
                        <Route path="/exercises" element={<Exercises />} />
                        <Route path="/diets" element={<DietPlans />} />
                    </Routes>
                </main>
            </div>
        </HashRouter>
    );
};

export default App;
