"use client";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Press_Start_2P } from "next/font/google";

// import GithubIcon from "@/public/icons/GithubIcon";
// import SignInAndOut from "./SignIn";

const press_start_2p = Press_Start_2P({ subsets: ["latin"], weight: '400' });

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "Projects", href: "/projects" },
];

export default function Header() {
    return (
        <header className="px-4 py-2">
            <div className="flex-grow flex justify-center">
                <PixelatedNavbar />
            </div>
            <ModeToggle />
        </header>
    );
}

function PixelatedNavbar() {

    return (
        <nav className={`${press_start_2p.className} text-press-start-small flex justify-center space-x-8 items-center m-4`}>
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