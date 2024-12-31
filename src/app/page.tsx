import HeroAnimation from "@/components/home/HeroAnimation";
import Socials from "@/components/home/Socials";
import LanguageCard from "@/components/home/TechLanguageCard";
import TeckSkillCard from "@/components/home/TeckSkillCard";
import BlurFade from "@/components/ui/blur-fade";
import WidgetImg from "@/components/WidgetImg";
import Gengar from "@/public/widgets/gengar.png";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center">
      <section className="w-auto my-5 sm:my-20 mx-4 flex items-center">
        <div>
          <BlurFade delay={0.1} inView>
            <h1 className="mb-8 text-5xl">
              I&apos;m Robin 👋
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="mb-8 h-10">
              <HeroAnimation text={"<Web developer />"} />
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <div className="mb-8 text-2xl">
              I&apos;m a backend developer, currently working at
              <p className="mx-2 inline-block text-orange-500">@alibaba DingTalk</p>.
              <p>Striving to become a Full Stack engineer </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <Socials />
          </BlurFade>
        </div>
      </section>
      <section>
        <BlurFade
          delay={0.6}
          inView
          className="mx-4 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <TeckSkillCard />
          <LanguageCard />
        </BlurFade>
      </section>

      <WidgetImg src={Gengar} position="left" />
    </div>
  );
}
