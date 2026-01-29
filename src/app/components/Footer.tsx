import Image from "next/image";
import Link from "next/link";
import { LuGithub, LuMail } from "react-icons/lu";

import CoffeeWidget from "@/app/components/CoffeeWidget";
import footerLogo from "@/img/footerLogo.svg";

const Footer = () => {
  const githubURL = process.env.GITHUB_URL as string;

  return (
    <footer
      className="footer w-full grid-cols-2 items-center bg-primary px-10 py-5 text-primary-content"
      data-testid="footer"
    >
      <div className="flex w-full items-center">
        <Link href="/" data-testid="homepage-link">
          <Image
            src={footerLogo}
            alt="Chess PDF"
            className="hidden h-10 w-10 sm:block"
          />
        </Link>
        <div>
          <p data-testid="copyright">
            Copyright © 2023 - {new Date().getFullYear()}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Link
            href={githubURL}
            target="_blank"
            data-testid="github-link"
            className="text-2xl hover:text-secondary-content"
            aria-label={"Github Link"}
          >
            <LuGithub />
          </Link>
          <Link
            href="/contact"
            data-testid="contact-link"
            className="text-2xl hover:text-secondary-content"
            aria-label={"Contact Link"}
          >
            <LuMail />
          </Link>
        </div>
      </div>
      <CoffeeWidget />
    </footer>
  );
};

export default Footer;
