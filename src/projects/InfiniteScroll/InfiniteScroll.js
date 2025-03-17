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
        <div>
            <div>
                Implementation of Infinite Scroll
            </div>
            <ul>
                {items.map((item) => (
                    <li key={item} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                        Item {item}
                    </li>
                ))}
            </ul>
            <div>{loading && "Loading More Content"}</div>
            <div ref={observerDiv} style={{ height: "20px" }} />
        </div>
    )
}
