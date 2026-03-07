'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import LoginIcon from '@mui/icons-material/Login';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="flex justify-center mt-36 min-h-screen" >
            <div className="w-full max-w-md">
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                            <LoginIcon/>{" "}
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Don't have an account?{' '}
                    <Link href="/register"
                          className="text-blue-500 hover:text-blue-700">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
