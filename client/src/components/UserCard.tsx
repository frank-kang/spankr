import logo from '../public/images/smallTennisBall.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function UserCard() {
  return (
    <li>
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
        <img
          src={logo}
          alt="image of tennis ball"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold">Tom Jones</h2>
        <p className="text-gray-600">ZipCode: 92026</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Profile
        </button>
      </div>
    </li>
  );
}
