import Link from "next/link";
import { LuGithub, LuMail } from "react-icons/lu";

const Footer = () => {
  const githubURL = Cypress.env('GITHUB_URL') || process.env.GITHUB_URL as string

    return (
      <footer className="grid md:grid-cols-3 gap-4 items-center bg-primary-500 text-white text-center p-5">
        <div className="text-2xl font-bold"><Link href="/" data-cy="homepage-link">Chess PDF</Link></div>
        <div data-cy="copyright">&copy; 2023 Chess PDF</div>
        <div className="flex justify-center gap-3 text-xl">
          <Link href={githubURL} target="_blank" data-cy="github-link"><LuGithub /></Link>
          <Link href="/contact" data-cy="contact-link"><LuMail /></Link>
        </div>
      </footer>
    )
}

export default Footer
