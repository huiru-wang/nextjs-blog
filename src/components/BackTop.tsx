'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const BackTop = ({ imgList }) => {

    const [imgPath, setImgPath] = useState("/widgets/3.png")

    useEffect(() => {
        const imagePath = getRandomImage();
        setImgPath(imagePath);
    }, [imgList])

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imgList.length);
        const imgFileName = imgList[randomIndex] + ".png";
        return `/widgets/${imgFileName}`;
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setImgPath(getRandomImage());
    };

    return (
        <div className="fixed bottom-0 right-0 p-4 hidden lg:block pixel-cursor-pointer">
            <Image
                src={imgPath}
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