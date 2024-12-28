import HeroAnimation from "@/components/home/HeroAnimation";
import Socials from "@/components/home/Socials";

export default function Hero() {
    return (
        <div>
            <p className="mb-6 font-semibold">
                <span className="sm:bg-gradient-to-r to-foreground bg-gradient-to-t from-muted-foreground bg-clip-text lg:text-[32px] text-[16px]">
                    Hi, I&apos;m Debra
                </span>
            </p>
            <div className="h-10 mb-8 sm:mb-10">
                <HeroAnimation text1={"<Chemistry />"} text2="<Lily />" />
            </div>
            <p className="mb-8 text-xl sm:mb-10 sm:text-[26px] bg-gradient-to-r from-green-200 via-green-100 opacity-60 to-green-200 bg-clip-text w-fit">
                #Chemistry #Engineer #毛毛
            </p>

            <p className="mb-4 text-sm sm:mb-6 sm:text-base bg-gradient-to-b to-muted-foreground from-foreground bg-clip-text">
                I&apos; am a newly employed chemical engineer. I like writing, sunshines, and dogs.
            </p>
            <Socials />
        </div>
    );
}
