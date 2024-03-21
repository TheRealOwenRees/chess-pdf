import Link from "next/link";
import { LuGithub, LuMail } from "react-icons/lu";

import footerLogo from '@/img/footerLogo.svg'
import Image from "next/image";

const Footer = () => {
  const githubURL = process.env.GITHUB_URL as string

    return (
      <footer className="footer grid-cols-2 p-5 px-10 bg-primary w-full text-primary-content" data-testid="footer">
        <aside className="items-center grid-flow-col">
          <Link href="/" data-testid="homepage-link">
            <Image src={footerLogo} alt="Chess PDF" className="w-10 h-10" />
          </Link>
          <p data-test="copyright">Copyright © 2023 - {new Date().getFullYear()}</p>
        </aside>
        <nav className="grid-flow-col text-2xl gap-4 place-self-center justify-self-end">
          <Link href={githubURL} target="_blank" data-testid="github-link" className="hover:text-secondary"><LuGithub /></Link>
          <Link href="/contact" data-testid="contact-link" className="hover:text-secondary"><LuMail /></Link>
        </nav>
      </footer>
    )
}

export default Footer
