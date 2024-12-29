import React from 'react';
import '@/styles/modal.css'
import Link from 'next/link';
import BlurFade from '../ui/blur-fade';

const defaultSrc = 'https://cdn.prod.website-files.com/5e8b5d6cee4cf17b3ee15385/5e8b5dc4752dd8f0bf5f1d51_1586191812047-image5.jpg';

interface ProjectModalProps {
    redirect?: string;
    img: string;
    title: string;
    description: string;
}

export default function ProjectModal({ redirect, img, title, description }: ProjectModalProps) {

    const defaultRedirect = redirect || '/';

    const defaultImg = img || defaultSrc;

    const defaultTitle = title || "2020-5-12 project.html";

    const defaultDescription = description || 'Eum quisquam commodi eveniet nemo quod ratione maiores.Laboriosam sed qui laborum deleniti voluptas nemo tempora.Harum et quos.Fugit alias rem a tenetur eos iste.Culpa est sed nemo.';

    return (
        <BlurFade
            delay={0.1}
            inView
        >
            <div className="bg-[var(--project)] text-black flex flex-col border-4 border-[var(--border)] shadow-[4px_4px_2px_0_var(--border)]">
                <div className="relative p-[14px_20px] border-b-4 border-black font-semibold text-center">
                    <div className="button-circles-wrap">
                        <div className="button-circle"></div>
                        <div className="button-circle"></div>
                    </div>
                    <div className="flex-center">
                        <div>{defaultTitle}</div>
                    </div>
                </div>
                <div
                    className="w-full h-40 flex items-end border-b-5 border-[var(--border)] bg-center bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url('${defaultImg}')` }}
                ></div>
                <div className="flex flex-col justify-between items-start flex-1 p-6">
                    <p className='h-[6em] overflow-hidden overflow-ellipsis break-words overflow-y-auto line-clamp-3'>
                        {defaultDescription}
                    </p>
                    <Link
                        className="border-4 border-[var(--border)] p-2 mt-4 hover:bg-black hover:text-white"
                        href={defaultRedirect}
                    >
                        View project
                    </Link>
                </div>
            </div>
        </BlurFade>

    );
};