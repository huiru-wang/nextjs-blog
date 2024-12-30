'use client';
import { useState } from "react";

export default function PopupImage({ src, alt }) {

    const [showImage, setShowImage] = useState(false);

    const togglePreview = () => {
        setShowImage(!showImage);
    };

    return (
        <>
            <img
                src={src}
                alt={alt}
                className="cursor-pointer hover:opacity-90"
                onClick={togglePreview}
            />

            {showImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-pointer"
                    onClick={togglePreview}
                >
                    <div className="max-w-[90vw] max-h-[90vh]">
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
}