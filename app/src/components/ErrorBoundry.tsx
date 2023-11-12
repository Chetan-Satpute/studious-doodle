import React from 'react';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  // componentDidCatch(error, info) {}

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="h-screen w-screen bg-[#121212] flex justify-center items-center">
          <h1 className="font-bold text-white font-2xl font-kalam">
            Something Went Wrong!
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
