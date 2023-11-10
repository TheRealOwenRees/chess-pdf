import Link from "next/link";
import { LuGithub, LuMail } from "react-icons/lu";

const Footer = () => {
  const githubURL = process.env.GITHUB_URL as string

    return (
      <footer className="grid md:grid-cols-3 gap-4 items-center bg-primary-500 text-white text-center p-5">
          <div className="text-2xl font-bold"><Link href="/">Chess PDF</Link></div>
        <div>&copy; 2023 Chess PDF</div>
        <div className="flex justify-center gap-3 text-xl">
          <Link href={githubURL} target="_blank"><LuGithub /></Link>
          <Link href="/contact"><LuMail /></Link>
        </div>
      </footer>
    )
}

export default Footer
