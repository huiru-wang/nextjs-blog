import type { Metadata } from "next";
import "@/styles/globals.css";
import { roboto_mono } from "@/lib/fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ParticlesBackground from "@/components/ParticlesBackground";

export const metadata: Metadata = {
  title: "web developer portfolio",
  description: "web developer portfolio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto_mono.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ParticlesBackground>
            <Header />
            <div className="flex justify-center">{children}</div>
            <Footer />
          </ParticlesBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}