
import React from 'react';
import type { FoodItem, Exercise, DietPlan } from './types';
import { FoodCategory, Cuisine } from './types';

const DumbbellIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M21 8H3V6H21V8ZM14.17 11H9.83L12 8.83L14.17 11ZM20 18H18V13H15V11H9V13H6V18H4V16H2V18C2 19.1 2.9 20 4 20H6C7.1 20 8 19.1 8 18V13H16V18C16 19.1 16.9 20 18 20H20C21.1 20 22 19.1 22 18V16H20V18Z" /></svg>
);
const RunningIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 5.5C14.59 5.5 15.5 4.59 15.5 3.5C15.5 2.41 14.59 1.5 13.5 1.5C12.41 1.5 11.5 2.41 11.5 3.5C11.5 4.59 12.41 5.5 13.5 5.5ZM9.8 19.5L10.9 17.1L9 16L9.5 14.8L12.5 15.8L14.3 12.8C13.6 12.3 13.2 11.5 13.2 10.6C13.2 9.2 14.3 8 15.7 8C16.8 8 17.8 8.8 18.1 9.8L19.4 10.5L19.2 12.3L17.1 11.4L15.7 14L17 16.5H22V18.5H16.5L14.5 15.5L11.2 21.5H9.2L9.8 19.5Z" /></svg>
);
const YogaIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4,2A2,2 0 0,0 2,4V10C2,11.11 2.9,12 4,12H5.17C5.58,13.16 6.5,14 7.67,14H9V16C9,17.11 9.9,18 11,18V21H13V18C14.11,18 15,17.11 15,16V14H16.33C17.5,14 18.42,13.16 18.83,12H20A2,2 0 0,0 22,10V4A2,2 0 0,0 20,2H4M11.5,4A1.5,1.5 0 0,1 13,5.5A1.5,1.5 0 0,1 11.5,7A1.5,1.5 0 0,1 10,5.5A1.5,1.5 0 0,1 11.5,4Z" /></svg>
);
const CyclingIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M15.58,16.5L14.5,13.8L16,13L18.75,18.5L17.25,19.5L15.58,16.5M7,12H11.5L9.5,8H6.5L5.5,10H7.5L8.5,12H7M18.8,11.3C18.4,10.2 17.5,9.3 16.3,9.1L15.2,8.9L14.2,6.9C13.5,5.4 11.9,4.5 10.2,4.9L6,6L5.3,4.5L4.5,4.8L5.2,6.3L4.2,6.6L3.5,5.1L2.7,5.4L4,8.9L2,9.6V10.9L3.8,10.2L5,13L6,12.7L4.7,9.7L5.5,9.4L6.2,10.9L7.3,10.6L6.3,8.4L9.1,7.9C9.7,7.8 10.2,8.2 10.4,8.8L11.5,11H8L7,13H8.5L10,16H11.5L14.7,12.3C15,12.6 15.3,12.9 15.7,13.1L14.8,15.1C14,16.9 14.8,19 16.5,19.8C18.2,20.6 20.3,19.8 21.1,18.1C21.9,16.4 21.1,14.3 19.4,13.5C19.1,13.4 18.7,13.3 18.4,13.3C18.9,12.6 19.1,11.8 18.8,11.3M17.5,18.1C16.8,18.5 15.9,18.2 15.5,17.5C15.1,16.8 15.4,15.9 16.1,15.5C16.8,15.1 17.7,15.4 18.1,16.1C18.5,16.8 18.2,17.7 17.5,18.1Z" /></svg>
);
const SwimmingIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M5,7A2,2 0 0,1 7,5A2,2 0 0,1 9,7A2,2 0 0,1 7,9A2,2 0 0,1 5,7M19,16L17.5,14.5L14.6,17.4L12,14.8L9.2,17.5L6.5,14.8L5,16.3L6.5,17.8L9.2,15L12,17.8L14.8,15L17.5,17.8L19,16.3M21.7,12.5L20.3,11L18,13.4L15.2,10.5L12.5,13.2L9.8,10.5L8,12.3L9.5,13.8L12.3,11L15,13.8L17.8,11L20.2,13.4L21.7,12Z" /></svg>
);

export const FOOD_ITEMS: FoodItem[] = [
    { id: '1', name: 'Poha', category: FoodCategory.Breakfast, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 250, protein: 5, carbs: 45, fat: 5 }, imageUrl: 'https://source.unsplash.com/400x300/?poha,food' },
    { id: '2', name: 'Upma', category: FoodCategory.Breakfast, cuisine: Cuisine.Indian, nutrition: { calories: 280, protein: 7, carbs: 50, fat: 6 }, imageUrl: 'https://source.unsplash.com/400x300/?upma,food' },
    { id: '3', name: 'Thalipeeth', category: FoodCategory.Breakfast, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 300, protein: 10, carbs: 40, fat: 12 }, imageUrl: 'https://source.unsplash.com/400x300/?thalipeeth,food' },
    { id: '4', name: 'Masala Dosa', category: FoodCategory.Breakfast, cuisine: Cuisine.Indian, nutrition: { calories: 350, protein: 8, carbs: 60, fat: 9 }, imageUrl: 'https://source.unsplash.com/400x300/?masala-dosa,food' },
    { id: '5', name: 'Idli Sambar', category: FoodCategory.Breakfast, cuisine: Cuisine.Indian, nutrition: { calories: 200, protein: 8, carbs: 38, fat: 2 }, imageUrl: 'https://source.unsplash.com/400x300/?idli,food' },
    { id: '6', name: 'Misal Pav', category: FoodCategory.Breakfast, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 450, protein: 15, carbs: 55, fat: 18 }, imageUrl: 'https://source.unsplash.com/400x300/?misal-pav,food' },
    { id: '7', name: 'Dal Tadka', category: FoodCategory.Lunch, cuisine: Cuisine.Indian, nutrition: { calories: 250, protein: 12, carbs: 35, fat: 7 }, imageUrl: 'https://source.unsplash.com/400x300/?dal-tadka,food' },
    { id: '8', name: 'Roti (Chapati)', category: FoodCategory.Lunch, cuisine: Cuisine.Indian, nutrition: { calories: 80, protein: 3, carbs: 15, fat: 1 }, imageUrl: 'https://source.unsplash.com/400x300/?roti,food' },
    { id: '9', name: 'Steamed Rice', category: FoodCategory.Lunch, cuisine: Cuisine.Indian, nutrition: { calories: 205, protein: 4, carbs: 45, fat: 0 }, imageUrl: 'https://source.unsplash.com/400x300/?rice,food' },
    { id: '10', name: 'Pithla Bhakri', category: FoodCategory.Lunch, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 350, protein: 12, carbs: 50, fat: 10 }, imageUrl: 'https://source.unsplash.com/400x300/?pithla-bhakri,food' },
    { id: '11', name: 'Bharli Vangi', category: FoodCategory.Lunch, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 280, protein: 6, carbs: 25, fat: 18 }, imageUrl: 'https://source.unsplash.com/400x300/?stuffed-eggplant,food' },
    { id: '12', name: 'Chicken Curry', category: FoodCategory.Lunch, cuisine: Cuisine.Indian, nutrition: { calories: 350, protein: 25, carbs: 10, fat: 22 }, imageUrl: 'https://source.unsplash.com/400x300/?chicken-curry,food' },
    { id: '13', name: 'Paneer Butter Masala', category: FoodCategory.Dinner, cuisine: Cuisine.Indian, nutrition: { calories: 400, protein: 18, carbs: 15, fat: 30 }, imageUrl: 'https://source.unsplash.com/400x300/?paneer-butter-masala,food' },
    { id: '14', name: 'Varan Bhaat', category: FoodCategory.Dinner, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 300, protein: 10, carbs: 55, fat: 4 }, imageUrl: 'https://source.unsplash.com/400x300/?dal-rice,food' },
    { id: '15', name: 'Masale Bhaat', category: FoodCategory.Dinner, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 380, protein: 8, carbs: 65, fat: 9 }, imageUrl: 'https://source.unsplash.com/400x300/?masala-rice,food' },
    { id: '16', name: 'Fish Fry', category: FoodCategory.Dinner, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 320, protein: 22, carbs: 8, fat: 20 }, imageUrl: 'https://source.unsplash.com/400x300/?fish-fry,food' },
    { id: '17', name: 'Baingan Bharta', category: FoodCategory.Dinner, cuisine: Cuisine.Indian, nutrition: { calories: 150, protein: 4, carbs: 20, fat: 6 }, imageUrl: 'https://source.unsplash.com/400x300/?baingan-bharta,food' },
    { id: '18', name: 'Khichdi', category: FoodCategory.Dinner, cuisine: Cuisine.Indian, nutrition: { calories: 340, protein: 14, carbs: 60, fat: 5 }, imageUrl: 'https://source.unsplash.com/400x300/?khichdi,food' },
    { id: '19', name: 'Samosa', category: FoodCategory.Snacks, cuisine: Cuisine.Indian, nutrition: { calories: 260, protein: 5, carbs: 30, fat: 14 }, imageUrl: 'https://source.unsplash.com/400x300/?samosa,food' },
    { id: '20', name: 'Vada Pav', category: FoodCategory.Snacks, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 300, protein: 7, carbs: 40, fat: 12 }, imageUrl: 'https://source.unsplash.com/400x300/?vada-pav,food' },
    { id: '21', name: 'Bhel Puri', category: FoodCategory.Snacks, cuisine: Cuisine.Indian, nutrition: { calories: 280, protein: 6, carbs: 50, fat: 7 }, imageUrl: 'https://source.unsplash.com/400x300/?bhel-puri,food' },
    { id: '22', name: 'Kothimbir Vadi', category: FoodCategory.Snacks, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 200, protein: 8, carbs: 20, fat: 10 }, imageUrl: 'https://source.unsplash.com/400x300/?kothimbir-vadi,food' },
    { id: '23', name: 'Sprouts Salad', category: FoodCategory.Snacks, cuisine: Cuisine.General, nutrition: { calories: 150, protein: 10, carbs: 20, fat: 3 }, imageUrl: 'https://source.unsplash.com/400x300/?sprouts-salad,food' },
    { id: '24', name: 'Fruit Chaat', category: FoodCategory.Snacks, cuisine: Cuisine.Indian, nutrition: { calories: 120, protein: 2, carbs: 30, fat: 0 }, imageUrl: 'https://source.unsplash.com/400x300/?fruit-salad,food' },
    { id: '25', name: 'Alu Paratha', category: FoodCategory.Breakfast, cuisine: Cuisine.Indian, nutrition: { calories: 360, protein: 8, carbs: 45, fat: 16 }, imageUrl: 'https://source.unsplash.com/400x300/?aloo-paratha,food' },
    { id: '26', name: 'Sabudana Khichdi', category: FoodCategory.Breakfast, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 480, protein: 7, carbs: 80, fat: 15 }, imageUrl: 'https://source.unsplash.com/400x300/?sabudana-khichdi,food' },
    { id: '27', name: 'Rajma Chawal', category: FoodCategory.Lunch, cuisine: Cuisine.Indian, nutrition: { calories: 550, protein: 20, carbs: 90, fat: 12 }, imageUrl: 'https://source.unsplash.com/400x300/?rajma-chawal,food' },
    { id: '28', name: 'Chole Bhature', category: FoodCategory.Lunch, cuisine: Cuisine.Indian, nutrition: { calories: 600, protein: 15, carbs: 80, fat: 25 }, imageUrl: 'https://source.unsplash.com/400x300/?chole-bhature,food' },
    { id: '29', name: 'Zunka Bhakar', category: FoodCategory.Lunch, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 400, protein: 15, carbs: 60, fat: 10 }, imageUrl: 'https://source.unsplash.com/400x300/?zunka-bhakar,food' },
    { id: '30', name: 'Palak Paneer', category: FoodCategory.Dinner, cuisine: Cuisine.Indian, nutrition: { calories: 350, protein: 20, carbs: 12, fat: 25 }, imageUrl: 'https://source.unsplash.com/400x300/?palak-paneer,food' },
    { id: '31', name: 'Tambda Rassa', category: FoodCategory.Dinner, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 420, protein: 30, carbs: 10, fat: 28 }, imageUrl: 'https://source.unsplash.com/400x300/?mutton-curry,food' },
    { id: '32', name: 'Dal Makhani', category: FoodCategory.Dinner, cuisine: Cuisine.Indian, nutrition: { calories: 450, protein: 18, carbs: 40, fat: 25 }, imageUrl: 'https://source.unsplash.com/400x300/?dal-makhani,food' },
    { id: '33', name: 'Pani Puri', category: FoodCategory.Snacks, cuisine: Cuisine.Indian, nutrition: { calories: 300, protein: 6, carbs: 50, fat: 8 }, imageUrl: 'https://source.unsplash.com/400x300/?panipuri,food' },
    { id: '34', name: 'Dhokla', category: FoodCategory.Snacks, cuisine: Cuisine.Indian, nutrition: { calories: 160, protein: 8, carbs: 25, fat: 3 }, imageUrl: 'https://source.unsplash.com/400x300/?dhokla,food' },
    { id: '35', name: 'Shrikhand', category: FoodCategory.Snacks, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 250, protein: 5, carbs: 35, fat: 10 }, imageUrl: 'https://source.unsplash.com/400x300/?shrikhand,food' },
    { id: '36', name: 'Rava Ladoo', category: FoodCategory.Snacks, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 180, protein: 3, carbs: 25, fat: 8 }, imageUrl: 'https://source.unsplash.com/400x300/?ladoo,food' },
    { id: '37', name: 'Oats Idli', category: FoodCategory.Breakfast, cuisine: Cuisine.Indian, nutrition: { calories: 150, protein: 7, carbs: 25, fat: 2 }, imageUrl: 'https://source.unsplash.com/400x300/?oats-idli,food' },
    { id: '38', name: 'Moong Dal Cheela', category: FoodCategory.Breakfast, cuisine: Cuisine.Indian, nutrition: { calories: 180, protein: 12, carbs: 20, fat: 5 }, imageUrl: 'https://source.unsplash.com/400x300/?moong-dal-cheela,food' },
    { id: '39', name: 'Vegetable Pulao', category: FoodCategory.Lunch, cuisine: Cuisine.Indian, nutrition: { calories: 350, protein: 7, carbs: 60, fat: 8 }, imageUrl: 'https://source.unsplash.com/400x300/?pulao,food' },
    { id: '40', name: 'Aloo Gobi', category: FoodCategory.Lunch, cuisine: Cuisine.Indian, nutrition: { calories: 200, protein: 5, carbs: 25, fat: 10 }, imageUrl: 'https://source.unsplash.com/400x300/?aloo-gobi,food' },
    { id: '41', name: 'Kadhi Pakora', category: FoodCategory.Lunch, cuisine: Cuisine.Indian, nutrition: { calories: 280, protein: 10, carbs: 25, fat: 15 }, imageUrl: 'https://source.unsplash.com/400x300/?kadhi-pakora,food' },
    { id: '42', name: 'Solkadhi', category: FoodCategory.Dinner, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 100, protein: 2, carbs: 8, fat: 7 }, imageUrl: 'https://source.unsplash.com/400x300/?solkadhi,drink' },
    { id: '43', name: 'Malai Kofta', category: FoodCategory.Dinner, cuisine: Cuisine.Indian, nutrition: { calories: 450, protein: 12, carbs: 20, fat: 35 }, imageUrl: 'https://source.unsplash.com/400x300/?malai-kofta,food' },
    { id: '44', name: 'Matar Paneer', category: FoodCategory.Dinner, cuisine: Cuisine.Indian, nutrition: { calories: 320, protein: 16, carbs: 15, fat: 22 }, imageUrl: 'https://source.unsplash.com/400x300/?matar-paneer,food' },
    { id: '45', name: 'Aloo Tikki', category: FoodCategory.Snacks, cuisine: Cuisine.Indian, nutrition: { calories: 220, protein: 4, carbs: 30, fat: 10 }, imageUrl: 'https://source.unsplash.com/400x300/?aloo-tikki,food' },
    { id: '46', name: 'Roasted Makhana', category: FoodCategory.Snacks, cuisine: Cuisine.General, nutrition: { calories: 100, protein: 4, carbs: 20, fat: 1 }, imageUrl: 'https://source.unsplash.com/400x300/?makhana,food' },
    { id: '47', name: 'Dahi Vada', category: FoodCategory.Snacks, cuisine: Cuisine.Indian, nutrition: { calories: 280, protein: 10, carbs: 30, fat: 13 }, imageUrl: 'https://source.unsplash.com/400x300/?dahi-vada,food' },
    { id: '48', name: 'Puran Poli', category: FoodCategory.Dinner, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 350, protein: 8, carbs: 60, fat: 8 }, imageUrl: 'https://source.unsplash.com/400x300/?puran-poli,food' },
    { id: '49', name: 'Gajar Halwa', category: FoodCategory.Snacks, cuisine: Cuisine.Indian, nutrition: { calories: 300, protein: 5, carbs: 40, fat: 14 }, imageUrl: 'https://source.unsplash.com/400x300/?gajar-halwa,food' },
    { id: '50', name: 'Jalebi', category: FoodCategory.Snacks, cuisine: Cuisine.Indian, nutrition: { calories: 400, protein: 4, carbs: 70, fat: 12 }, imageUrl: 'https://source.unsplash.com/400x300/?jalebi,food' },
    { id: '51', name: 'Besan Ladoo', category: FoodCategory.Snacks, cuisine: Cuisine.Indian, nutrition: { calories: 200, protein: 5, carbs: 22, fat: 11 }, imageUrl: 'https://source.unsplash.com/400x300/?besan-ladoo,food' },
    { id: '52', name: 'Sheera', category: FoodCategory.Breakfast, cuisine: Cuisine.Maharashtrian, nutrition: { calories: 320, protein: 6, carbs: 45, fat: 13 }, imageUrl: 'https://source.unsplash.com/400x300/?sheera,food' },
];

