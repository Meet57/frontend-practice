import React, { useEffect, useRef, useState, useCallback } from 'react';
import { NewsCard } from './NewsCard';

export const InfiniteScrollNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const observerRef = useRef(null);

    const API_KEY = process.env.REACT_APP_NEWS_API;
    const url = `https://newsapi.org/v2/everything?q=india&apiKey=${API_KEY}&pageSize=12&page=${page}`;

    const fetchNews = useCallback(async () => {
        setLoading(true);
        setTimeout(() => {
            try {
                const response = fetch(url);
                const json = response.json();
                if (json.articles) {
                    setNews((prevNews) => [...prevNews, ...json.articles]);
                }
            } catch (err) {
                console.error("Error fetching news:", err);
            }
            setLoading(false);
        }, 2000);
    }, [url]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [loading]);

    return (
        <div className='pt-10'>
            <h1 className="text-2xl font-bold text-center mb-5">News on India</h1>

            <div className="flex flex-col items-center gap-6">
                {news.map((article, index) => (
                    <NewsCard key={index} news={article} />
                ))}
            </div>

            {loading && <p className="text-center text-gray-500">Loading...</p>}

            <div ref={observerRef} className="h-10"></div>
        </div>
    );
};

export default InfiniteScrollNews;