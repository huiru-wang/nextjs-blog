import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Roboto_Mono } from "next/font/google";
import ParticlesBackground from "@/components/ParticlesBackground";
import BackTop from "@/components/BackTop";

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

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
            <div className="mx-4 flex items-center justify-center">{children}</div>
            <BackTop />
            <Footer />
          </ParticlesBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}