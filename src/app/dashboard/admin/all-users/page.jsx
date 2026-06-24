
import { getAllUsers } from '@/lib/api/users';
import AllUsersTableClient from './AllUsersTableClient';
import React from 'react';

export const dynamic = 'force-dynamic';

const AllUsersPage = async () => {
    const allUsers = await getAllUsers();


    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="font-heading text-3xl font-bold text-primary">
                    All Users
                </h1>
                <p className="font-body text-sm text-muted mt-1">
                    Manage system roles, account access, and global permissions for SmartNest profiles.
                </p>
            </div>
            
            <AllUsersTableClient initialUsers={allUsers} />
        </div>
    );
};

export default AllUsersPage;