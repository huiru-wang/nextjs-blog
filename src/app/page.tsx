import HeroAnimation from "@/components/home/HeroAnimation";
import Socials from "@/components/home/Socials";
import LanguageCard from "@/components/home/TechLanguageCard";
import TeckSkillCard from "@/components/home/TeckSkillCard";
import BlurFade from "@/components/ui/blur-fade";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center">
      <section className="w-auto my-20 mx-4 flex items-center">
        <div>
          <BlurFade delay={0.1} inView>
            <h1 className="mb-16 text-5xl">
              Hi there, I&apos;m Debra 👋
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="mb-8 h-10">
              <HeroAnimation text1={"<Chemistry />"} text2="<Lily />" />
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="mb-8 text-xl bg-gradient-to-r from-green-200 via-green-100 opacity-60 to-green-200 bg-clip-text w-fit">
              #Chemistry #Engineer #毛毛
            </p>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <p className="mb-8 text-2xl">
              I&apos;m a newly employed chemical engineer. I like writing, sunshines, and dogs.
            </p>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <Socials />
          </BlurFade>
        </div>
      </section>
      <section>
        <BlurFade
          delay={0.7}
          inView
          className="mx-4 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <TeckSkillCard />
          <LanguageCard />
          <div className="pixel-div">
            hello
          </div>
        </BlurFade>
      </section>
    </div>
  );
}
