"use client";
import Link from "next/link";
import ModeToggle from "./ModeToggle";

// import GithubIcon from "@/public/icons/GithubIcon";
// import SignInAndOut from "./SignIn";

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/posts" },
    { name: "Projects", href: "/projects" },
];

export default function Header() {
    return (
        <header className="flex justify-between items-center px-4 py-2">
            <div className="flex-grow flex justify-center">
                <PixelatedNavbar />
            </div>
            <div className="flex-shrink-0 mr-2 mb-2">
                <ModeToggle />
            </div>
        </header>
    );
}

function PixelatedNavbar() {

    return (
        <nav className="flex justify-center space-x-8 items-center m-4">
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