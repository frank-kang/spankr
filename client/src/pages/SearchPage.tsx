import { UserCard } from '../components/UserCard';
import { useState } from 'react';
import React from 'react';

export function SearchPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Search for Players</h1>
      <input
        type="text"
        placeholder="Enter your location"
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Search
      </button>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </ul>
    </div>
  );
}
