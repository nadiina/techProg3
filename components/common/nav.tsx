'use client'
import React, { useState } from 'react';
import Link from "next/link";

const MobileMenuLinks = () => (
    <>
        <Link href="/" className="block text-white py-1 px-4">Home</Link>
        <Link href="/about" className="block text-white py-1 px-4">About</Link>
        <Link href="/profile" className="block text-white py-1 px-4">Profile</Link>
        <Link href="/login" className="block text-white py-1 px-4">Login</Link>
        <Link href="/register" className="block text-white py-1 px-4">Register</Link>
    </>
);

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-slate-600 p-6">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <div className="text-white font-bold">
                        <Link href="/">
                            <span>ContactMe</span>
                        </Link>
                    </div>
                </div>
                <div className="hidden md:flex space-x-4">
                    <MobileMenuLinks />
                </div>
                <div className="md:hidden">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Menu
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-slate-600 py-2">
                    <MobileMenuLinks />
                </div>
            )}
        </nav>
    );
};

export default Nav;
