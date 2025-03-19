import React, { useEffect, useRef, useState } from 'react'

export const InfiniteScroll = () => {
    const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1))
    const [loading, setLoading] = useState(false)
    const observerDiv = useRef(null)

    const loadMore = () => {
        setLoading(true)

        setTimeout(() => {
            setItems(
                (prevItems) => [...prevItems, ...Array.from({ length: 15 }, (_, i) => prevItems.length + i + 1)]
            )
            setLoading(false)
        }, 1500);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    loadMore()
                }
            },
            { threshold: 1.0 }
        )

        if (observerDiv.current) observer.observe(observerDiv.current)

        return () => observer.disconnect()
    }, [loading])

    return (
        <div className="p-4">
            <div className="text-xl font-semibold mb-4">Implementation of Infinite Scroll</div>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item} className="p-2 border-b border-gray-300">
                        Item {item}
                    </li>
                ))}
            </ul>
            {loading && (
                <div className="text-center mt-4 text-gray-500">
                    Loading More Content...
                </div>
            )}
            <div ref={observerDiv} className="h-5"></div>
        </div>
    )
}
