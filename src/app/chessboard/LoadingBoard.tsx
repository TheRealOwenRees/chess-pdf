import '@/scss/index.scss';

const LoadingBoard = () => {
  return (
    <div className="grid relative text-center items-center h-[500px] w-[640px]">
      <p>Loading...</p>
      <div id="loading-bar-spinner" className="spinner">
        <div className="spinner-icon"></div>
      </div>
    </div>
  )
}

export default LoadingBoard