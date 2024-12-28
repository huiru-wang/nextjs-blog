import { Metadata } from "next";

// SEO
export const metadata: Metadata = {
    title: "",
    description: ""
}

// Blog List Layout
export default function Layout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col justify-center w-3/4">
            {children}
        </div>
    )
}