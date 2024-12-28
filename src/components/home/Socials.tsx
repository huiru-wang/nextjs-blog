import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

function Socials() {
  return (
    <div className="flex gap-6 ">
      <SocialMediaLink link="https://hk.linkedin.com/">
        <Linkedin />
      </SocialMediaLink>
      <SocialMediaLink link="https://github.com/huiru-wang">
        <Github />
      </SocialMediaLink>
      <SocialMediaLink link="mailto:huiru-wang@outlook.com">
        <Mail />
      </SocialMediaLink>
    </div>
  );
}

function SocialMediaLink({ children, link }) {
  return (
    <Link
      className="flex items-center justify-center w-8 h-8 p-[5px] duration-500 opacity-60 hover:opacity-100 border-muted-foreground "
      href={link}
      target="_blank"
    >
      {children}
    </Link>
  );
}


export default Socials;
