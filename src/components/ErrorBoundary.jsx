import React from "react";
import { WiThunderstorm } from "react-icons/wi";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] dark:bg-[#212529] transition-colors duration-300">
          <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white dark:bg-[#212529] border border-gray-200 dark:border-gray-600 p-8 flex flex-col items-center gap-4">
            <div className="text-red-500 text-6xl">
              <WiThunderstorm />
            </div>
            <h2 className="text-2xl font-bold text-[#212529] dark:text-[#f8f9fa] text-center">
              An error occurred
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Sorry, an unexpected error occurred in the app. Please refresh the
              page or try again later.
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-3 bg-[#0d6efd] text-white rounded-lg font-semibold hover:bg-[#0b5ed7] transition"
            >
              Try again
            </button>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="w-full mt-4">
                <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">
                  Error details (Development)
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
