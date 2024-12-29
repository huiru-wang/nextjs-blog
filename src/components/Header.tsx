"use client";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import Avatar from "./Avatar";
import { press_start_2p } from "@/lib/fonts";

// import GithubIcon from "@/public/icons/GithubIcon";
// import SignInAndOut from "./SignIn";

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "Projects", href: "/projects" },
];

export default function Header() {
    return (
        <header className="px-4 py-2 flex items-center">
            <Avatar />
            <div className="flex-grow flex justify-center">
                <PixelatedNavbar />
            </div>
            <ModeToggle />
        </header>
    );
}

function PixelatedNavbar() {

    return (
        <nav className={`${press_start_2p.className} text-[0.6rem] space-x-3 sm:text-[0.9rem] flex justify-center sm:space-x-8 items-center`}>
            {
                navigationItems.map(item => {
                    return (
                        <div key={item.name}>
                            <Link href={item.href}>
                                <div className="pixel-card nav-item">
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