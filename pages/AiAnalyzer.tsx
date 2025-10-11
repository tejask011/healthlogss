import React, { useState, useRef, useEffect } from 'react';
import { getAiResponse } from '../services/geminiService';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const AiAnalyzer: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiResponseText = await getAiResponse(input);
        const aiMessage: Message = { sender: 'ai', text: aiResponseText };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">AI Nutrition Analyzer</h1>
                <p className="mt-4 text-lg text-gray-600">Ask any question about food, nutrition, or Indian cuisine.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col h-[70vh]">
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                                <p>Ask something like: "Is poha a healthy breakfast?" or "What are the benefits of turmeric?"</p>
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-lg px-4 py-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'}`}>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-lg px-4 py-3 rounded-2xl bg-gray-100 text-gray-900">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your question..."
                            disabled={isLoading}
                            className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent transition disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors duration-300 disabled:bg-gray-400"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiAnalyzer;