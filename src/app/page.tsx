import HeroAnimation from "@/components/home/HeroAnimation";
import Socials from "@/components/home/Socials";
import BlurFade from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <div className="mx-4 w-auto flex">
      <section className="w-auto mb-20 flex items-center">
        <div>
          <BlurFade delay={0.1} inView>
            <h1 className="m-6 sm:bg-gradient-to-r to-foreground bg-gradient-to-t from-muted-foreground bg-clip-text lg:text-[32px] text-[16px]">
              Hi there, I&apos;m Debra 👋
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="h-10 mb-8 sm:mb-10">
              <HeroAnimation text1={"<Chemistry />"} text2="<Lily />" />
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="mb-8 text-xl sm:mb-10 sm:text-[26px] bg-gradient-to-r from-green-200 via-green-100 opacity-60 to-green-200 bg-clip-text w-fit">
              #Chemistry #Engineer #毛毛
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <p className="mb-4 text-sm sm:mb-6 sm:text-base bg-gradient-to-b to-muted-foreground from-foreground bg-clip-text">
              I&apos; am a newly employed chemical engineer. I like writing, sunshines, and dogs.
            </p>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <Socials />
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
