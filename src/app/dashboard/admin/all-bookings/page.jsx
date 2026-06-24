
import { getAllBookings } from '@/lib/api/booking';
import React from 'react';
import AllBookingsTableClient from './AllBookingsTableClient';

export default async function AllBookingsPage() {
  const allBookings = await getAllBookings();
  

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <AllBookingsTableClient initialBookings={allBookings || []} />
    </div>
  );
}