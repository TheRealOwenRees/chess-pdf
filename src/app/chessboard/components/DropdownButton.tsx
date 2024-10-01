import { ReactNode } from "react";

const DropdownButton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="group btn btn-outline btn-primary hover:btn-primary"
      >
        Import Lichess Study
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-10 w-52 rounded-box border-[1px] border-primary bg-base-100 p-2 shadow"
      >
        {children}
      </ul>
    </div>
  );
};

export default DropdownButton;
