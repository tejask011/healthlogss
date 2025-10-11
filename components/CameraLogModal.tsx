import React, { useState, useRef, useEffect, useCallback } from 'react';
import { identifyFoodFromImage } from '../services/geminiService';
import { FOOD_ITEMS } from '../constants';
import type { FoodItem } from '../types';

interface CameraLogModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFoodIdentified: (food: FoodItem) => void;
}

type Status = 'requesting' | 'streaming' | 'captured' | 'analyzing' | 'error' | 'no_permission';

const CameraLogModal: React.FC<CameraLogModalProps> = ({ isOpen, onClose, onFoodIdentified }) => {
    const [status, setStatus] = useState<Status>('requesting');
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const cleanupCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            setStatus('requesting');
            setError(null);
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                .then(stream => {
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play().catch(console.error);
                        setStatus('streaming');
                    }
                })
                .catch(err => {
                    console.error("Camera access denied:", err);
                    setStatus('no_permission');
                    setError("Camera permission is required to use this feature. Please enable it in your browser settings.");
                });
        } else {
            cleanupCamera();
        }

        return cleanupCamera;
    }, [isOpen, cleanupCamera]);

    const handleSnap = async () => {
        if (videoRef.current && canvasRef.current) {
            setStatus('captured');
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                cleanupCamera();
                
                const imageData = canvas.toDataURL('image/jpeg', 0.9);
                
                setStatus('analyzing');
                const foodName = await identifyFoodFromImage(imageData);

                if (foodName.toLowerCase() === 'unknown' || foodName.startsWith('Sorry')) {
                    setError(`Could not identify the food. Please try again or use the search bar. (AI response: ${foodName})`);
                    setStatus('error');
                    return;
                }

                const foundFood = FOOD_ITEMS.find(item => item.name.toLowerCase() === foodName.toLowerCase());
                if (foundFood) {
                    onFoodIdentified(foundFood);
                } else {
                    setError(`Identified "${foodName}", but it's not in our database. Please log it manually.`);
                    setStatus('error');
                }
            }
        }
    };
    
    const handleClose = () => {
        cleanupCamera();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg text-center overflow-hidden">
                <div className="p-5 border-b relative">
                    <h2 className="text-xl font-bold text-gray-800">Log Meal with Camera</h2>
                    <button onClick={handleClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <div className="p-6">
                    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center text-white">
                        <video ref={videoRef} className={`w-full h-full object-cover ${status === 'streaming' || status === 'requesting' ? 'block' : 'hidden'}`} playsInline />
                        <canvas ref={canvasRef} className={`w-full h-full object-cover ${status !== 'streaming' && status !== 'requesting' ? 'block' : 'hidden'}`} />

                        {(status === 'requesting' || status === 'analyzing') && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 space-y-3">
                                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <p className="text-lg font-semibold">{status === 'requesting' ? 'Starting camera...' : 'Analyzing your meal...'}</p>
                            </div>
                        )}
                        
                        {(status === 'error' || status === 'no_permission') && (
                             <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900 bg-opacity-80 p-4">
                                <p className="text-lg font-semibold mb-4">😔 Oops!</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-5 bg-gray-50 border-t">
                    {status === 'streaming' && (
                        <button onClick={handleSnap} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-lg flex items-center justify-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Snap & Log
                        </button>
                    )}
                     {(status === 'error' || status === 'no_permission') && (
                        <button onClick={handleClose} className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                            Close
                        </button>
                    )}
                    {(status === 'captured' || status === 'analyzing' || status === 'requesting') && (
                         <button disabled className="w-full bg-gray-400 text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed">
                            Processing...
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CameraLogModal;