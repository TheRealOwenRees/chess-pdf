import Image from "next/image";
import Link from "next/link";

import logo from "@/img/logo.svg";

const Navbar = () => {
  const navItemHover =
    "decoration-2 underline-offset-8 hover:text-primary hover:underline";

  return (
    <nav
      className="w-full max-w-screen-2xl place-self-center bg-base-100 p-8 text-neutral"
      data-testid="navbar"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            data-testid="homepage-nav-link"
            className="flex flex-row items-center justify-center"
          >
            <Image
              src={logo}
              alt="Chess PDF Logo"
              width={50}
              height={50}
              className="mr-4"
            />

            <span className="hidden text-2xl font-extrabold text-primary sm:block">
              ChessScribe
            </span>
          </Link>
        </div>

        <div>
          <ul className="flex flex-1 items-center gap-14 font-semibold">
            <li>
              <Link
                className={navItemHover}
                href="/chessboard"
                data-testid="chessboard-nav-link"
              >
                Chessboard
              </Link>
            </li>
            <li>
              <Link
                className={navItemHover}
                href="/contact"
                data-testid="contact-nav-link"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
