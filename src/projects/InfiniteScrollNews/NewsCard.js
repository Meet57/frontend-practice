import React from "react";

export const NewsCard = ({ news }) => {
    return (
        <div className="w-2xl mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200">
            {/* News Content */}
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{news.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{news.description}</p>

                {/* Source & Published Date */}
                <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                    <span>{news.source.name}</span>
                    <span>{new Date(news.publishedAt).toDateString()}</span>
                </div>

                {/* Read More Button */}
                <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                >
                    Read more →
                </a>
            </div>
        </div>
    );
};