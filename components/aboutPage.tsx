'use client'
import React, {useState} from 'react';
import EdgesensorLowIcon from '@mui/icons-material/EdgesensorLow';

const AboutPage = () => {

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex gap-3">
                <EdgesensorLowIcon/>
                <h1 className="text-2xl font-bold mb-4">About ContactMe</h1>
            </div>
            <p className="mb-4">Contact Manager is a web application designed for storing, deleting, and editing
                contacts. We are committed to data protection and privacy.</p>
            <p className="mb-4">Contact Manager is a web application designed to connect people through a database of
                contacts. Our goal is to provide a platform for storing, deleting, and editing contacts while ensuring
                data protection and privacy. We have optimized our website to be mobile-friendly for the best user
                experience across different devices.</p>
        </div>
    );
};

export default AboutPage;
