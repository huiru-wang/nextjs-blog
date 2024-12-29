'use client';
import Image from 'next/image';
import React from 'react';

const BackTop = () => {

    // 生成 1 到 6 的随机数
    const randomIndex = Math.floor(Math.random() * 6) + 1;
    const src = `/widgets/${randomIndex}.png`;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed bottom-0 right-0 p-4 hidden lg:block">
            <Image
                src={src}
                className="cursor-pointer"
                alt="Avatar"
                height={80}
                width={80}
                onClick={scrollToTop}
            />
        </div>
    );
};

export default BackTop;