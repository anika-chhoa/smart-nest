import { getAllProperties } from '@/lib/api/properties';
import React from 'react';
import AllPropertiesClient from './AllPropertiesClient';

// Next.js Server Page receiving dynamic URL search params
const AllPropertiesPage = async ({ searchParams }) => {
    // Await searchParams in Next.js 15+
    const params = await searchParams;

    // Build the query object to pass to your backend API
    const queryFilters = {
        location: params.location || '',
        propertyType: params.propertyType || 'All',
        priceRange: params.priceRange || 'All',
        sortBy: params.sortBy || 'newest',
        page: params.page || '1',
    };

    // Fetch filtered data directly from your backend route
    const allProperties = await getAllProperties(queryFilters);

    return (
        <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <AllPropertiesClient 
                properties={allProperties || []} 
                activeFilters={queryFilters}
            />
        </div>
    );
};

export default AllPropertiesPage;