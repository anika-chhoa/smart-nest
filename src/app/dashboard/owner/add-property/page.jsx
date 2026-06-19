import { getUserSession } from '@/lib/core/session';
import React from 'react';
import AddPropertyForm from './AddPropertyForm';

const AddProperty = async() => {
    const user=await getUserSession()
    console.log(user)
    return (
        <div>
            <AddPropertyForm user={user}/>
        </div>
    );
};

export default AddProperty;