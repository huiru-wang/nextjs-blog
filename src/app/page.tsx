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
              I&apos;m 霄汉 👋
            </h1>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="mb-8 h-10">
              <HeroAnimation text1={"<Web developer />"} text2={"<Backend developer />"} />
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <div className="mb-8 text-xl sm:text-2xl">
              一个后端程序员，喜欢写代码，喜欢学习新技术，正在努力成为全栈工程师。对web3感兴趣
              <p className="mt-4 funcy-borad">Feel free to reach out to me!</p>
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
