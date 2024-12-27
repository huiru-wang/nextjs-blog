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
        <div className="flex items-center justify-center">
            {children}
        </div>
    )
}