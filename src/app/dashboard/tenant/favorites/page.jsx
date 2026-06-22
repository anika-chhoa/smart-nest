import { getFavoritePropertyByUserId } from '@/lib/api/AddToFavourite';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import FavoritePropertiesTableClient from './FavoritePropertiesTableClient';

const FavoriteProperties = async() => {
    const user=await getUserSession()
    if (!user || !user.id) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <p className="font-body text-muted">Please sign in to view your favorites.</p>
            </div>
        );
    }
    const favoriteProperties=await getFavoritePropertyByUserId(user.id)
    console.log(favoriteProperties)
    return (
        <div>
            <section className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="mb-6">
                <h1 className="font-heading text-3xl font-bold text-primary tracking-tight">
                    My Favorites
                </h1>
                <p className="font-body text-sm text-muted mt-1">
                    Manage and view all your saved properties for SmartNest.
                </p>
            </div>
            
            <FavoritePropertiesTableClient initialFavorites={favoriteProperties || []} />
        </section>
        </div>
    );
};

export default FavoriteProperties;