function LoadingSpinner() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <span className="w-4 h-4 my-12 mx-1 bg-cyan-500 rounded-full animate-loader"></span>
      <span className="w-4 h-4 my-12 mx-1 bg-cyan-500 rounded-full animate-loader animation-delay-200"></span>
      <span className="w-4 h-4 my-12 mx-1 bg-cyan-500 rounded-full animate-loader animation-delay-400"></span>
    </div>
  );
}

export default LoadingSpinner;
