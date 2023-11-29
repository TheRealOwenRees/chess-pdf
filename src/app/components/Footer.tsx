import Link from "next/link";
import { LuGithub, LuMail } from "react-icons/lu";

import footerLogo from '@/img/footerLogo.svg'
import Image from "next/image";

const Footer = () => {
  const githubURL = typeof Cypress !== 'undefined'
    ? Cypress.env('GITHUB_URL')
    : process.env.GITHUB_URL as string

    return (
      <footer className="footer grid-cols-2 p-5 px-10 bg-primary w-full text-primary-content">
        <aside className="items-center grid-flow-col">
          <Link href="/" data-test="homepage-logo-link">
            <Image src={footerLogo} alt="Chess PDF" className="w-10 h-10" />
          </Link>
          <p>Copyright © 2023</p>
        </aside>
        <nav className="grid-flow-col text-2xl gap-4 place-self-center justify-self-end">
          <Link href={githubURL} target="_blank" data-test="github-link"><LuGithub /></Link>
          <Link href="/contact" data-test="contact-link"><LuMail /></Link>
        </nav>
        {/*<div className="text-2xl font-bold"><Link href="/" data-test="homepage-link">Chess PDF</Link></div>*/}
        {/*<div data-test="copyright">&copy; 2023 Chess PDF</div>*/}
        {/*<div className="flex justify-center gap-3 text-xl">*/}
        {/*  <Link href={githubURL} target="_blank" data-test="github-link"><LuGithub /></Link>*/}
        {/*  <Link href="/contact" data-test="contact-link"><LuMail /></Link>*/}
        {/*</div>*/}
      </footer>
    )
}

export default Footer
