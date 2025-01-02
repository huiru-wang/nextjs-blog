import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface WidgetImgProps {
    src: StaticImageData;
    position: 'left' | 'right';
}

const WidgetImg = ({ src, position }: WidgetImgProps) => {

    const positionClass = position === 'left' ? 'left-5' : 'right-5';

    return (
        <div className={`hidden xl:block fixed bottom-0 ${positionClass} p-4`}>
            <Image src={src} className="w-24 h-24 object-cover" alt="Fixed Image" />
        </div>
    );
};

export default WidgetImg;