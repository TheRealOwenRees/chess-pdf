import Link from "next/link";
import Image from "next/image";

import logo from "@/img/logo.svg";

const Navbar = () => {
  const navItemHover = "decoration-2 underline-offset-8 hover:text-primary-500 hover:underline"

    return (
      <nav className="bg-base-100 p-8 w-full max-w-screen-2xl place-self-center text-secondary-500">
       <div className="container flex items-center justify-between mx-auto">
         <div className="flex items-center">
           <Link href="/" data-test="homepage-nav-logo-link">
             <Image src={logo} alt="Chess PDF Logo" width={50} height={50} className="mr-4" />
           </Link>
           <Link href="/" data-test="homepage-nav-link">
             <span className="text-2xl font-extrabold text-primary-300 hidden sm:block">Chess PDF</span>
           </Link>
         </div>

         <div>
           <ul className="flex flex-1 items-center gap-14 font-semibold">
             <li>
               <Link className={navItemHover} href="/chessboard" data-test="chessboard-nav-link">Chessboard</Link>
             </li>
             <li>
               <Link className={navItemHover} href="/contact" data-test="contact-nav-link">Contact</Link>
             </li>
           </ul>
         </div>
       </div>
      </nav>
    )
}

export default Navbar