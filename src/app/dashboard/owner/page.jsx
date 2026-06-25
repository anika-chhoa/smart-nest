// import { auth } from '@/lib/auth';
// import { headers } from 'next/headers';
import React from 'react';

const OwnerDashboard = async() => {
    // const {session} = await auth.api.getSession({
    //     headers: await headers(),
    //   });
    //   const token = session?.token;
    //   console.log(token);
    return (
        <div>
            Owner Dashboard
        </div>
    );
};

export default OwnerDashboard;