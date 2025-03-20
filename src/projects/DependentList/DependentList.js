import React, { useState } from 'react';

const rawData = [
    {
        "id": 1,
        "country": "United States",
        "country_initials": "US",
        "cities": ["New York", "Los Angeles", "Chicago", "Houston", "Miami"]
    },
    {
        "id": 2,
        "country": "Canada",
        "country_initials": "CA",
        "cities": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"]
    },
    {
        "id": 3,
        "country": "United Kingdom",
        "country_initials": "UK",
        "cities": ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"]
    },
    {
        "id": 4,
        "country": "Germany",
        "country_initials": "DE",
        "cities": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"]
    },
    {
        "id": 5,
        "country": "Australia",
        "country_initials": "AU",
        "cities": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"]
    }
];

export const DependentList = () => {
    const [data, setData] = useState({ country: "", city: "" });

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Country and City</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Country Selection */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Country</label>
                    <select
                        value={data.country}
                        onChange={(e) => setData({ ...data, country: e.target.value, city: "" })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="" disabled>Select Country</option>
                        {rawData.map((raw) => (
                            <option value={raw.country} key={raw.country}>
                                {raw.country}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City Selection (Only show when a country is selected) */}
                {data.country && (
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">City</label>
                        <select
                            value={data.city}
                            onChange={(e) => setData({ ...data, city: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="" disabled>Select City</option>
                            {rawData.find((raw) => raw.country === data.country)?.cities.map((city) => (
                                <option value={city} key={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Final Selection Message */}
                {data.country && data.city && (
                    <p className="text-lg font-medium text-green-600 mt-4">
                        ✅ You have selected <strong>{data.city}</strong>, {data.country}.
                    </p>
                )}
            </div>
        </div>
    );
};
