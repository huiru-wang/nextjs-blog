'use client';
import React, { useState, useEffect } from 'react';

const BackTop = () => {
    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        if (window.scrollY > 500) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        showButton && (
            <button
                className="fixed right-4 bottom-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out cursor-pointer"
                onClick={scrollToTop}
            >
                Back to Top
            </button>
        )
    );
};

export default BackTop;