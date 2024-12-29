import Image from 'next/image';
import React from 'react';

const WidgetImg = ({ src }) => {
    return (
        <div className="fixed bottom-0 left-0 p-4">
            <Image src={src} className="w-24 h-24 object-cover" alt="Fixed Image" />
        </div>
    );
};

export default WidgetImg;