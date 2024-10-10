interface IClearInputIcon {
  onClick: () => void;
  className?: string;
}

const ClearInputIcon = ({ onClick, className }: IClearInputIcon) => (
  <div
    className={`absolute right-0 top-4 flex cursor-pointer items-center ${className}`}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </div>
);

export default ClearInputIcon;
