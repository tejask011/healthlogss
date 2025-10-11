// Fix: Import React to resolve the 'React.ReactNode' type used in the Exercise interface.
import React from 'react';

export interface Nutrition {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export enum FoodCategory {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    Snacks = 'Snacks',
}

export enum Cuisine {
    Indian = 'Indian',
    Maharashtrian = 'Maharashtrian',
    General = 'General',
}

export interface FoodItem {
    id: string;
    name: string;
    category: FoodCategory;
    cuisine: Cuisine;
    nutrition: Nutrition;
    imageUrl?: string;
    sources?: { uri: string; title: string }[];
}

export interface Meal extends FoodItem {
    timestamp: number;
    portionName: 'Small' | 'Medium' | 'Large';
}

export interface Exercise {
    name: string;
    caloriesBurnedPerHour: number;
    description: string;
    icon: React.ReactNode;
}

export interface DietPlan {
    name: string;
    description: string;
    imageUrl: string;
    samplePlan: {
        breakfast: FoodItem[];
        lunch: FoodItem[];
        dinner: FoodItem[];
        snacks: FoodItem[];
    };
}

export interface FoodAlternative {
    unhealthy: string;
    unhealthyDesc: string;
    healthy: string;
    healthyDesc: string;
}

export interface CustomDietPlan {
    planName: string;
    description: string;
    meals: {
        breakfast: string[];
        lunch: string[];
        dinner: string[];
        snacks: string[];
    };
}
