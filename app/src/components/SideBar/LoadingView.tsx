import LoadingSpinner from '../LoadingSpinner';

function LoadingView() {
  return (
    <aside className="h-3/5 w-full lg:h-full lg:w-1/3">
      <LoadingSpinner />
    </aside>
  );
}

export default LoadingView;
