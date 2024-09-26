import LichessLogo from "@/app/components/LichessLogo";

interface ILichessButton {
  label: string;
  onClickHandler: () => void;
}

const LichessButton = ({ label, onClickHandler }: ILichessButton) => {
  return (
    <button
      className="group btn btn-outline btn-primary w-full hover:btn-primary md:w-1/2"
      onClick={onClickHandler}
    >
      <LichessLogo className="h-5 w-5 fill-primary stroke-primary group-hover:fill-white group-hover:stroke-white" />
      {label}
    </button>
  );
};

export default LichessButton;
