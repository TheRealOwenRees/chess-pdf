import "@/scss/index.scss";

const LoadingBoard = () => {
  return (
    <div className="relative grid h-[500px] w-[640px] items-center text-center">
      <p>Loading...</p>
      <div id="loading-bar-spinner" className="spinner">
        <div className="spinner-icon"></div>
      </div>
    </div>
  );
};

export default LoadingBoard;
