import { Metadata } from "next";

// SEO
export const metadata: Metadata = {
    title: "",
    description: ""
}

export default function Layout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="flex-1 mx-4 lg:flex-none flex flex-col justify-center w-3/4">
        {children}
    </div>
}