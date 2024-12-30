import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface WidgetImgProps {
    src: StaticImageData;
    position: 'left' | 'right';
}

const WidgetImg = ({ src }: WidgetImgProps) => {


    return (
        <div className="fixed bottom-0 left-5 p-4">
            <Image src={src} className="w-24 h-24 object-cover" alt="Fixed Image" />
        </div>
    );
};

export default WidgetImg;