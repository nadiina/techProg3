import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
const ProfilePage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <p className="mb-4">Welcome to your profile page. Here you can manage your personal information and settings.</p>
            <div className="border rounded p-4">
                <div className="flex gap-2">
                    <AccountBoxIcon/>
                    <h2 className="text-lg font-semibold mb-2"> Personal Information</h2>
                </div>
                <p>Name: Tom Crush</p>
                <p>Email: test@example.com</p>
                <p>Phone: 123-456-7890</p>
            </div>
        </div>
    );
};

export default ProfilePage;
