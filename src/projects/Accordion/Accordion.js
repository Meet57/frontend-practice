import React, { useState } from 'react';

export const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is React?",
            answer: "React is a JavaScript library for building user interfaces, particularly single-page applications, by creating reusable UI components.",
        },
        {
            question: "What is JSX?",
            answer: "JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML structures within JavaScript code.",
        },
        {
            question: "What is the virtual DOM?",
            answer: "The virtual DOM is an in-memory representation of the actual DOM elements. React updates the virtual DOM first and then syncs it with the real DOM for performance optimization.",
        },
    ];

    const toggleItem = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle between showing and hiding content
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-300">
                    <div onClick={() => toggleItem(index)} className="cursor-pointer p-4 bg-gray-100 font-semibold text-gray-900 hover:bg-gray-200">
                        {faq.question}
                    </div>
                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${activeIndex === index ? 'max-h-40' : 'max-h-0'}`}>
                        <div className={`p-4 bg-white text-gray-700`} >
                            {faq.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
