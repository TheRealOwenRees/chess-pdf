import Link from "next/link";

import BuyMeACoffeeLogo from "@/app/components/BuyMeACoffeeLogo";

const CoffeeWidget = () => {
  return (
    <Link
      href="https://buymeacoffee.com/owenreesdev"
      target="_blank"
      className="ml-auto grid-flow-col items-center gap-2 text-sm hover:text-secondary-content"
    >
      <BuyMeACoffeeLogo className="h-10 w-5" />
      <p>Support This Project</p>
    </Link>
  );
};

export default CoffeeWidget;
