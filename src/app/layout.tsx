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
            <div className="flex flex-col items-center pt-7 mx-auto max-w-3xl sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl min-h-svh">
              <Header />
              <div className="w-full">{children}</div>
              <Footer />
            </div>
          </ParticlesBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}