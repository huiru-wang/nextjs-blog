"use client";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import Avatar from "./Avatar";
import { press_start_2p } from "@/lib/fonts";
import GithubIcon from "./icons/GithubIcon";
import { motion } from "framer-motion";

// import GithubIcon from "@/public/icons/GithubIcon";
// import SignInAndOut from "./SignIn";

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Projects", href: "/projects" },
];

export default function Header() {
    return (
        <motion.div
            initial={{ y: 0, x: -50, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            className="w-full m-4 flex items-center">
            <Avatar />
            <PixelatedNavbar />
            <Link
                href="https://github.com/huiru-wang/nextjs-blog"
                target="_blank"
                className="opacity-80 hover:opacity-100"
            >
                <GithubIcon />
            </Link>
            <ModeToggle />
        </motion.div>
    );
}

function PixelatedNavbar() {

    return (
        <nav className={`${press_start_2p.className} flex-grow flex justify-center items-center text-[0.5rem] sm:text-[0.8rem] space-x-3 sm:space-x-12`}>
            {
                navigationItems.map(item => {
                    return (
                        <div key={item.name}>
                            <Link href={item.href}>
                                <div className="nav-item text-center text-black">
                                    {item.name}
                                </div>
                            </Link>
                        </div>
                    )
                })
            }
        </nav>
    )
}