export const EXERCISES: Exercise[] = [
    { name: 'Running / Jogging', caloriesBurnedPerHour: 600, description: 'Excellent for cardiovascular health and endurance.', icon: <RunningIcon className="w-10 h-10 text-white" /> },
    { name: 'Cycling', caloriesBurnedPerHour: 550, description: 'Low-impact cardio that is easy on the joints.', icon: <CyclingIcon className="w-10 h-10 text-white" /> },
    { name: 'Swimming', caloriesBurnedPerHour: 700, description: 'Full-body workout that improves strength and flexibility.', icon: <SwimmingIcon className="w-10 h-10 text-white" /> },
    { name: 'Weight Lifting', caloriesBurnedPerHour: 450, description: 'Builds muscle mass, which boosts metabolism.', icon: <DumbbellIcon className="w-10 h-10 text-white" /> },
    { name: 'Yoga', caloriesBurnedPerHour: 250, description: 'Improves flexibility, balance, and mental well-being.', icon: <YogaIcon className="w-10 h-10 text-white" /> },
    { name: 'Walking (brisk)', caloriesBurnedPerHour: 300, description: 'A simple and effective way to stay active.', icon: <RunningIcon className="w-10 h-10 text-white" /> },
    { name: 'Zumba / Aerobics', caloriesBurnedPerHour: 500, description: 'Fun, high-energy dance workout for cardio fitness.', icon: <DumbbellIcon className="w-10 h-10 text-white" /> },
];

