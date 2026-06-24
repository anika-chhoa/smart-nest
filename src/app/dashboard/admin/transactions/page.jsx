// src/app/dashboard/admin/transactions/page.jsx
import { getAllBookings } from '@/lib/api/booking';
import React from 'react';
import AllTransactionsTableClient from './AllTransactionsTableClient';

export default async function TransactionsPage() {
  const allBookings = await getAllBookings();

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <AllTransactionsTableClient initialBookings={allBookings || []} />
    </div>
  );
}