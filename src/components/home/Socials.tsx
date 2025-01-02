import Link from "next/link";
import "@/styles/weichat.css";
import { AiOutlineWechat } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
function Socials() {
  return (
    <div className="flex gap-6 ">
      <div
        className="weichat-qr-code opacity-60 hover:opacity-100 border-muted-foreground ">
        <AiOutlineWechat className="weichat-qr-code" size={25} />
      </div>
      <Link
        className="duration-500 opacity-60 hover:opacity-100 border-muted-foreground "
        href="https://github.com/huiru-wang"
        target="_blank">
        <FiGithub size={23} />
      </Link>
      <Link
        className="duration-500 opacity-60 hover:opacity-100 border-muted-foreground "
        href="https://github.com/huiru-wang"
        target="_blank">
        <CiLinkedin size={25} />
      </Link>
    </div>
  );
}

export default Socials;
