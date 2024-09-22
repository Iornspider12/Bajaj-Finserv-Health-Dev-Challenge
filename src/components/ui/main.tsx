"use client"
import { useState } from "react";
import { Input } from "./input"
import { Label } from "./label"
import { Button } from "./button";
import { FancyMultiSelect } from "./multiselect";

export const Main = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [apiResponse, setApiResponse] = useState<Record<string,any>|null>(null);
    const [error, setError] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const filterOptions = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
    ];
    // @ts-ignore
    const handleClick = async (e) => {
        e.preventDefault();
        setError('');
        setApiResponse(null);

        try {
            // Validate JSON input
            const parsedInput = JSON.parse(jsonInput);

            // Call your API endpoint
            const response = await fetch('http://localhost:3000/api/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedInput),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            setApiResponse(data);
        } catch (err) {
            // @ts-ignore
            setError(err.message || 'An error occurred');
        }
    };
    const renderFilteredResponse = () => {
        if (!apiResponse) return null;

        const filteredData = {};
        selectedFilters.forEach(filter => {
            // @ts-ignore
            filteredData[filter] = apiResponse[filter];
        });

        return (
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Filtered Response:</h3>
                <pre className="bg-gray-100 p-4 rounded mt-2">
                    {JSON.stringify(filteredData, null, 2)}
                </pre>
            </div>
        );
    };
    return (
        <div><Label>API Input</Label>
            <Input
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Enter JSON here" />
            <Button onClick={handleClick}>
                Submit
            </Button>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {apiResponse && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">API Response:</h3>
                    <pre className="bg-gray-100 p-4 rounded mt-2">
                        {JSON.stringify(apiResponse, null, 2)}
                    </pre>
                </div>
            )}

            {apiResponse && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Filter Results:</h3>
                    <FancyMultiSelect
                        onChange={(values) => {
                            setSelectedFilters(values.map(({ value }) => value));
                          }}
                        data={filterOptions}
                        name="filters"
                    />

                </div>
            )}
            {renderFilteredResponse()}
        </div>
    )
}