const findFood = (name: string) => FOOD_ITEMS.find(f => f.name === name)!;

export const DIET_PLANS: DietPlan[] = [
    {
        name: 'High-Protein Diet',
        description: 'Focuses on protein-rich foods to aid muscle growth and satiety. Ideal for active individuals.',
        imageUrl: 'https://imgs.search.brave.com/ryNXN_kT625ispfQohVRk297-5OGVlQTFxOAG_L5a9I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2hvbGVzb21leXVt/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMy8wOC93aG9s/ZXNvbWV5dW0tR3Jp/bGxlZC1DaGlja2Vu/LVNhbGFkLTcuanBn',
        samplePlan: {
            breakfast: [findFood('Moong Dal Cheela'), findFood('Sprouts Salad')],
            lunch: [findFood('Chicken Curry'), findFood('Roti (Chapati)')],
            dinner: [findFood('Paneer Butter Masala'), findFood('Dal Tadka')],
            snacks: [findFood('Roasted Makhana')],
        }
    },
    {
        name: 'Balanced Diet',
        description: 'A traditional, well-rounded diet covering all food groups for overall health.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-gj7LnZq7UgVCrdGeE43clD9zIEBhSnwwkw&s',
        samplePlan: {
            breakfast: [findFood('Poha')],
            lunch: [findFood('Dal Tadka'), findFood('Roti (Chapati)'), findFood('Steamed Rice')],
            dinner: [findFood('Baingan Bharta'), findFood('Roti (Chapati)')],
            snacks: [findFood('Fruit Chaat')],
        }
    },
    {
        name: 'Low-Carb Diet',
        description: 'Reduces carbohydrate intake to promote weight loss and manage blood sugar levels.',
        imageUrl: 'https://mtalvernia.sg/wp-content/uploads/2019/07/Low-carb-diet.png',
        samplePlan: {
            breakfast: [findFood('Sprouts Salad')],
            lunch: [findFood('Chicken Curry'), findFood('Palak Paneer')],
            dinner: [findFood('Fish Fry'), findFood('Aloo Gobi')],
            snacks: [findFood('Roasted Makhana')],
        }
    },
    {
        name: 'Maharashtrian Traditional Diet',
        description: 'A wholesome diet plan based on authentic Maharashtrian cuisine.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGUMAkrMlfwsvtQo6-BENMKTvdp4ENyK_EYQ&s',
        samplePlan: {
            breakfast: [findFood('Thalipeeth')],
            lunch: [findFood('Pithla Bhakri'), findFood('Bharli Vangi')],
            dinner: [findFood('Varan Bhaat'), findFood('Masale Bhaat')],
            snacks: [findFood('Kothimbir Vadi')],
        }
    },
    {
        name: 'Weight Gain Diet',
        description: 'Focuses on calorie-dense and nutrient-rich foods to help build mass.',
        imageUrl: 'https://static.india.com/wp-content/uploads/2023/02/WhatsApp-Image-2023-02-01-at-10.12.37-AM.jpeg',
        samplePlan: {
            breakfast: [findFood('Alu Paratha'), findFood('Sheera')],
            lunch: [findFood('Rajma Chawal'), findFood('Paneer Butter Masala')],
            dinner: [findFood('Dal Makhani'), findFood('Puran Poli')],
            snacks: [findFood('Shrikhand'), findFood('Besan Ladoo')],
        }
    },
    {
        name: 'Vegetarian Diet',
        description: 'A complete vegetarian plan providing all necessary nutrients from plant-based sources.',
        imageUrl: 'https://nfcihospitality.com/wp-content/uploads/2024/08/North-Indias-Veg.-Thali-1024x683.jpg',
        samplePlan: {
            breakfast: [findFood('Upma')],
            lunch: [findFood('Rajma Chawal'), findFood('Aloo Gobi')],
            dinner: [findFood('Palak Paneer'), findFood('Roti (Chapati)')],
            snacks: [findFood('Dhokla')],
        }
    },
    {
        name: 'Fasting (Upvas) Diet',
        description: 'A diet plan with foods commonly consumed during religious fasting in India.',
        imageUrl: 'https://www.shutterstock.com/image-photo/navratri-upwas-thali-fasting-food-260nw-1518092804.jpg',
        samplePlan: {
            breakfast: [findFood('Sabudana Khichdi')],
            lunch: [findFood('Fruit Chaat')],
            dinner: [findFood('Roasted Makhana')],
            snacks: [findFood('Shrikhand')],
        }
    },
    {
        name: 'South Indian Diet',
        description: 'A light and nutritious diet plan featuring popular South Indian dishes.',
        imageUrl: 'https://static.toiimg.com/photo/105296914.cms',
        samplePlan: {
            breakfast: [findFood('Idli Sambar')],
            lunch: [findFood('Masala Dosa')],
            dinner: [findFood('Steamed Rice'), findFood('Dal Tadka')],
            snacks: [findFood('Fruit Chaat')],
        }
    },
    {
        name: 'Gluten-Free Diet',
        description: 'A diet that excludes gluten, suitable for individuals with celiac disease or gluten sensitivity.',
        imageUrl: 'https://azdietitians.com/wp-content/uploads/2023/07/Pictures-for-Blog-5.png',
        samplePlan: {
            breakfast: [findFood('Idli Sambar')],
            lunch: [findFood('Steamed Rice'), findFood('Chicken Curry')],
            dinner: [findFood('Fish Fry'), findFood('Sprouts Salad')],
            snacks: [findFood('Fruit Chaat')],
        }
    },
    {
        name: 'Keto-Friendly Indian Diet',
        description: 'Adapts Indian cuisine for a ketogenic diet, focusing on high fat, moderate protein, and very low carbs.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7TqlYEDCSM9CCqvWvY3ep7Y9jvz0zXJKfcA&s',
        samplePlan: {
            breakfast: [findFood('Paneer Butter Masala')], // Scrambled paneer would be better but using available items
            lunch: [findFood('Palak Paneer'), findFood('Chicken Curry')],
            dinner: [findFood('Fish Fry'), findFood('Baingan Bharta')],
            snacks: [findFood('Roasted Makhana')],
        }
    }
];