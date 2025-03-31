import React, { useEffect, useState } from 'react'

const URL = "https://dummyjson.com/products?limit=10&skip=SKIP"

export const Pagination = () => {
    const [page, setPage] = useState(1);
    const [max, setMax] = useState(0);
    const [products, setProducts] = useState({});

    const fetchURL = async (pageNumber) => {
        const skip = (pageNumber - 1) * 10;
        const response = await fetch(URL.replace("SKIP", skip));
        const data = await response.json();
        setMax(data.total);
        setProducts((prev) => ({ ...prev, [pageNumber]: data.products }));
    };

    const updatePagination = (newPage) => {
        setPage(newPage);
        if (!products[newPage]) {
            fetchURL(newPage);
        }
    };

    useEffect(() => {
        fetchURL(1);
    }, []);

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Pagination</h1>

            <div className='flex gap-2'>
                {
                    Array.from({ length: Math.ceil(max / 10) }).map((_, idx) => {
                        return (
                            <div onClick={() => updatePagination(idx + 1)} key={idx + 1} className={`${idx + 1 === page ? "border-blue-900 border-2" : "text-black"} text-center h-10 w-10 text-sm cursor-pointer border p-2 rounded`}>
                                {idx + 1}
                            </div>
                        )
                    })
                }
            </div>

            <div className='grid grid-cols-5 gap-4 my-4'>
                {
                    products[page] && products[page].map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })
                }
            </div>


        </div>
    )
}


const ProductCard = ({ product }) => {
    return (
        <div className="border p-4 rounded-lg w-64">
            <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover mb-2 rounded" />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-600">{product.brand}</p>
            <p className="text-green-600 font-semibold">${product.price}</p>
            <p className="text-sm text-gray-500">{product.availabilityStatus}</p>
            <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Buy Now</button>
        </div>
    );
};